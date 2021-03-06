import React, {useState} from "react";
import {BrowserRouter, HashRouter, Redirect, Route, Switch,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/index.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "normalize.css";
import {HOME} from "./home/constants";
import Home from "./home/components/Home";
import {ASSIST_RESULTS, ASSIST_WIZARD, ASSISTANT} from "./assist/constants";
import {RESULTS} from "./search/constants";
import Assistant from "./assist/components/Assistant";
import Results from "./search/components/Results";
import {COMPARISON} from "./comparison/constants";
import Comparison from "./comparison/components/Comparison";
import Booking from "./booking/components/Booking";
import {BOOKING} from "./booking/constants";
import Navigation from "./_common_/components/Navigation";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Footer from "./_common_/components/Footer";
import {useSelector} from "react-redux";
import Loader from "./_common_/components/Loader";
import DetailModal from "./detail/components/DetailModal";
import ScrollToTop from "./_common_/components/ScrollToTop";

const PublicRoutes = () => {
    const { loading } = useSelector((state) => state.home);
    return <HashRouter>
        <ScrollToTop/>
        {!loading && <Navigation/>}
        <Switch>
            <Route exact path={HOME} component={Home}/>
            <Route exact path={ASSISTANT} component={Assistant}/>
            <Route exact path={RESULTS} component={Results}/>
            <Route exact path={COMPARISON} component={Comparison}/>
            <Route exact path={BOOKING} component={Booking}/>

            <Redirect to={HOME}/>
        </Switch>
            <DetailModal/>

        {loading && <Loader className="vh-100 col-sm-12 col-xl-12 app-loader"/>}
        <Footer/>
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            // autoClose={false}
            closeOnClick
            pauseOnFocusLoss
            draggable={true}
            pauseOnHover
        />
    </HashRouter>;
};

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
