import React from "react";
import ToDo from './MyProject/ToDo';
import {BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import About from "./MyProject/About";
import ContactUs from "./MyProject/ContactUs";
import SingleTask from "./MyProject/SingleTask";
import NotFound from "./MyProject/NotFound";
import NavMenu from "./MyProject/NavMenu";

const  App = () => {
  const routes = [
    {
      path:"/",
      component:ToDo,
    },
    {
      path:"/about",
      component:About,
    },
    {
      path:"/contact",
      component:ContactUs,
    },
    {
      path:"/task/:id",
      component:SingleTask,
    },
    {
      path:"/404",
      component:NotFound,
    },
  ]
  return (
    <>
    <NavMenu />
    <Router>
      <Switch>
        {
          routes.map((route, index) => {
            return(
              <Route path={route.path} component={route.component} exact key={index}/>
            )
          })
        }
        <Redirect to="404" />
      </Switch>

    </Router>
  </>
     
  );
}

export default App;
