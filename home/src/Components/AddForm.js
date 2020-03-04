import React, { useState, useEffect } from "react";
import MapGL, {
  GeolocateControl,
  FlyToInterpolator,
  Marker,
  NavigationControl
} from "react-map-gl";
// import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Geocoder from "react-mapbox-gl-geocoder";

// import Pin from "./Pin";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import config from "../../assets/config";

const TOKEN = config.ACCESS_TOKEN;

const geolocateStyle = {
  float: "left",
  margin: "20px"
};

const Map = () => {
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "90vh",
    zoom: 6,
    latitude: 0,
    longitude: 0
  });

  // const [userLocation, setUserLocation] = useState({
  //   latitude: 0,
  //   longitude: 0
  // });

  const _onViewportChange = newViewport => {
    setViewPort({
      ...newViewport
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
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      // setUserLocation({
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude
      // });
      setViewPort({
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }, []);

  const getCoordinates = evt => {
    console.log(evt.lngLat[0], evt.lngLat[1]);
  };

  const mapRef = React.createRef();

  return (
    <div style={{ margin: "0 auto", width: "60vw" }}>
      {/* <Geocoder
        mapRef={mapRef}
        // onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={TOKEN}
        onSelected={onSelected}
        viewport={viewport}
        hideOnSelect={true}
      /> */}
      <MapGL
        {...viewport}
        // transitionInterpolator={new FlyToInterpolator({ speed: 4 })}
        // transitionDuration="auto"
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/b30wulffz/ck77ua3ax0yt81ioers9qxmn0"
        onViewportChange={_onViewportChange}
        maxZoom={10}
        style={{ position: "relative" }}
        onClick={e => {
          getCoordinates(e);
        }}
        ref={mapRef}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <div style={{ position: "absolute", right: 0, margin: "20px" }}>
          <NavigationControl showCompass={false} />
        </div>
        <Geocoder
          mapRef={mapRef}
          // onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={TOKEN}
          onSelected={onSelected}
          viewport={viewport}
          hideOnSelect={true}
          queryParams={{ country: "in" }}
        />
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
    </div>
  );
};

export default Map;
