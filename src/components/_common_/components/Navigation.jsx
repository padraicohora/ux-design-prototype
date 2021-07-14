import React, {useState} from "react";
import {
    Button,
    Col,
    Collapse,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
} from "reactstrap";
import Icon from "./Icon";
import {ACCOUNT_CIRCLE, CALENDAR, PLACE, USERS} from "../constants/icons";
import {useHistory} from "react-router-dom";
import {HOME, TOGGLE_SEARCH_BAR} from "../../home/constants";
import {RESULTS} from "../../search/constants";
import {useDispatch, useSelector} from "react-redux";

// import {NavLink} from "react-router-dom";

const Navigation = (props) => {
    const history                     = useHistory();
    const [isOpen, setIsOpen]         = useState(false);
    const [location, setLocation]     = useState("");
    const [datesPanel, setDatesPanels] = useState("");
    const [guests, setGuests]         = useState("2 - Adults");
    const [dates, setDates]           = useState("");

    const {searchOpen} = useSelector((state) => state.home);
    const dispatch     = useDispatch();
    const toggle       = () => setIsOpen(!isOpen);
    const showSearch   = () => dispatch({type: TOGGLE_SEARCH_BAR});
    const onSearch     = (e) => {
        e.preventDefault();
        history.push(RESULTS);
        showSearch();
    };

    const goHome = () => {
        console.log(`searchOpen`, searchOpen);
        if (!searchOpen) dispatch({type: TOGGLE_SEARCH_BAR});
        history.push(HOME);
    };

    return (
        <div className={"sticky-top"}>
            <Navbar color="white" light expand="md" className={"header-navigation"}>
                <Container>
                    <NavbarBrand onClick={goHome}>book-assist</NavbarBrand>
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto align-items-center" navbar>
                            <NavItem>
                                <Button color="dark" outline onClick={showSearch}>
                                    Book Now
                                </Button>
                            </NavItem>
                            <NavItem>
                                <Button color={"transparent"} className={"account-avatar pr-0"}
                                        disabled>
                                    <Icon svg={ACCOUNT_CIRCLE}/>
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
            <Collapse isOpen={searchOpen} className={"search-collapse bg-light"}>
                <Container>
                    <Form inline className={"row"}>
                        <Col sm={4} className={"pr-2"}>
                            <FormGroup className="mb-2 mb-sm-0 py-3">
                                <InputGroup className={"flex-fill"}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <Icon svg={PLACE}/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Enter location" value={location}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm={4} className={"px-2"}>
                            <FormGroup className="mb-2 mb-sm-0">
                                <InputGroup className={"flex-fill"}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <Icon svg={CALENDAR}/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Check-in / Check out" value={dates}
                                           onClick={() => setDatesPanel(!datesPanel)}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm={3} className={"px-2"}>
                            <FormGroup className="mb-2 mb-sm-0">
                                <InputGroup className={"flex-fill"}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <Icon svg={USERS}/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Guests" value={guests}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm={1} className={"pl-2"}>
                            <Button
                                type={"submit"}
                                color={"primary"}
                                className={"w-100"}
                                onClick={onSearch}
                            >
                                Search
                            </Button>
                        </Col>
                    </Form>
                </Container>
            </Collapse>
        </div>
    );
};
export default Navigation;
