import React from "react";
import { Redirect, Switch} from "react-router-dom";
import "./_common_/styles/index.scss";
import { useDispatch} from "react-redux";
import { ToastContainer, Slide } from "react-toastify";
import PrivateRoute from "./_common_/utility/PrivateRoute";
import "normalize.css";
import Home from "./home/components/Home";
import "react-toastify/dist/ReactToastify.css";
import { HOME } from "./home/constants/endpoints";
import {Container} from "reactstrap";

const PrivateRoutes = () => {
  const dispatch = useDispatch();

  return (
      <Container fluid>
        <ToastContainer transition={Slide} />
          <Switch>
            <PrivateRoute exact path={HOME} component={Home} />
            <Redirect to={HOME} />
          </Switch>
      </Container>
  );
};

export default PrivateRoutes;
