import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

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
    <div className={"home done"}>
      <FadeIn>Welcome to travelX!</FadeIn>
    </div>
  );
};
export default HomePage;
