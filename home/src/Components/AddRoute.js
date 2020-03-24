// import React from "react";
// import { Row, Col } from "react-materialize";

// const AddRoute = () => {
//   return (
//     <Row>
//       <Col m={6} s={12}>
//         Rishabh Bhai!
//       </Col>
//       <Col m={6} s={12}>
//         Page Send Karo!
//       </Col>
//     </Row>
//   );
// };

// export default AddRoute;

import React, { useState, useEffect } from "react";
import MapGL, {
  GeolocateControl,
  FlyToInterpolator,
  Marker,
  NavigationControl,
  Popup
} from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";
import {
  Row,
  Col,
  CardPanel,
  TextInput,
  Button,
  Icon,
  Divider,
  Textarea
} from "react-materialize";
import FadeIn from "react-fade-in";

import axios from "axios";
import useSuperCluster from "use-supercluster";
import LocDetails from "./LocDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Map = () => {
  const [route, setRoute] = useState({
    src_id: 0,
    dest_id: 0,
    distance: 0,
    auto_price: 0.0,
    bus_price: 0.0,
    train_price: 0.0
  });

  const [locations, setLocations] = useState([]);

  const [srcloc, setSrcloc] = useState({
    id_: 0,
    place: ""
  });

  const [destloc, setDestloc] = useState({
    id_: 0,
    place: ""
  });

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

    const finalRoute = {
      ...route,
      src_id: getId(srcloc.place),
      dest_id: getId(destloc.place)
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getId = name => {
    console.log(name);
    var temp = locations.find(x => x.place == name);
    console.log(temp);
    if (temp != null) {
      return temp.id;
    }

    return 0;
  };

  return (
    <div className={"cardbox"}>
      <Row>
        <Col s={12} m={4}>
          <Row>
            <TextInput
              label="Source"
              value={srcloc.place}
              onChange={x => setSrcloc({ ...srcloc, place: x.target.value })}
            />
          </Row>

          <Row>
            <TextInput
              label="Destination"
              value={destloc.place}
              onChange={x => setDestloc({ ...destloc, place: x.target.value })}
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
            <Button node="button" waves="light" onClick={submitData}>
              Submit
              <Icon right>send</Icon>
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Map;
