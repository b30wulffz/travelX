import React, { useState, useEffect } from "react";
import { Row, Col, Card, Autocomplete, Button, Icon } from "react-materialize";
import axios from "axios";
import FadeIn from "react-fade-in";
import config from "../../assets/config";
import MapGL, {
  GeolocateControl,
  FlyToInterpolator,
  Marker,
  NavigationControl,
  Popup
} from "react-map-gl";
// import DeckGL from "@deck.gl/react";
// import { LineLayer } from "@deck.gl/layers";

import PolyLineOverlay from "./PolyLineOverlay";

const TOKEN = config.ACCESS_TOKEN;

const geolocateStyle = {
  float: "left",
  margin: "20px"
};

const mapRef = React.createRef();

const SearchForm = () => {
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "90vh",
    zoom: 6,
    latitude: 0,
    longitude: 0
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
      .then(response => {
        setLocations(response.data);
        console.log("Loaded Locations");
        setLoaded(true);
      })
      .catch(error => console.log(error));

    axios
      .get(urlRoutes)
      .then(response => {
        setRoutes(response.data);
        console.log("Loaded Routes");
      })
      .catch(error => console.log(error));

    navigator.geolocation.getCurrentPosition(position => {
      // setUserLocation({
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude
      // });
      setViewPort({
        ...viewport,
        latitude: Number(position.coords.latitude.toFixed(7)),
        longitude: Number(position.coords.longitude.toFixed(7))
      });
    });
  }, []);

  const _onViewportChange = newViewport => {
    setViewPort({
      ...newViewport
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
        routes.find(r => {
          if (r.src_id == src.id && r.dest_id == dest.id) {
            x = true;
            return true;
          }
          return false;
        })
      );
    }
    if (!x) {
      setNotFound(true);
    } else {
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
      .then(response => {
        setPoints(response.data.routes[0].geometry.coordinates);
        setViewPort({
          ...viewport,
          latitude: parseFloat(src.latitude),
          longitude: parseFloat(src.longitude),
          zoom: 16,
          transitionInterpolator: new FlyToInterpolator({
            speed: 2
          }),
          transitionDuration: "auto"
        });
      })
      .catch(error => console.log(error));
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
    const locMap = {};

    if (locations) {
      locations.forEach(loc => {
        locMap[loc.place] = loc.place_img;
      });
      console.log(locMap);
    }

    return (
      <Row>
        <Col s={12} m={4}>
          <Row>
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
          {/* <Row>
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
              // value={dest}
              // style={{ width: "100vw" }}
              // value={dest}
              // onChange={(event, value) => setDest(value)}
            />
          </Row> */}
          <Row>
            <Autocomplete
              // options={{
              //   data: locMap,
              //   onAutocomplete: value => {
              //     // console.log(value);
              //     setDest(locations.find(x => x.place == value));
              //   },
              //   limit: 5,

              // }}
              title="Destination"
              value={test}
              // value={dest}
              // style={{ width: "100vw" }}
              // value={dest}
              // onChange={(event, value) => setDest(value)}
            />
          </Row>
          <Row>
            <Button
              node="button"
              type="submit"
              waves="light"
              onClick={submitData}
            >
              Submit
              <Icon right>send</Icon>
            </Button>
          </Row>
          {notFound ? (
            <Row>
              <FadeIn>
                <Card title="Error" className="red white-text">
                  Not Found
                </Card>
              </FadeIn>
            </Row>
          ) : null}
          {trans && !notFound ? (
            <Row>
              <FadeIn>
                <Card title="Auto">Rs. {trans.autoPrice}</Card>
                <Card title="Bus">Rs. {trans.busPrice}</Card>
                <Card title="Train">Rs. {trans.trainPrice}</Card>
              </FadeIn>
            </Row>
          ) : null}
        </Col>
        <Col s={12} m={8}>
          {/* <DeckGL {...viewport} layers={[layer]}> */}
          {/* <DeckGL initialViewState={initialViewState} layers={layers}> */}
          {/* <DeckGL
            initialViewState={{
              longitude: -122.41669,
              latitude: 37.7853,
              zoom: 13,
              pitch: 0,
              bearing: 0
            }}
            controller={true}
            layers={layers}
          > */}
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
          >
            <PolyLineOverlay points={points} />
            <GeolocateControl
              style={geolocateStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
            <div style={{ position: "absolute", right: 0, margin: "20px" }}>
              <NavigationControl showCompass={false} />
            </div>
          </MapGL>
          {/* </DeckGL> */}
        </Col>
      </Row>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default SearchForm;
