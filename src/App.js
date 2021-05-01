import React from "react";
import ToDo from './MyProject/ToDo';
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from "./MyProject/About";
import ContactUs from "./MyProject/ContactUs";
import SingleTask from "./MyProject/SingleTask";
import NotFound from "./MyProject/NotFound";
import NavMenu from "./MyProject/NavMenu";
import { connect } from "react-redux";
import Spiner from "./MyProject/Spinner"

const  App = (props) => {
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

    const {errorMessage, successMessage, loading} = props
  if(errorMessage){
      toast.error(errorMessage)
  }
  if(successMessage){
    toast.success(successMessage)
  }
  
  return (
    <>
    <div className="parent">
     { loading && <Spiner />

}
    <NavMenu />
      <Switch>
        {
          routes.map((route, index) => {
            return (
              <Route path={route.path} component={route.component} exact key={index}/>
            )
          })
        }
        <Redirect to="404" />
      </Switch>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

       
  </div>
  <footer >
  </footer>
  </>
     
  );
}


const mapStateToProps = (state) => {
  return{
    errorMessage: state.error,
      loading: state.loading,
      successMessage: state.successMessage,
  }
}

export default connect(mapStateToProps)(App);
