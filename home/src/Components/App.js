import React, { useState, useEffect } from "react";
import { render } from "react-dom";
// import ReactLoading from "react-loading";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

import HomePage from "./HomePage";

// import * as cuteLoader from "../../assets/loader/1016-spirit-geek.json";
// import * as cuteLoader from "../../assets/loader/11422-travel-icons-map.json";
import * as cuteLoader from "../../assets/loader/11562-van-icon.json";
import Form from "./AddForm";
import SearchForm from "./SearchForm";

// const Example = ({ type, color }) => (
//   <ReactLoading type={type} color={color} height={667} width={375} />
// );

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: cuteLoader.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const App = () => {
  const [load, setLoad] = useState({
    loaded: false,
    currClass: ""
  });

  useEffect(() => {
    setTimeout(() => {
      setLoad({ loaded: true, currClass: "done" });
    }, 3000);
  }, []);

  return (
    <div className={"home " + load.currClass}>
      {!load.loaded ? (
        // <Example type="bubbles" color="red" />
        <FadeIn>
          <div className="loader">
            <Lottie options={defaultOptions} height={220} width={220} />
          </div>
        </FadeIn>
      ) : (
        <FadeIn>
          <SearchForm />
          {/* <Form /> */}
          {/* <div className="loadedText">Loaded</div> */}
        </FadeIn>
      )}
    </div>
  );
};
export default App;

const container = document.getElementById("app");
render(<App />, container);
