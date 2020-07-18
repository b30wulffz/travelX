import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  makeStyles,
  Button,
  Typography,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import MyAutoComplete from "./MyAutoComplete";
import SendIcon from "@material-ui/icons/Send";

import axios from "axios";
import FadeIn from "react-fade-in";
import config from "../../assets/config";
import MapGL, {
  GeolocateControl,
  FlyToInterpolator,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
// import DeckGL from "@deck.gl/react";
// import { LineLayer } from "@deck.gl/layers";

import PolyLineOverlay from "./PolyLineOverlay";

import ReactLoading from "react-loading";

const useStyles = makeStyles((theme) => ({
  expandButton: {
    width: "100%",
  },
}));

const Example = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={50} width={50} />
);

const TOKEN = config.ACCESS_TOKEN;

const geolocateStyle = {
  float: "left",
  margin: "20px",
};

const mapRef = React.createRef();

const SearchForm = () => {
  const classes = useStyles();

  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "50vh",
    zoom: 6,
    latitude: 0,
    longitude: 0,
  });

  const [locations, setLocations] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState();
  const [dest, setDest] = useState();
  const [trans, setTrans] = useState();
  const [notFound, setNotFound] = useState(false);
  const [points, setPoints] = useState([]);

  const [test, setTest] = useState("Default");

  useEffect(() => {
    const urlLocations = "/api/location/";
    const urlRoutes = "/api/routes/";

    axios
      .get(urlLocations)
      .then((response) => {
        setLocations(response.data);
        console.log("Loaded Locations");
        setLoaded(true);
      })
      .catch((error) => console.log(error));

    axios
      .get(urlRoutes)
      .then((response) => {
        setRoutes(response.data);
        console.log("Loaded Routes");
      })
      .catch((error) => console.log(error));

    navigator.geolocation.getCurrentPosition((position) => {
      // setUserLocation({
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude
      // });
      setViewPort({
        ...viewport,
        latitude: Number(position.coords.latitude.toFixed(7)),
        longitude: Number(position.coords.longitude.toFixed(7)),
      });
    });
  }, []);

  const _onViewportChange = (newViewport) => {
    setViewPort({
      ...newViewport,
    });
  };

  // console.log(src);
  // console.log(dest);

  const submitData = () => {
    // const srcNode = locations.find(x => x.place == src);
    // const destNode = locations.find(x => x.place == dest);

    let x = false;
    if (src != null && dest != null) {
      setTrans(
        routes.find((r) => {
          if (
            (r.src_id == src.id && r.dest_id == dest.id) ||
            (r.src_id == dest.id && r.dest_id == src.id)
          ) {
            x = true;
            return true;
          }
          return false;
        })
      );
    }
    if (!x) {
      console.log("Not found");
      setNotFound(true);
    } else {
      console.log("fetching routes");
      setNotFound(false);
      fetchRoute();
    }
  };
  // const data = [
  //   {
  //     inbound: 72633,
  //     outbound: 74735,
  //     from: {
  //       name: "19th St. Oakland (19TH)",
  //       coordinates: [79.4833407, 11.9322033]
  //     },
  //     to: {
  //       name: "12th St. Oakland City Center (12TH)",
  //       coordinates: [79.5513186, 11.7702492]
  //     }
  //   }
  // ];
  // const layer = new LineLayer({
  //   id: "line-layer",
  //   data,
  //   pickable: true,
  //   getWidth: 50,
  //   getSourcePosition: d => d.from.coordinates,
  //   getTargetPosition: d => d.to.coordinates,
  //   getColor: d => [Math.sqrt(d.inbound + d.outbound), 140, 0],
  //   onHover: ({ object, x, y }) => {
  //     const tooltip = `${object.from.name} to ${object.to.name}`;
  //   }
  // });

  const fetchRoute = () => {
    console.log("Searching");
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${src.longitude},${src.latitude};${dest.longitude},${dest.latitude}?geometries=geojson&access_token=${TOKEN}`;
    axios
      .get(url)
      .then((response) => {
        setPoints(response.data.routes[0].geometry.coordinates);
        setViewPort({
          ...viewport,
          latitude: parseFloat(src.latitude),
          longitude: parseFloat(src.longitude),
          zoom: 16,
          transitionInterpolator: new FlyToInterpolator({
            speed: 2,
          }),
          transitionDuration: "auto",
        });
      })
      .catch((error) => console.log(error));
  };

  // var points = [
  //   [78.2227473, 12.5076772],
  //   [78.6076025, 12.6534205]
  // ];

  // const data = [
  //   {
  //     sourcePosition: [78.2227473, 12.5076772],
  //     targetPosition: [78.6076025, 12.6534205]
  //   }
  // ];

  // const layers = [new LineLayer({ id: "line-layer", data })];

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
                Get The Price
              </Typography>
            </Grid>
            <Grid container item xs={12} direction="row-reverse" spacing={3}>
              <Grid container item xs={12} md={8} spacing={3}>
                <Grid item xs={12}>
                  <MapGL
                    {...viewport}
                    // transitionInterpolator={new FlyToInterpolator({ speed: 4 })}
                    // transitionDuration="auto"
                    mapboxApiAccessToken={TOKEN}
                    mapStyle="mapbox://styles/b30wulffz/ck77ua3ax0yt81ioers9qxmn0"
                    onViewportChange={_onViewportChange}
                    maxZoom={20}
                    style={{ position: "relative" }}
                    // onClick={e => {
                    //   getCoordinates(e);
                    // }}
                    ref={mapRef}
                    className="map"
                  >
                    <PolyLineOverlay points={points} />
                    <GeolocateControl
                      style={geolocateStyle}
                      positionOptions={{ enableHighAccuracy: true }}
                      trackUserLocation={true}
                    />
                    <div
                      style={{ position: "absolute", right: 0, margin: "20px" }}
                    >
                      <NavigationControl showCompass={false} />
                    </div>
                  </MapGL>
                </Grid>
                {trans && !notFound ? (
                  <FadeIn>
                    <Grid container item xs={12}>
                      <Grid item xs={4}>
                        Auto: Rs. {trans.autoPrice}
                      </Grid>
                      <Grid item xs={4}>
                        Bus: Rs. {trans.busPrice}
                      </Grid>
                      <Grid item xs={4}>
                        Train: Rs. {trans.trainPrice}
                      </Grid>
                    </Grid>
                  </FadeIn>
                ) : null}
              </Grid>

              <Grid container item xs={12} md={4} spacing={4}>
                <Grid item xs={12}>
                  <MyAutoComplete
                    options={locations}
                    value={src}
                    onChange={(event, newValue) => {
                      setSrc(newValue);
                    }}
                    label="Source"
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyAutoComplete
                    options={locations}
                    value={dest}
                    onChange={(event, newValue) => {
                      setDest(newValue);
                    }}
                    label="Destination"
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
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <Snackbar
          open={notFound}
          autoHideDuration={2000}
          onClose={() => setNotFound(false)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setNotFound(false)}
            severity="error"
          >
            Route not found.
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

export default SearchForm;
