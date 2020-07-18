import React, { useState, useEffect } from "react";
// import MapGL, {
//   GeolocateControl,
//   FlyToInterpolator,
//   Marker,
//   NavigationControl,
//   Popup
// } from "react-map-gl";
// import Geocoder from "react-mapbox-gl-geocoder";
import {
  Card,
  Grid,
  TextField,
  Typography,
  Button,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import SendIcon from "@material-ui/icons/Send";

import MyAutoComplete from "./MyAutoComplete";

import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
// import Lottie from "react-lottie";

import axios from "axios";
// import useSuperCluster from "use-supercluster";
// import LocDetails from "./LocDetails";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

// import * as cuteLoader from "../../assets/loader/1016-spirit-geek.json";
// import * as cuteLoader from "../../assets/loader/11422-travel-icons-map.json";
// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: cuteLoader.default,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice"
//   }
// };

import ReactLoading from "react-loading";

const useStyles = makeStyles((theme) => ({
  expandButton: {
    width: "100%",
  },
}));

const Example = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={50} width={50} />
);

const AddRoute = () => {
  const classes = useStyles();

  const [route, setRoute] = useState({
    src_id: 0,
    dest_id: 0,
    distance: 0,
    auto_price: 0.0,
    bus_price: 0.0,
    train_price: 0.0,
  });

  const [loaded, setLoaded] = useState(false);

  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const [locations, setLocations] = useState([]);

  const [srcloc, setSrc] = useState();

  const [destloc, setDest] = useState();

  const [resetKey, setResetKey] = useState({
    a: Math.random(),
    b: Math.random(),
  });

  useEffect(() => {
    const urlLocations = "/api/location/";

    axios
      .get(urlLocations)
      .then((response) => {
        setLocations(response.data);
        console.log("Loaded Locations");
        setLoaded(true);
      })
      .catch((error) => console.log(error));
  }, []);

  const submitData = () => {
    let route_data = new FormData();

    console.log(srcloc);
    console.log(destloc);

    if (!srcloc || !destloc) {
      setErr(true);
      setSuccess(false);
      return;
    }

    if (srcloc.id == destloc.id) {
      setErr(true);
      setSuccess(false);
      return;
    }

    const finalRoute = {
      ...route,
      src_id: srcloc.id,
      dest_id: destloc.id,
    };

    console.log(finalRoute);

    route_data.append("src_id", finalRoute.src_id);
    route_data.append("dest_id", finalRoute.dest_id);
    route_data.append("distance", finalRoute.distance);
    route_data.append("autoPrice", finalRoute.auto_price);
    route_data.append("busPrice", finalRoute.bus_price);
    route_data.append("trainPrice", finalRoute.train_price);

    let url = "/api/routes/";

    axios
      .post(url, route_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setRoute({
          src_id: 0,
          dest_id: 0,
          distance: 0,
          auto_price: 0.0,
          bus_price: 0.0,
          train_price: 0.0,
        });
        setSrc();
        setDest();
        setResetKey({ a: Math.random(), b: Math.random() });
        setErr(false);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setSuccess(false);
      });
  };

  // const getId = name => {
  //   console.log(name);
  //   var temp = locations.find(x => x.place == name);
  //   console.log(temp);
  //   if (temp != null) {
  //     return temp.id;
  //   }
  //   return 0;
  // };

  if (loaded) {
    // const locMap = {};

    // if (locations) {
    //   locations.forEach((loc) => {
    //     locMap[loc.place] = loc.place_img;
    //   });
    //   console.log(locMap);
    // }

    return (
      <>
        <Card elevation={3} className="cardContent">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" className="pageHeading">
                Add New Routes
              </Typography>
            </Grid>
            <Grid container item xs={12} direction="row-reverse" spacing={3}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MuiAlert severity="info">
                      Add routes between any two locations and enter the price
                      of vehicles between them.
                    </MuiAlert>
                  </Grid>
                  <Grid item xs={12}>
                    <MuiAlert severity="warning">
                      If location is not present, then add it by{" "}
                      <Link to="/add">clicking here</Link>.
                    </MuiAlert>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={12} md={4} spacing={4}>
                <Grid item xs={12}>
                  <MyAutoComplete
                    options={locations}
                    value={srcloc}
                    onChange={(event, newValue) => {
                      setSrc(newValue);
                    }}
                    label="Source"
                    key={resetKey.a}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyAutoComplete
                    options={locations}
                    value={destloc}
                    onChange={(event, newValue) => {
                      setDest(newValue);
                    }}
                    label="Destination"
                    key={resetKey.b}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Auto"
                    type="number"
                    value={route.auto_price}
                    onChange={(x) =>
                      setRoute({ ...route, auto_price: Number(x.target.value) })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Train"
                    type="number"
                    value={route.train_price}
                    onChange={(x) =>
                      setRoute({
                        ...route,
                        train_price: Number(x.target.value),
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Bus"
                    type="number"
                    value={route.bus_price}
                    onChange={(x) =>
                      setRoute({ ...route, bus_price: Number(x.target.value) })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={submitData}
                    endIcon={<SendIcon />}
                    variant="contained"
                    color="primary"
                    className={classes.expandButton}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <Snackbar
          open={success}
          autoHideDuration={2000}
          onClose={() => setSuccess(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSuccess(false)}
            severity="success"
          >
            Route Added Successfully!
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={err}
          autoHideDuration={2000}
          onClose={() => setErr(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setErr(false)}
            severity="error"
          >
            Error! Route cannot be added.
          </MuiAlert>
        </Snackbar>
      </>
    );
  } else {
    return (
      <div>
        <Example type="spin" color="#1fa2ff" />
      </div>
    );
  }
};

export default AddRoute;
