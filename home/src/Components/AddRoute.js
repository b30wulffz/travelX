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
  Row,
  Col,
  CardPanel,
  TextInput,
  Button,
  Icon,
  Card,
  Autocomplete
  // Divider,
  // Textarea
} from "react-materialize";
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

const Example = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={50} width={50} />
);

const AddRoute = () => {
  const [route, setRoute] = useState({
    src_id: 0,
    dest_id: 0,
    distance: 0,
    auto_price: 0.0,
    bus_price: 0.0,
    train_price: 0.0
  });

  const [loaded, setLoaded] = useState(false);

  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const [locations, setLocations] = useState([]);

  const [srcloc, setSrc] = useState();

  const [destloc, setDest] = useState();

  useEffect(() => {
    const urlLocations = "/api/location/";

    axios
      .get(urlLocations)
      .then(response => {
        setLocations(response.data);
        console.log("Loaded Locations");
        setLoaded(true);
      })
      .catch(error => console.log(error));
  }, []);

  const submitData = () => {
    let route_data = new FormData();

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
      dest_id: destloc.id
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
          "content-type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log(res.data);
        setRoute({
          src_id: 0,
          dest_id: 0,
          distance: 0,
          auto_price: 0.0,
          bus_price: 0.0,
          train_price: 0.0
        });
        setErr(false);
        setSuccess(true);
      })
      .catch(err => {
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
    const locMap = {};

    if (locations) {
      locations.forEach(loc => {
        locMap[loc.place] = loc.place_img;
      });
      console.log(locMap);
    }

    return (
      <CardPanel className="cardContent">
        <Row>
          <Row>
            <h3 className="pageHeading">Add New Routes</h3>
          </Row>
          <Row>
            <Col s={12} m={4}>
              <Row>
                {/* <TextInput
                  label="Source"
                  value={srcloc.place}
                  onChange={x =>
                    setSrcloc({ ...srcloc, place: x.target.value })
                  }
                /> */}
                <Autocomplete
                  options={{
                    data: locMap,
                    onAutocomplete: value => {
                      // console.log(value);
                      setSrc(locations.find(x => x.place == value));
                    },
                    limit: 5
                  }}
                  title="Source"
                  // value={src}
                  // style={{ width: "100vw" }}
                  // onChange={(event, value) => setSrc(value)}
                />
              </Row>

              <Row>
                {/* <TextInput
                  label="Destination"
                  value={destloc.place}
                  onChange={x =>
                    setDestloc({ ...destloc, place: x.target.value })
                  }
                /> */}
                <Autocomplete
                  options={{
                    data: locMap,
                    onAutocomplete: value => {
                      // console.log(value);
                      setDest(locations.find(x => x.place == value));
                    },
                    limit: 5
                  }}
                  title="Destination"
                  // value={src}
                  // style={{ width: "100vw" }}
                  // onChange={(event, value) => setSrc(value)}
                />
              </Row>

              <Row>
                <TextInput
                  label="Auto"
                  type="number"
                  value={route.auto_price}
                  onChange={x =>
                    setRoute({ ...route, auto_price: Number(x.target.value) })
                  }
                />
              </Row>

              <Row>
                <TextInput
                  label="Train"
                  type="number"
                  value={route.train_price}
                  onChange={x =>
                    setRoute({ ...route, train_price: Number(x.target.value) })
                  }
                />
              </Row>

              <Row>
                <TextInput
                  label="Bus"
                  type="number"
                  value={route.bus_price}
                  onChange={x =>
                    setRoute({ ...route, bus_price: Number(x.target.value) })
                  }
                />
              </Row>

              <Row>
                <Button
                  node="button"
                  waves="light"
                  onClick={submitData}
                  className="submitBut"
                >
                  Add
                  <Icon right>send</Icon>
                </Button>
              </Row>
            </Col>
            <Col s={12} m={8}>
              <CardPanel>
                <span>
                  Add routes between any two locations and enter the price of
                  vehicles between them.
                </span>
              </CardPanel>
              <CardPanel>
                <span>
                  If location is not present, then add it by{" "}
                  <Link to="/add">clicking here</Link>.
                </span>
              </CardPanel>
              {err ? (
                <FadeIn>
                  <Card
                    title="Error"
                    className="red white-text"
                    style={{ width: "100%" }}
                  >
                    Not Uploaded!
                  </Card>
                </FadeIn>
              ) : null}

              {success ? (
                <FadeIn>
                  <Card
                    title="Success"
                    className="green white-text"
                    style={{ width: "100%" }}
                  >
                    Location Added Successfully!
                  </Card>
                </FadeIn>
              ) : null}
            </Col>
          </Row>
        </Row>
      </CardPanel>
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
