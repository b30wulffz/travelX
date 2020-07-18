import React, { useState, useEffect } from "react";
import MapGL, {
  GeolocateControl,
  FlyToInterpolator,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
// import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Geocoder from "react-mapbox-gl-geocoder";
import {
  Card,
  Grid,
  TextField,
  Button,
  IconButton,
  Snackbar,
  makeStyles,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";

import FadeIn from "react-fade-in";

import axios from "axios";
import useSuperCluster from "use-supercluster";
import LocDetails from "./LocDetails";

// import Pin from "./Pin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import config from "../../assets/config";

const useStyles = makeStyles((theme) => ({
  expandButton: {
    width: "100%",
  },
}));

const TOKEN = config.ACCESS_TOKEN;

const geolocateStyle = {
  float: "left",
  margin: "20px",
};

const mapRef = React.createRef();

const Map = () => {
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "50vh",
    zoom: 6,
    latitude: 0,
    longitude: 0,
  });

  const [source, setSource] = useState({
    place: "",
    latitude: 0,
    longitude: 0,
    summary: "",
    place_img: "",
  });

  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [points, setPoints] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);

  // const [userLocation, setUserLocation] = useState({
  //   latitude: 0,
  //   longitude: 0
  // });

  const _onViewportChange = (newViewport) => {
    setViewPort({
      ...newViewport,
    });
  };
  // const handleGeocoderViewportChange = newViewport => {
  //   setViewPort({
  //     ...newViewport,
  //     transitionDuration: 1000
  //   });
  // };
  const onSelected = (viewport, item) => {
    setViewPort({ ...viewport });
    console.log("Selected: ", item);
  };

  const fetchData = () => {
    let url = "/api/location/";
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setPoints(
          response.data.map((loc) => {
            return {
              type: "Feature",
              properties: {
                cluster: false,
                place_id: loc.id,
                place: loc.place,
                summary: loc.summary,
                place_img: loc.place_img,
              },
              geometry: {
                type: "Point",
                coordinates: [
                  parseFloat(loc.longitude),
                  parseFloat(loc.latitude),
                ],
              },
            };
          })
        );
      })
      .catch((error) => console.log(error));
  };

  // const createPoints = () => {
  //   setPoints(
  //     data.map(loc => {
  //       console.log(loc);
  //       return {
  //         type: "Feature",
  //         properties: { cluster: false, id: loc.id, place: loc.place },
  //         geometry: {
  //           type: "Point",
  //           coordinates: [parseFloat(loc.longitude), parseFloat(loc.latitude)]
  //         }
  //       };
  //     })
  //   );
  // };

  useEffect(() => {
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
    fetchData();
  }, []);

  const getCoordinates = (evt) => {
    console.log(evt.lngLat[0], evt.lngLat[1]);
    setSource({
      ...source,
      latitude: Number(evt.lngLat[1].toFixed(7)),
      longitude: Number(evt.lngLat[0].toFixed(7)),
    });
  };

  // const mapRef = React.createRef();
  console.log(points);

  const submitData = () => {
    let form_data = new FormData();
    form_data.append("place", source.place);
    form_data.append("latitude", source.latitude);
    form_data.append("longitude", source.longitude);
    form_data.append("summary", source.summary);
    if (source.place_img == "") {
      form_data.append("place_img", source.place_img);
    } else {
      form_data.append("place_img", source.place_img, source.place_img.name);
    }
    let url = "/api/location/";

    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setSource({
          place: "",
          latitude: 0,
          longitude: 0,
          summary: "",
          place_img: "",
        });
        setErr(false);
        setSuccess(true);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setSuccess(false);
      });
  };

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSuperCluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: { radius: 75, maxZoom: 20 },
  });

  console.log(clusters);

  const classes = useStyles();

  return (
    <>
      <Card elevation={3} className="cardContent">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" className="pageHeading">
              Add New Location
            </Typography>
            {/* <h3 className="pageHeading">Add New Location</h3> */}
          </Grid>
          <Grid container item xs={12} direction="row-reverse" spacing={3}>
            <Grid item xs={12} md={8}>
              <MapGL
                {...viewport}
                // transitionInterpolator={new FlyToInterpolator({ speed: 4 })}
                // transitionDuration="auto"
                mapboxApiAccessToken={TOKEN}
                mapStyle="mapbox://styles/b30wulffz/ck77ua3ax0yt81ioers9qxmn0"
                onViewportChange={_onViewportChange}
                maxZoom={20}
                style={{ position: "relative" }}
                onClick={(e) => {
                  getCoordinates(e);
                }}
                ref={mapRef}
                className="map"
              >
                <GeolocateControl
                  style={geolocateStyle}
                  positionOptions={{ enableHighAccuracy: true }}
                  trackUserLocation={true}
                />
                <div style={{ position: "absolute", right: 0, margin: "20px" }}>
                  <NavigationControl showCompass={false} />
                </div>

                {clusters.map((cluster) => {
                  const [longitude, latitude] = cluster.geometry.coordinates;
                  const {
                    cluster: isCluster,
                    point_count: pointCount,
                  } = cluster.properties;

                  if (isCluster) {
                    return (
                      <Marker
                        key={cluster.id}
                        latitude={latitude}
                        longitude={longitude}
                      >
                        <div
                          style={{
                            width: `${
                              10 + (pointCount / points.length) * 30
                            }px`,
                            height: `${
                              10 + (pointCount / points.length) * 30
                            }px`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            // backgroundColor: "red",
                            backgroundColor: "#1EA896",
                            color: "white",
                            borderRadius: "50%",
                            padding: "2px",
                          }}
                          onClick={() => {
                            const expansion = Math.min(
                              supercluster.getClusterExpansionZoom(cluster.id),
                              20
                            );
                            setViewPort({
                              ...viewport,
                              latitude,
                              longitude,
                              zoom: expansion,
                              transitionInterpolator: new FlyToInterpolator({
                                speed: 2,
                              }),
                              transitionDuration: "auto",
                            });
                          }}
                        >
                          {pointCount}
                        </div>
                      </Marker>
                    );
                  }
                  return (
                    <Marker
                      key={cluster.properties.place_id}
                      longitude={longitude}
                      latitude={latitude}
                    >
                      <div
                        style={{
                          // border: "thin solid black",
                          position: "relative",
                          height: "20px",
                          width: "20px",
                        }}
                        onClick={() => {
                          console.log(cluster.properties);
                          setPopupInfo({
                            ...cluster.properties,
                            latitude: latitude,
                            longitude: longitude,
                          });
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          color={"red"}
                          size={"lg"}
                          style={{
                            bottom: "50%",
                            right: "50%",
                            position: "relative",
                          }}
                        />
                      </div>
                    </Marker>
                  );
                })}
                {popupInfo && (
                  <Popup
                    tipSize={5}
                    anchor="bottom"
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    closeOnClick={false}
                    onClose={() => setPopupInfo(null)}
                  >
                    <LocDetails {...popupInfo} />
                  </Popup>
                )}
                {/* <Geocoder
            mapRef={mapRef}
            // onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={TOKEN}
            onSelected={onSelected}
            viewport={viewport}
            hideOnSelect={true}
            queryParams={{ country: "in" }}
          /> */}
                {/* 
        <Marker
          longitude={userLocation.longitude}
          latitude={userLocation.latitude}
          
        >
          <div
            style={{
              border: "thin solid black",
              position: "relative",
              height: "20px",
              width: "20px"
            }}
          >
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              color={"red"}
              size={"lg"}
              style={{ bottom: "50%", position: "relative" }}
            />
          </div>
        </Marker> */}
              </MapGL>
            </Grid>
            <Grid container item xs={12} md={4} spacing={4}>
              <Grid item xs={12}>
                <TextField
                  label="Source"
                  value={source.place}
                  onChange={(e) =>
                    setSource({ ...source, place: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Latitude"
                  type="number"
                  value={source.latitude}
                  onChange={(e) =>
                    setSource({
                      ...source,
                      latitude: Number(e.target.value.toFixed(7)),
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Longitude"
                  type="number"
                  value={source.longitude}
                  onChange={(e) =>
                    setSource({
                      ...source,
                      longitude: Number(e.target.value.toFixed(7)),
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Summary"
                  multiline
                  value={source.summary}
                  onChange={(e) =>
                    setSource({ ...source, summary: e.target.value })
                  }
                />
              </Grid>
              <Grid container item xs={12} spacing={1} alignItems="flex-end">
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    component="label"
                    className={classes.expandButton}
                  >
                    <ImageIcon />
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        setSource({ ...source, place_img: e.target.files[0] })
                      }
                    />
                  </Button>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    label="Upload Image"
                    value={source.place_img ? source.place_img.name || "" : ""}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
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
          Location Added Successfully!
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
          Error! Location cannot be added.
        </MuiAlert>
      </Snackbar>
    </>
    // {err ? (
    //               <Row>
    //                 <FadeIn>
    //                   <Card
    //                     title="Error"
    //                     className="red white-text"
    //                     style={{ width: "100%" }}
    //                   >
    //                     Not Uploaded!
    //                   </Card>
    //                 </FadeIn>
    //               </Row>
    //             ) : null}

    //             {success ? (
    //               <Row>
    //                 <FadeIn>
    //                   <Card
    //                     title="Success"
    //                     className="green white-text"
    //                     style={{ width: "100%" }}
    //                   >
    //                     Location Added Successfully!
    //                   </Card>
    //                 </FadeIn>
    //               </Row>
    //             ) : null}
  );
};

export default Map;
