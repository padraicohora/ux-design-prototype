import React, { useState } from "react";
import {
  Button,
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
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
  UncontrolledDropdown, UncontrolledPopover,
} from "reactstrap";
import Icon from "./Icon";
import {
  ACCOMMODATION_TYPE,
  ACCOUNT_CIRCLE,
  CALENDAR,
  PLACE,
  USERS,
} from "../constants/icons";
import { useHistory } from "react-router-dom";
import { HOME, TOGGLE_SEARCH_BAR } from "../../home/constants";
import { RESULTS } from "../../search/constants";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import "../../../styles/components/_react_dates_overrides.scss";

const Navigation = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [locationFocus, setLocationFocus] = useState(false);

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [datesFocused, setDatesFocused] = useState();

  const [guests, setGuests] = useState("2 - Adults");
  const [guestsFocused, setGuestsFocused] = useState(false);

  const [type, setType] = useState("Hotel");
  const [typeFocused, setTypeFocused] = useState(false);

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
    setStartDate(startDate);
    setEndDate(endDate);
  };
  return (
    <div className={"sticky-top"}>
      <Navbar color="white" light expand="md" className={"header-navigation"}>
        <Container>
          <NavbarBrand onClick={goHome}>book-assist</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto align-items-center" navbar>
              <NavItem>
                <Button
                  color="dark"
                  outline
                  onClick={showSearch}
                  style={{ width: 120 }}
                >
                  Book Now
                </Button>
              </NavItem>
              {/*<NavItem>*/}
              {/*  <Button*/}
              {/*    color={"transparent"}*/}
              {/*    className={"account-avatar pr-0"}*/}
              {/*    disabled*/}
              {/*  >*/}
              {/*    <Icon svg={ACCOUNT_CIRCLE} />*/}
              {/*  </Button>*/}
              {/*</NavItem>*/}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Collapse isOpen={searchOpen} className={"search-collapse bg-light"}>
        <Container>
          <Form inline className={"row px-3"}>
            <div className={"pr-2 flex-fill"}>
              <FormGroup className="mb-2 mb-sm-0 py-3">
                <InputGroup className={"flex-fill"}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      className={locationFocus ? "border-primary" : null}
                    >
                      <Icon svg={PLACE} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter location"
                    defaultValue={location}
                    onFocus={() => setLocationFocus(true)}
                    onBlur={() => setLocationFocus(false)}
                  />
                </InputGroup>
              </FormGroup>
            </div>
            <div className={"px-2 "}>
              <FormGroup className="mb-2 mb-sm-0">
                <InputGroup
                  className={`flex-fill ${datesFocused ? "focused" : null}`}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      className={datesFocused ? "border-primary" : null}
                    >
                      <Icon svg={CALENDAR} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <DateRangePicker
                    startDate={startDate}
                    startDateId="your_unique_start_date_id"
                    endDate={endDate}
                    endDateId="your_unique_end_date_id"
                    onDatesChange={setSearchDates}
                    focusedInput={datesFocused}
                    onFocusChange={(focusedInput) =>
                      setDatesFocused(focusedInput)
                    }
                    displayFormat={"DD/MM/YYYY"}
                    hideKeyboardShortcutsPanel
                    small
                  />
                </InputGroup>
              </FormGroup>
            </div>
            <div className={"px-2 "}>
              <FormGroup className="mb-2 mb-sm-0">
                <InputGroup className={"flex-fill"}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      className={guestsFocused ? "border-primary" : null}
                    >
                      <Icon svg={USERS} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id={"guestsInput"}
                    placeholder="Guests"
                    defaultValue={guests}
                    onFocus={() => setGuestsFocused(true)}
                    onBlur={() => setGuestsFocused(false)}
                  />
                  <UncontrolledPopover
                    trigger="legacy"
                    placement="bottom"
                    target="guestsInput"
                  >
                    test
                  </UncontrolledPopover>
                </InputGroup>
              </FormGroup>
            </div>
            <div className={"px-2 mr-2"}>
              <FormGroup className="mb-2 mb-sm-0">
                <InputGroup className={"flex-fill"}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      className={typeFocused ? "border-primary" : null}
                    >
                      <Icon svg={ACCOMMODATION_TYPE} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <UncontrolledDropdown setActiveFromChild>
                    <DropdownToggle
                      tag="CustomInput"
                      className="nav-link border-left-0 form-control input pl-2"
                      caret
                    >
                      {type}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        active={type === "Hotel"}
                        onClick={() => setType("Hotel")}
                      >
                        Hotel
                      </DropdownItem>
                      <DropdownItem
                        active={type === "Resorts"}
                        onClick={() => setType("Resorts")}
                      >
                        Resorts
                      </DropdownItem>
                      <DropdownItem
                        active={type === "Apartment"}
                        onClick={() => setType("Apartment")}
                      >
                        Apartment
                      </DropdownItem>
                      <DropdownItem
                        active={type === "Villa"}
                        onClick={() => setType("Villa")}
                      >
                        Villa
                      </DropdownItem>
                      <DropdownItem
                        active={type === "Cabin"}
                        onClick={() => setType("Cabin")}
                      >
                        Cabin
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {/*<Input*/}
                  {/*    style={{minWidth:160}}*/}
                  {/*    type="select"*/}
                  {/*    className={"border-left-0"}*/}
                  {/*  placeholder="Type"*/}
                  {/*  defaultValue={type}*/}
                  {/*  onFocus={() => setTypeFocused(true)}*/}
                  {/*  onBlur={() => setTypeFocused(false)}*/}
                  {/*>*/}
                  {/*  <option>Hotel</option>*/}
                  {/*  <option>Resorts</option>*/}
                  {/*  <option>Apartment</option>*/}
                  {/*  <option>Villa</option>*/}
                  {/*  <option>Cabin</option>*/}
                  {/*</Input>*/}

                  {/*<UncontrolledDropdown setActiveFromChild>*/}
                  {/*  <DropdownToggle tag="a" className="nav-link" caret>*/}
                  {/*    Dropdown*/}
                  {/*  </DropdownToggle>*/}
                  {/*  <DropdownMenu>*/}
                  {/*    <DropdownItem tag="a" href="/blah" active>Link</DropdownItem>*/}
                  {/*  </DropdownMenu>*/}
                  {/*</UncontrolledDropdown>*/}
                </InputGroup>
              </FormGroup>
            </div>
            <div style={{ width: 120 }}>
              <Button
                type={"submit"}
                color={"primary"}
                className={"w-100"}
                onClick={onSearch}
              >
                Search
              </Button>
            </div>
          </Form>
        </Container>
      </Collapse>
    </div>
  );
};
export default Navigation;
