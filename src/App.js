import React from "react";
import ToDo from './MyProject/ToDo';
import {BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import About from "./MyProject/About";
import ContactUs from "./MyProject/ContactUs";
import SingleTask from "./MyProject/SingleTask";
import NotFound from "./MyProject/NotFound";
import NavMenu from "./MyProject/NavMenu";

function App() {
  return (
    <>
    <NavMenu />
    <Router>
      <Switch>
        <Route path='/' component={ToDo} exact />
        <Route path='/about' component={About} exact />
        <Route path='/contact' component={ContactUs} exact />
        <Route path='/task/:id' component={SingleTask} exact />
        <Route path='/404' component={NotFound} exact />
        <Redirect to="404" />
      </Switch>

    </Router>
  </>
     
  );
}

export default App;
