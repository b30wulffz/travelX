import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import Anime from "react-anime";
import { Icon } from "react-materialize";
import { Link } from "react-router-dom";

const HomePage = () => {
  //   const [load, setLoad] = useState({
  //     loaded: false,
  //     currClass: ""
  //   });

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setLoad({ loaded: true, currClass: "done" });
  //     }, 3000);
  //   }, []);

  return (
    <div className={"home"}>
      {/* <FadeIn>Welcome to travelX!</FadeIn> */}
      <div className={"title"}>
        Welcome to <span className={"logo"}>travelX!</span>
      </div>
      <div className={"tagline"}>
        {/* Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum! */}

        <Link to="/search">
          <div className={"continue"}>
            {/* Continue */}
            <Icon size={50}>navigate_next</Icon>
          </div>
        </Link>
      </div>
      {/* Lorem Ipsum */}
    </div>
  );
};
export default HomePage;
