import React, { useState, useEffect } from "react";
import { render } from "react-dom";
// import ReactLoading from "react-loading";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink,
  useHistory,
} from "react-router-dom";
import Anime from "react-anime";

import HomePage from "./HomePage";
import AddForm from "./AddForm2";
import AddRoute from "./AddRoute2";

// import * as cuteLoader from "../../assets/loader/1016-spirit-geek.json";
import * as cuteLoader from "../../assets/loader/11422-travel-icons-map.json";
// import * as cuteLoader from "../../assets/loader/11562-van-icon.json";
import Form from "./AddForm";
import SearchForm from "./SearchForm2";

import theme from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AddIcon from "@material-ui/icons/Add";

// const Example = ({ type, color }) => (
//   <ReactLoading type={type} color={color} height={667} width={375} />
// );

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: cuteLoader.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const CustomDrawer = (props) => {
  const history = useHistory();

  const handleNavClick = (path) => {
    history.push(path);
  };
  return (
    <Drawer
      anchor="bottom"
      open={props.drawer}
      onClose={() => props.setDrawer(false)}
    >
      <List
        onClick={() => props.setDrawer(false)}
        onKeyDown={() => props.setDrawer(false)}
      >
        <ListItem button onClick={() => handleNavClick("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem button onClick={() => handleNavClick("/search")}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary={"Search"} />
        </ListItem>
        <ListItem button onClick={() => handleNavClick("/add")}>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary={"Add Location"} />
        </ListItem>
        <ListItem button onClick={() => handleNavClick("/addRoute")}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Add Routes"} />
        </ListItem>
      </List>
    </Drawer>
  );
};

const App = () => {
  const [load, setLoad] = useState({
    loaded: false,
    currClass: "",
  });

  const [drawer, setDrawer] = useState(false);

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
        <Box display={{ xs: "block", md: "none" }}>
          <AppBar variant="secondary" position="fixed" color="secondary">
            <Toolbar>
              <IconButton edge="start" onClick={() => setDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap align="center">
                TravelX
              </Typography>
            </Toolbar>
          </AppBar>
          <CustomDrawer drawer={drawer} setDrawer={setDrawer} />
        </Box>
        <Box display={{ xs: "none", md: "block" }} flex={1}>
          <div className="navBar">
            <NavLink to="/" exact activeClassName="selectedTab">
              <Typography variant="body1">Home</Typography>
            </NavLink>
            <NavLink to="/search" exact activeClassName="selectedTab">
              <Typography variant="body1">Search</Typography>
            </NavLink>
            <NavLink to="/add" exact activeClassName="selectedTab">
              <Typography variant="body1">Add Location</Typography>
            </NavLink>
            <NavLink to="/addRoute" exact activeClassName="selectedTab">
              <Typography variant="body1">Add Routes</Typography>
            </NavLink>
          </div>
        </Box>
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

const ThemedApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

const container = document.getElementById("app");
render(<ThemedApp />, container);
