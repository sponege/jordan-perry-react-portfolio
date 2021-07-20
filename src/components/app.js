import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import PortfolioContainer from "./portfolio/portfolio-container";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN", // LOGGED_IN, NOT_LOGGED_IN
    };

    this.handleSuccessfulLogin = () => {
      this.setState({
        loggedInStatus: "LOGGED_IN",
      });
    };

    this.handleUnsuccessfulLogin = () => {
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
      });
    };

    this.handleLogout = () => {
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
      });
    };

    this.checkLoginStatus = () => {
      return axios
        .get("https://api.devcamp.space/logged_in", {
          withCredentials: true,
        })
        .then((response) => {
          if (
            !(
              this.state.loggedInStatus == "LOGGED_IN" &&
              response.data.logged_in
            )
          )
            this.setState({
              loggedInStatus: response.data.logged_in
                ? "LOGGED_IN"
                : "NOT_LOGGED_IN",
            });
          return response.data.logged_in;
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };

    this.authorizedPages = () => {
      return [
        <Route
          key="portfolio-manager"
          path="/portfolio-manager"
          component={PortfolioManager}
        />,
      ]; // list (or array) of routes
    };
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavigationContainer
              loggedInStatus={this.state.loggedInStatus}
              handleLogout={this.handleLogout}
            />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/auth"
                render={(props) => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />
              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />

              <Route
                path="/blog"
                render={(props) => (
                  <Blog {...props} loggedInStatus={this.state.loggedInStatus} />
                )}
              />

              <Route
                exact
                path="/b/:slug"
                render={(props) => (
                  <BlogDetail
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )}
              />
              {this.state.loggedInStatus == "LOGGED_IN"
                ? this.authorizedPages()
                : null}
              <Route
                exact
                path="/portfolio/:slug"
                component={PortfolioDetail}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
