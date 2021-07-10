import React, {useState} from "react";
import {BrowserRouter, Redirect, Route, Switch,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/index.scss";

import "normalize.css";
import {HOME} from "./home/constants";
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
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

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
{/*<AccountModal open={open}/>*/}
</BrowserRouter>
);

const AccountModal = ({open}) => {
    const [modal, setModal] = useState(open);
    const [backdrop, setBackdrop] = useState(true);
    const [keyboard, setKeyboard] = useState(true);

    const toggle = () => setModal(!modal);

    const changeBackdrop = e => {
        let value = e.target.value;
        if (value !== 'static') {
            value = JSON.parse(value);
        }
        setBackdrop(value);
    }

    const changeKeyboard = e => {
        setKeyboard(e.currentTarget.checked);
    }

    return  <Modal isOpen={modal} toggle={toggle} className={className} backdrop={backdrop} keyboard={keyboard}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
    <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
    </ModalFooter>
</Modal>
}

export default PublicRoutes;
