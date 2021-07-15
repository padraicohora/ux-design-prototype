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
import moment from "moment";

import "react-dates/initialize";
// import "react-dates/lib/css/_datepicker.css";
import {DateRangePicker} from "react-dates";
import "./react_dates_overrides.scss"



const Navigation = (props) => {
    const history = useHistory();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ location, setLocation ] = useState("");
    const [ locationFocus, setLocationFocus ] = useState(false);

    const [ startDate, setStartDate ] = useState(moment());
    const [ endDate, setEndDate ] = useState(moment());
    const [ datesFocused, setDatesFocused ] = useState();


    const [ guests, setGuests ] = useState("2 - Adults");
    const [ guestsFocused, setGuestsFocused ] = useState(false);

    const { searchOpen } = useSelector((state) => state.home);
    const dispatch = useDispatch();
    const toggle = () => setIsOpen(!isOpen);
    const showSearch = () => dispatch({ type: TOGGLE_SEARCH_BAR });
    const onSearch = (e) => {
        e.preventDefault();
        history.push(RESULTS);
        showSearch();
    };

    const goHome = () => {
        if (!searchOpen) dispatch({ type: TOGGLE_SEARCH_BAR });
        history.push(HOME);
    };

    const setSearchDates = ({ startDate, endDate }) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }
    return (<div className={"sticky-top"}>
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
                                    <InputGroupAddon addonType="prepend" >
                                        <InputGroupText className={locationFocus ? "border-primary":null}>
                                            <Icon svg={PLACE}/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Enter location"
                                           defaultValue={location}
                                           onFocus={() => setLocationFocus(true)}
                                           onBlur={() =>setLocationFocus(false)}/>
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
                                    <DateRangePicker
                                        startDate={startDate}
                                        startDateId="your_unique_start_date_id"
                                        endDate={endDate}
                                        endDateId="your_unique_end_date_id"
                                        onDatesChange={setSearchDates}
                                        focusedInput={datesFocused}
                                        onFocusChange={( focusedInput ) => setDatesFocused(focusedInput)}
                                        displayFormat={ 'DD/MM/YYYY'}
                                        small
/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col sm={3} className={"px-2"}>
                            <FormGroup className="mb-2 mb-sm-0">
                                <InputGroup className={"flex-fill"}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className={guestsFocused ? "border-primary":null}>
                                            <Icon svg={USERS}/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Guests" defaultValue={guests}
                                           onFocus={() => setGuestsFocused(true)}
                                           onBlur={() =>setGuestsFocused(false)}/>
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
        </div>);
};
export default Navigation;
