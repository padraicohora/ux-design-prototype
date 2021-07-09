import React from "react";
import {BrowserRouter, Redirect, Route, Switch,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/index.scss";

import "normalize.css";
import {HOME} from "./home/constants/endpoints";
import Home from "./home/components/Home";
import {ASSIST_RESULTS, ASSIST_WIZARD} from "./assist/constants";
import {RESULTS} from "./search/constants";
import AssistantWizard from "./assist/components/AssitantWizard";
import AssistantResults from "./assist/components/AssitantResults";
import Results from "./search/components/Results";
import {COMPARISON} from "./comparison/constants";
import Comparison from "./comparison/components/Comparison";
import Booking from "./booking/components/Booking";
import {BOOKING} from "./booking/constants";
import Navigation from "./_common_/components/Navigation";

// const Login = lazy(() => import("./auth/Login"));
// const Recover = lazy(() => import("./auth/Recover"));
// const Signup = lazy(() => import("./auth/Signup"));
// const PrivateRoutes = lazy(() => import("./PrivateRoutes"));

const PublicRoutes = () => (
<BrowserRouter>
    <Navigation/>
    <Switch>
        <Route exact path={HOME} component={Home}/>
        <Route exact path={ASSIST_WIZARD} component={AssistantWizard}/>
        <Route exact path={ASSIST_RESULTS} component={AssistantResults}/>
        <Route exact path={RESULTS} component={Results}/>
        <Route exact path={COMPARISON} component={Comparison}/>
        <Route exact path={BOOKING} component={Booking}/>
        {/*<PrivateRoute path={SECURE} component={PrivateRoutes} />*/}
        <Redirect to={HOME}/>
    </Switch>

</BrowserRouter>
)
;

export default PublicRoutes;
