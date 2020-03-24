import React, { useState, useEffect } from "react";
import { render } from "react-dom";
// import ReactLoading from "react-loading";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Anime from "react-anime";

import HomePage from "./HomePage";
import AddForm from "./AddForm";
import AddRoute from "./AddRoute";

// import * as cuteLoader from "../../assets/loader/1016-spirit-geek.json";
import * as cuteLoader from "../../assets/loader/11422-travel-icons-map.json";
// import * as cuteLoader from "../../assets/loader/11562-van-icon.json";
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
    }, 2000);
  }, []);

  return !load.loaded ? (
    // <Example type="bubbles" color="red" />
    <div className="loading">
      <FadeIn>
        <div className="loader">
          <Lottie options={defaultOptions} height={220} width={220} />
        </div>
      </FadeIn>
    </div>
  ) : (
    <BrowserRouter>
      <div className="homePage">
        <div className="navBar">
          <NavLink to="/" exact activeClassName="selectedTab">
            Home
          </NavLink>
          <NavLink to="/search" exact activeClassName="selectedTab">
            Search
          </NavLink>
          <NavLink to="/add" exact activeClassName="selectedTab">
            Add Location
          </NavLink>
          <NavLink to="/addRoute" exact activeClassName="selectedTab">
            Add Routes
          </NavLink>
        </div>
        <div className="showPage">
          <Switch>
            <Route exact path="/">
              {/* <div className={"home " + load.currClass}> */}
              {/* {!load.loaded ? (
              // <Example type="bubbles" color="red" />
              <FadeIn>
                <div className="loader">
                  <Lottie options={defaultOptions} height={220} width={220} />
                </div>
              </FadeIn>
            ) : ( */}
              <FadeIn>
                {/* <div> */}
                {/* <Anime
                opacity={[0, 1]}
                translateX={["100vw", 0]}
                easing
                duration={3000}
              > */}
                <HomePage />
                {/* </Anime> */}
                {/* <Form /> */}
                {/* <div className="loadedText">Loaded</div> */}
                {/* </div> */}
              </FadeIn>
              {/* )}s */}
              {/* </div> */}
            </Route>
            <Route exact path="/add">
              {/* <Anime opacity={[0, 1]} duration={2000}> */}
              {/* <FadeIn> */}
              {/* <div> */}
              <AddForm />
              {/* </div> */}
              {/* </FadeIn> */}
              {/* </Anime> */}
            </Route>
            <Route exact path="/addRoute">
              {/* <Anime opacity={[0, 1]} translateX={["100vw", 0]}> */}
              {/* <FadeIn> */}
              {/* <div> */}
              <AddRoute />
              {/* </div> */}
              {/* </FadeIn> */}
              {/* </Anime> */}
            </Route>
            <Route exact path="/search">
              {/* <Anime opacity={[0, 1]} translateX={["-100vw", 0]}> */}
              {/* <FadeIn style={{ width: "100%" }}> */}
              {/* <div> */}
              <SearchForm />
              {/* </div> */}
              {/* </FadeIn> */}
              {/* </Anime> */}
            </Route>
            <Route>
              <FadeIn>
                <div className={"errorTitle"}>
                  Error 404 - <span className={"logo"}>Not Found</span>
                </div>
              </FadeIn>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
  // <div className={"home " + load.currClass}>
  //   {!load.loaded ? (
  //     // <Example type="bubbles" color="red" />
  //     <FadeIn>
  //       <div className="loader">
  //         <Lottie options={defaultOptions} height={220} width={220} />
  //       </div>
  //     </FadeIn>
  //   ) : (
  //     <FadeIn>
  //       <SearchForm />
  //       {/* <Form /> */}
  //       {/* <div className="loadedText">Loaded</div> */}
  //     </FadeIn>
  //   )}
  // </div>
};
export default App;

const container = document.getElementById("app");
render(<App />, container);
