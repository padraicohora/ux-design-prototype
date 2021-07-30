import React, {useEffect, useState} from "react";
import {
  Button, CardSubtitle,
  CardTitle,
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
  Popover,
  Row,
  UncontrolledDropdown,
  UncontrolledPopover,
} from "reactstrap";
import Icon from "./Icon";
import {
  ACCOMMODATION_TYPE,
  ACCOUNT_CIRCLE,
  ADD_CIRCLE,
  AddCircleOutline,
  CALENDAR,
  PIN_DROP,
  PLACE,
  REMOVE_CIRCLE,
  RemoveCircleOutline,
  SEARCH_ICON, SEARCH_OFF_ICON,
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
import adventureHotels from "../../../data/json/adventure";
import romanceHotels from "../../../data/json/romantic";
import AccommodationCard from "../../home/components/AccommodationCard";
import locations from "../../../data/json/locations";
export const guestString = (adults, children, rooms) =>
    `${adults} Adults, ${
        children > 0 ? children + " Children, " : ""
    }${rooms} Rooms`;
const Navigation = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [locationFocus, setLocationFocus] = useState(false);

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(2, 'days'));
  const [datesFocused, setDatesFocused] = useState();

  const [guestsFocused, setGuestsFocused] = useState(false);

  let [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const [guestsAmount, setGuestsAmount] = useState(guestString(adults, children, rooms));

  const [type, setType] = useState("Hotel");
  const [typeFocused, setTypeFocused] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { searchOpen, searchLocations, searchAccommodations, searchRelated } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const toggle = () => setIsOpen(!isOpen);
  const showSearch = () => dispatch({ type: TOGGLE_SEARCH_BAR });
  const onSearch = (e) => {
    e.preventDefault();
    history.push(RESULTS);
    dispatch({
      type: "SUBMIT_SEARCH",
      payload: {
        location,
        startDate,
        endDate,
        adults,
        children,
        rooms,
        type
      }
    });
  };

  const goHome = () => {
    if (!searchOpen) dispatch({ type: TOGGLE_SEARCH_BAR });
    history.push(HOME);
  };

  const setSearchDates = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };


  useEffect(() => {
    console.log(`location`, location)
    if(location.length > 2){
      dispatch({type:"SEARCH_BY_LOCATION", payload:location})
    }
  }, [ location ]);

  const LocationList = () => searchLocations.slice(0,5).map(hotel => <AccommodationCard compact locationBased {...hotel} key={hotel.id}/>)
  const AccommodationList = () => searchAccommodations.slice(0,5).map(hotel => <AccommodationCard compact {...hotel} key={hotel.id}/>)
  const RelatedList = () => searchRelated.slice(0,5).map(hotel => <AccommodationCard compact {...hotel} key={hotel.id}/>)

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
                  color="transparent"
                  onClick={showSearch}
                >
                  <Icon svg={!searchOpen ? SEARCH_ICON : SEARCH_OFF_ICON} />
                </Button>
              </NavItem>

            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Collapse isOpen={searchOpen} className={"search-collapse"}>
        <Container className={"position-relative"}>
          <Form inline className={"row px-3"}>
            <div className={"pr-2 flex-fill"}>
              <FormGroup className="mb-2 mb-sm-0 py-3">
                <InputGroup className={"flex-fill"} id={"locationInput"}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      className={locationFocus ? "border-primary" : null}
                    >
                      <Icon svg={PLACE} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder={`Enter a ${type} name or location`}
                    value={location}
                    autoComplete="off"
                    lpignore="true"
                    onFocus={() => setLocationFocus(true)}
                    onBlur={() => setLocationFocus(false)}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />

                </InputGroup>
                <Popover
                    hideArrow
                    fade={true}
                    trigger="focus"
                    isOpen={location.length > 2 && searchRelated.length !== 0 && popoverOpen}
                    placement="bottom-start"
                    target="locationInput"
                    container={"div.search-collapse .container"}
                    popperClassName={"location-suggestions"}
                    innerClassName={"p-4"}
                    toggle={()=> setPopoverOpen(!popoverOpen)}
                >
                  <Container className={"mb-2"}>
                    <h4 className={"font-weight-bold justify-content-between align-items-center d-flex mt-2 mb-4"}>
                      Showing results for "{location}"
                      <span className={"small "}>
                        {`${searchLocations.length + searchAccommodations.length + searchRelated.length} results`}
                      </span>
                    </h4>
                    <Row>
                      <Col sm={4}>
                        <h5 className={"d-flex align-items-center justify-content-between mb-4"}>Locations
                          <span className={"small mr-5"}>{`(${searchLocations.length})`}</span>
                        </h5>
                        <ul className={"list-group list-group-flush"}>
                          <LocationList/>
                        </ul>
                        <Button color={"primary"} outline>
                          Show All
                        </Button>
                      </Col>
                      <Col sm={4}>
                        <h5 className={"d-flex align-items-center justify-content-between mb-4"}>Accommodations
                          <span className={"small mr-5"}>{`(${searchAccommodations.length})`}</span>
                        </h5>
                        <ul className={"list-group list-group-flush"}>
                          <AccommodationList/>
                        </ul>
                        <Button color={"primary"} outline>
                          Show All
                        </Button>

                      </Col>
                      <Col sm={4}>
                        <h5 className={"d-flex align-items-center justify-content-between mb-4"}>
                          Related
                          <span className={"small mr-5"}>{`(${searchRelated.length})`}</span>
                        </h5>
                        <ul className={"list-group list-group-flush"}>
                          <RelatedList/>
                        </ul>
                        <Button color={"primary"} outline>
                          Show All
                        </Button>

                      </Col>
                    </Row>
                  </Container>
                </Popover>
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
                    customArrowIcon={<></>}
                    displayFormat={"DD/MM/YYYY"}
                    hideKeyboardShortcutsPanel
                    small
                  />
                </InputGroup>
              </FormGroup>
            </div>
            <div className={"px-2 "} style={{minWidth:270}}>
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
                    value={guestsAmount}
                    onChange={()=>null}
                    className={guestsFocused ? "border-primary" : null}
                  />
                  <Popover
                    hideArrow
                    fade={false}
                    trigger="legacy"
                    isOpen={guestsFocused}
                    placement="bottom"
                    target="guestsInput"
                    innerClassName={"pb-0"}
                    toggle={() => {
                      setGuestsFocused(!guestsFocused);
                      if (guestsFocused === true)
                        setGuestsAmount(guestString());
                    }}
                  >
                    <div>
                      <div className={"d-flex align-items-center mb-3"}>
                        <h5 className={"mb-0 flex-fill"}>Adults</h5>
                        <div className={"d-flex align-items-center border rounded"}>
                          <Button
                            onClick={() => setAdults(adults - 1)}
                            color={"light"}
                            className={"d-flex align-items-center"}
                            disabled={adults < 2}
                          >
                            <Icon svg={REMOVE_CIRCLE} />
                          </Button>
                          <div className={"px-3 text-primary flex-fill"}>
                            {adults}
                          </div>
                          <Button
                            onClick={() => setAdults(adults + 1)}
                            color={"light"}
                            className={"d-flex align-items-center"}
                            disabled={adults > 8}
                          >
                            <Icon svg={ADD_CIRCLE} />
                          </Button>
                        </div>
                      </div>
                      <div className={"d-flex align-items-center mb-3"}>
                        <h5 className={"mb-0 flex-fill"}>Children</h5>
                        <div
                          className={"d-flex align-items-center border rounded"}
                        >
                          <Button
                            onClick={() => setChildren(children - 1)}
                            color={"light"}
                            className={"d-flex align-items-center"}
                            disabled={children < 1}
                          >
                            <Icon svg={REMOVE_CIRCLE} />
                          </Button>
                          <div className={"px-3 text-primary flex-fill"}>
                            {children}
                          </div>
                          <Button
                            onClick={() => setChildren(children + 1)}
                            color={"light"}
                            className={"d-flex align-items-center"}
                            disabled={children > 8}
                          >
                            <Icon svg={ADD_CIRCLE} />
                          </Button>
                        </div>
                      </div>
                      <div className={"d-flex align-items-center mb-3"}>
                        <h5 className={"mb-0 flex-fill"}>Rooms</h5>
                        <div
                          className={"d-flex align-items-center border rounded"}
                        >
                          <Button
                            onClick={() => setRooms(rooms - 1)}
                            color={"light"}
                            className={"d-flex align-items-center"}
                            disabled={rooms < 2}
                          >
                            <Icon svg={REMOVE_CIRCLE} />
                          </Button>
                          <div className={"px-3 text-primary flex-fill"}>
                            {rooms}
                          </div>
                          <Button
                            onClick={() => setRooms(rooms + 1)}
                            color={"light"}
                            className={"d-flex align-items-center"}
                            disabled={rooms > 8}
                          >
                            <Icon svg={ADD_CIRCLE} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Popover>
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
                      tag="Input"
                      className="nav-link border-left-0 form-control input pl-2"
                      caret
                      value={type}
                      onChange={()=>null}
                      onFocus={() => setTypeFocused(true)}
                      onBlur={() => setTypeFocused(false)}
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
                        active={type === "Resort"}
                        onClick={() => setType("Resort")}
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
