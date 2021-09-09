import React, { useEffect, useState } from "react";
import classnames from "classnames";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Collapse,
  Container,
  Dropdown,
  DropdownMenu,
  DropdownToggle, Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Popover,
  PopoverBody,
  PopoverHeader,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import { DateRangePicker } from "react-dates";
import Icon from "../../_common_/components/Icon";
import {
  ADD_CIRCLE,
  BED,
  CALENDAR,
  REMOVE_CIRCLE,
  USERS,
} from "../../_common_/constants/icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ensureNonEmpty, ensureNonNull } from "../../_common_/Utils";
import { HOME } from "../../home/constants";
import { Redirect, useHistory } from "react-router-dom";
import { guestString } from "../../_common_/components/Navigation";
import moment from "moment";
import _ from "lodash";
import { dateFormat } from "../../search/components/Results";
import champagne from "../../../assets/rooms/champagne.jpg";
import chocolate from "../../../assets/rooms/chocolate.jpg";
import fruit from "../../../assets/rooms/fruit.jpg";

const Booking = (props) => {
  const { deal, accommodation, deals, rooms, children, adults, rate, addOn } =
    useSelector((state) => state.booking);
  const { startDate, endDate, title } = useSelector((state) =>
    ensureNonNull(state.booking.accommodation)
  );

  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    if (!accommodation || !startDate || !endDate) {
      history.push(HOME);
    }
  }, [deals, startDate, endDate]);

  const [wizardStep, setWizardStep] = useState("Room Selection");
  const [bookingOpen, setBookingOpen] = useState(false);

  const [localStartDate, setStartDate] = useState(startDate);
  const [localEndDate, setEndDate] = useState(endDate);
  const [datesFocused, setDatesFocused] = useState();

  const setSearchDates = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const [guestPopover, setGuestPopover] = useState(false);

  let [localAdults, setAdults] = useState(2);
  const [localChildren, setChildren] = useState(0);
  const [localRooms, setRooms] = useState(1);

  const [guestsAmount, setGuestsAmount] = useState(
    guestString(adults, children, rooms)
  );

  const [activeDeal, setActiveDeal] = useState(
    ensureNonEmpty(deals).find((d) => d.title === ensureNonNull(deal).title)
  );
  
  useEffect(()=>{
    if(ensureNonNull(deal).title !== ensureNonNull(activeDeal).title){
      setActiveDeal(deal)
    }
  }, [deal])

  const handleSubmit = () => {
    dispatch({
      type: "SUBMIT_SEARCH",
      payload: {
        adults: localAdults,
        children: localChildren,
        rooms: localRooms,
        startDate: localStartDate,
        endDate: localEndDate,
      },
    });
    setBookingOpen(false);
  };

  const togglePanel = () => {
    dispatch({ type: "SHOW_DETAIL_PANEL", payload: accommodation });
  };

  const selectRate = (rate) => {
    dispatch({ type: "SELECT_DEAL_RATE", payload: rate });
    setWizardStep("Add-ons");
  };

  const setAddon = (addOn) => {
    dispatch({ type: "SELECT_ADD_ON", payload: addOn });
    setWizardStep("Payment");
  };

  const steps = ["Room Selection", "Add-ons", "Payment"];

  const WizardSteps = () =>
    steps.map((step, index) => {
      const active = steps.indexOf(wizardStep) === index;
      const success = steps.indexOf(step) < steps.indexOf(wizardStep);

      const stepClass = classnames("step", {
        "step-active": active,
        "step-success": success,
      });
      return (
        <li
          className={stepClass}
          onClick={() => (active || success) && setWizardStep(step)}
        >
          <div className="step-content">
            <span className="step-circle">{index + 1}</span>
            <span className="step-text">{step}</span>
          </div>
        </li>
      );
    });

  const submitDisabled =
    adults === localAdults &&
    children === localChildren &&
    rooms === localRooms &&
    startDate === localStartDate &&
    endDate === localEndDate;

  const BookingForm = () => {
    return (
      <>
        <Collapse isOpen={bookingOpen} className={"mt-4 booking-form"}>
          <Card color={"light"}>
            <CardBody className={"d-flex flex-column"}>
              <h5 className={"font-weight-bold "}>Edit Booking</h5>
              <FormGroup className="mb-3">
                <Label>Dates</Label>
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
                    startDate={localStartDate}
                    startDateId="your_unique_start_date_id"
                    endDate={localEndDate}
                    endDateId="your_unique_end_date_id"
                    onDatesChange={setSearchDates}
                    focusedInput={datesFocused}
                    onFocusChange={(focusedInput) => {
                      setDatesFocused(focusedInput);
                      setGuestPopover(false);
                    }}
                    customArrowIcon={<></>}
                    displayFormat={"DD/MM/YYYY"}
                    hideKeyboardShortcutsPanel
                    small
                    minDate={moment()}
                    maxDate={moment().add(1, "years")}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <Label>Guests</Label>
                <InputGroup className={"flex-fill"}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      className={guestPopover ? "border-primary" : null}
                    >
                      <Icon svg={USERS} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Dropdown
                    isOpen={guestPopover}
                    toggle={() => {
                      if (guestPopover) {
                        setGuestsAmount(
                          guestString(localAdults, localChildren, localRooms)
                        );
                      }
                      setGuestPopover(!guestPopover);
                    }}
                    className={"flex-fill"}
                  >
                    <DropdownToggle
                      tag="Input"
                      className={
                        guestPopover
                          ? "border-primary nav-link border-left-0 form-control input pl-2"
                          : "nav-link border-left-0 form-control input pl-2"
                      }
                      caret
                      id={"bookingFormGuestsInput"}
                      placeholder="Guests"
                      value={guestsAmount}
                      onChange={() => null}
                    >
                      {" "}
                      {guestsAmount}
                    </DropdownToggle>
                    <DropdownMenu>
                      <div className={"px-3"}>
                        <div className={"d-flex align-items-center mb-3"}>
                          <h5 className={"mb-0 flex-fill"}>Adults</h5>
                          <div
                            className={
                              "d-flex align-items-center border rounded"
                            }
                          >
                            <Button
                              onClick={() => setAdults(localAdults - 1)}
                              color={"light"}
                              className={"d-flex align-items-center"}
                              disabled={localAdults < 2}
                            >
                              <Icon svg={REMOVE_CIRCLE} />
                            </Button>
                            <div className={"px-3 text-primary flex-fill"}>
                              {localAdults}
                            </div>
                            <Button
                              onClick={() => setAdults(localAdults + 1)}
                              color={"light"}
                              className={"d-flex align-items-center"}
                              disabled={localAdults > 8}
                            >
                              <Icon svg={ADD_CIRCLE} />
                            </Button>
                          </div>
                        </div>
                        <div className={"d-flex align-items-center mb-3"}>
                          <h5 className={"mb-0 flex-fill"}>Children</h5>
                          <div
                            className={
                              "d-flex align-items-center border rounded"
                            }
                          >
                            <Button
                              onClick={() => setChildren(localChildren - 1)}
                              color={"light"}
                              className={"d-flex align-items-center"}
                              disabled={localChildren < 1}
                            >
                              <Icon svg={REMOVE_CIRCLE} />
                            </Button>
                            <div className={"px-3 text-primary flex-fill"}>
                              {localChildren}
                            </div>
                            <Button
                              onClick={() => setChildren(localChildren + 1)}
                              color={"dark"}
                              outline
                              className={"d-flex align-items-center"}
                              disabled={localChildren > 8}
                            >
                              <Icon svg={ADD_CIRCLE} />
                            </Button>
                          </div>
                        </div>
                        <div className={"d-flex align-items-center mb-3"}>
                          <h5 className={"mb-0 flex-fill"}>Rooms</h5>
                          <div
                            className={
                              "d-flex align-items-center border rounded"
                            }
                          >
                            <Button
                              onClick={() => setRooms(localRooms - 1)}
                              color={"light"}
                              className={"d-flex align-items-center"}
                              disabled={localRooms < 2}
                            >
                              <Icon svg={REMOVE_CIRCLE} />
                            </Button>
                            <div className={"px-3 text-primary flex-fill"}>
                              {localRooms}
                            </div>
                            <Button
                              onClick={() => setRooms(localRooms + 1)}
                              color={"light"}
                              className={"d-flex align-items-center"}
                              disabled={localRooms > 3}
                            >
                              <Icon svg={ADD_CIRCLE} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </InputGroup>
              </FormGroup>
              <div className={"align-items-end d-flex flex-fill"}>
                <Button
                  color={"primary"}
                  className={"mr-2"}
                  onClick={handleSubmit}
                  disabled={submitDisabled}
                >
                  Search
                </Button>
                <Button
                  color={"dark"}
                  outline
                  onClick={() => {
                    setBookingOpen(false);
                    setRooms(rooms);
                    setChildren(children);
                    setAdults(adults);
                    setGuestsAmount(guestString(adults, children, rooms));
                    setEndDate(endDate);
                    setStartDate(startDate);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </>
    );
  };

  const BookingContainer = () => (
    <Row>
      <Col sm={12}>
        <h4 className={"text-center text-secondary font-weight-bold"}>
          Choose Room Offer
        </h4>
      </Col>
      <Col sm={1} />
      <Col sm={3}>
        <BookingForm />
        <div className={"bg-light p-5 text-center rounded shadow mt-4"}>
          <div className={"d-flex text-muted mb-2"}>
            <div className={"bg-white flex-fill mx-3 py-3 "}>
              <h2 className={"mb-1"}>{startDate.format("Do")}</h2>
              <h6 className={"mb-0"}>{startDate.format("MMM")}</h6>
            </div>
            <div className={"bg-white flex-fill mx-3 py-3"}>
              <h2 className={"mb-1"}>{endDate.format("Do")}</h2>
              <h6 className={"mb-0"}>{endDate.format("MMM")}</h6>
            </div>
          </div>
          <h4 className={"py-3 mb-0"}>
            {endDate.diff(startDate, "days")} nights
          </h4>
          <h6 className={"pb-3"}>{guestString(adults, children, rooms)}</h6>
          <Button
            color={"primary"}
            outline
            onClick={() => setBookingOpen(true)}
          >
            Edit Booking
          </Button>
        </div>
      </Col>
      <Col sm={7} className={"pl-5"}>
        <Rooms />
      </Col>
    </Row>
  );

  const rates = [
    {
      title: "Standard",
      benefit: "Breakfast included",
      term: "Non-refundable",
      priceAdd: 0,
    },
    {
      title: "Flexible",
      benefit: "Breakfast included",
      term: "Free Cancellation",
      priceAdd: 22,
    },
    {
      title: "Deluxe",
      benefit: "Late checkout, Breakfast included",
      term: "Free Cancellation",
      priceAdd: 36,
    },
  ];

  const Rate = (props) => {
    const { title, benefit, term, priceAdd } = props;
    const rate = {
      price: deal.price + priceAdd,
      ...props,
    };
    return (
      <tr>
        <td className={"booking-rates"}>
          <p className={"mb-1"}>
            {title} {activeDeal.title}
          </p>
          <small>{benefit}</small>
        </td>
        <td className={"booking-terms"}>{term}</td>
        <td className={"booking-price"}>
          <div className={"flex-fill"}>
            <p className={"mb-0"}>€{deal.price + priceAdd}</p>
            <small>Per night{rooms > 1 ? ", Per room" : ""}</small>
          </div>
          <Button
            color={"primary"}
            outline
            onClick={() => selectRate(rate)}
            className={"ml-4"}
          >
            Book
          </Button>
        </td>
      </tr>
    );
  };

  const Rooms = () => {
    const dealClone = _.clone(deals);
    dealClone.splice(
      deals.findIndex((d) => d.title === activeDeal.title),
      1
    );
    dealClone.unshift(activeDeal);
    const roomDeals = ensureNonEmpty(dealClone).map((deal, index) => {
      const isActive = activeDeal.title === deal.title;
      return (
        <div className={isActive ? "active-deal" : ""}>
          <Row
            className={"room-deal mt-4"}
            key={deal.title}
            onClick={() => setActiveDeal(deal)}
          >
            <Col sm="3" className={"overflow-hidden"}>
              <img src={deal.image} className={"w-100"} />
            </Col>
            <Col sm="9">
              <h5 className={"font-weight-bold d-flex align-items-center"}>
                <span className={"flex-fill"}>{deal.title}</span>
                <Badge color={"grey"}>€{deal.price}</Badge>
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                adipisci alias aliquid, aut deserunt, dicta dolorum esse id
              </p>
              <div className={"text-muted"}>
                <Icon svg={BED} className={"mr-1"} />
                <span className={"mr-2"}>{deal.bed}</span>
                <Icon svg={USERS} className={"mr-1"} />
                <span className={"mr-2"}>{deal.person} guests</span>
              </div>
            </Col>
          </Row>
          <Collapse isOpen={isActive} toggle className={"p-3"}>
            <hr />
            <Table borderless hover className={"booking-deals"}>
              <thead className={"text-secondary"}>
                <tr>
                  <th>Available Rates</th>
                  <th>Terms</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((_rate) => (
                  <Rate {..._rate} />
                ))}
              </tbody>
            </Table>
            <hr />
          </Collapse>
        </div>
      );
    });

    return (
      <section id={"deals"}>
        {deals.length === 0 ? (
          <Alert color="danger" className={"mt-3 mb-2 d-flex flex-column"}>
            No rooms matching your booking criteria were available for you
            selected dates, please re-select dates again
          </Alert>
        ) : (
          roomDeals
        )}
      </section>
    );
  };

  const RoomSelection = () => (
    <>
      <BookingContainer />
    </>
  );

  const addOns = [
    {
      title: "Bottle of Prosecco Wine",
      price: 30,
      image: champagne,
    },
    {
      title: "Flowers and Fruit",
      price: 60,
      image: fruit,
    },
    {
      title: "Luxury Chocolate and Champagne",
      price: 100,
      image: chocolate,
    },
  ];

  const Extras = () =>
    ensureNonEmpty(addOns).map((addOn, index) => (
      <Row
        className={"room-deal add-on mt-5"}
        key={index}
        onClick={() => setAddon(addOn)}
      >
        <Col sm="3" className={"overflow-hidden"}>
          <img src={addOn.image} className={"w-100"} />
        </Col>
        <Col sm="9">
          <h5 className={"font-weight-bold d-flex align-items-center mb-3"}>
            <span className={"flex-fill"}>{addOn.title}</span>
            <Badge color={"grey"}>€{addOn.price}</Badge>
          </h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem est ex, harum maiores nulla quam quas quia quis similique tempore totam ullam. Ad, at, quisquam. Enim officia reiciendis temporibus.</p>
        </Col>
      </Row>
    ));

  const AddOns = () => (
    <Row className={"booking-summary"}>
      <Col sm={12}>
        <h4 className={"text-center text-secondary font-weight-bold"}>
          Choose Add-Ons
        </h4>
      </Col>
      <Col sm={1} />
      <Col sm={3}>
        <div className={"bg-light p-4 rounded shadow mt-4"}>
          <h4 className={"text-muted"}>Booking Summary</h4>
          <div className={"mb-2"}>
            <p className={"mb-0 font-weight-bold"}>
              {rate.title} {activeDeal.title}
            </p>
            <Badge color={"primary"} className={"mr-3"}>
              {rate.benefit}
            </Badge>
            <Badge color={"primary"}>
              {rate.term}
            </Badge>
          </div>
          <table className={"mb-3"}>
            <tbody>
              <tr>
                <td>
                  <strong>Checkin</strong>
                </td>
                <td className={"text-left"}>{startDate.format(dateFormat)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Checkout</strong>
                </td>
                <td className={"text-left"}>{endDate.format(dateFormat)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Nights</strong>
                </td>
                <td className={"text-left"}>
                  {endDate.diff(startDate, "days")}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Guests</strong>
                </td>
                <td className={"text-left"}>{children + adults}</td>
              </tr>
              <tr>
                <td>
                  <strong>Rooms</strong>
                </td>
                <td className={"text-left"}>{rooms}</td>
              </tr>
              <tr>
                <td>
                  <strong>Rate</strong>
                </td>
                <td className={"text-left"}>
                  €{rate.price} per night{rooms > 1 ? ", per room" : ""}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Total cost</strong>
                </td>
                <td className={"text-left"}>
                  €{rate.price * endDate.diff(startDate, "days") * rooms}
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            color={"primary"}
            outline
            onClick={() => setWizardStep("Room Selection")}
          >
            Go Back
          </Button>
        </div>
      </Col>
      <Col sm={7} className={"pl-5"}>
        <Extras />
        <Button color={"dark"} outline onClick={() => setWizardStep("Payment")} className={"my-4"}>
          Skip
        </Button>
      </Col>
    </Row>
  );

  const Payment = () => (
      <Row className={"booking-summary"}>
        <Col sm={12}>
          <h4 className={"text-center text-secondary font-weight-bold"}>
            Payment
          </h4>
        </Col>
        <Col sm={1} />
        <Col sm={3}>
          <div className={"bg-light p-4 rounded shadow mt-4"}>
            <h4 className={"text-muted"}>Booking Summary</h4>
            <div className={"mb-2"}>
              <p className={"mb-0 font-weight-bold"}>
                {rate.title} {activeDeal.title}
              </p>
              <Badge color={"primary"} className={"mr-3"}>
                {rate.benefit}
              </Badge>
              <Badge color={"primary"}>
                {rate.term}
              </Badge>
            </div>
            <table className={"mb-3"}>
              <tbody>
              <tr>
                <td>
                  <strong>Checkin</strong>
                </td>
                <td className={"text-left"}>{startDate.format(dateFormat)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Checkout</strong>
                </td>
                <td className={"text-left"}>{endDate.format(dateFormat)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Nights</strong>
                </td>
                <td className={"text-left"}>
                  {endDate.diff(startDate, "days")}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Guests</strong>
                </td>
                <td className={"text-left"}>{children + adults}</td>
              </tr>
              <tr>
                <td>
                  <strong>Rooms</strong>
                </td>
                <td className={"text-left"}>{rooms}</td>
              </tr>
              <tr>
                <td>
                  <strong>Rate</strong>
                </td>
                <td className={"text-left"}>
                  €{rate.price} per night{rooms > 1 ? ", per room" : ""}
                </td>
              </tr>
              {addOn && <tr>
                <td>
                  <strong>Add On</strong>
                </td>
                <td className={"text-left"}>
                  {addOn.title} - €{addOn.price}
                </td>
              </tr>}
              <tr>
                <td>
                  <strong>Total cost</strong>
                </td>
                <td className={"text-left"}>
                  €{rate.price * endDate.diff(startDate, "days") * rooms + (addOn ? addOn.price : 0)}
                </td>
              </tr>
              </tbody>
            </table>
            <Button
                color={"primary"}
                outline
                onClick={() => setWizardStep("Add-ons")}
            >
              Go Back
            </Button>
          </div>
        </Col>
        <Col sm={7} className={"pl-5 my-4"}>
          <Form>
            <hr/>
            <h5>Personal Details</h5>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">First name</Label>
                  <Input type="text" name="email" id="exampleEmail" placeholder="Enter first name" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Last name</Label>
                  <Input type="text" name="password" id="examplePassword" placeholder="Enter last name" />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="email address" />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleAddress">Address</Label>
              <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleAddress2">Address 2</Label>
              <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor"/>
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">City</Label>
                  <Input type="text" name="city" id="exampleCity"/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleState">State</Label>
                  <Input type="text" name="state" id="exampleState"/>
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="exampleZip">Zip</Label>
                  <Input type="text" name="zip" id="exampleZip"/>
                </FormGroup>
              </Col>
            </Row>
            <hr/>
            <h5>Card Details</h5>
            <Row form>

              <Col md={12}>
                <div className="form-group"><label htmlFor="username">
                  <h6>Card Owner</h6>
                </label> <input type="text" name="username" placeholder="Card Owner Name"
                                required className="form-control "/></div>
              <div className="form-group"><label htmlFor="cardNumber">
                <h6>Card number</h6>
              </label>
                <div className="input-group"><input type="text" name="cardNumber"
                                                    placeholder="Valid card number"
                                                    className="form-control " required/>
                  <div className="input-group-append"><span
                      className="input-group-text text-muted"> <i
                      className="fab fa-cc-visa mx-1"/> <i
                      className="fab fa-cc-mastercard mx-1"/> <i
                      className="fab fa-cc-amex mx-1"/> </span></div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <div className="form-group"><label><span className="hidden-xs">
                                                    <h6>Expiration Date</h6>
                                                </span></label>
                    <div className="input-group"><input type="number" placeholder="MM"
                                                        name="" className="form-control"
                                                        required/> <input type="number"
                                                                          placeholder="YY"
                                                                          name=""
                                                                          className="form-control"
                                                                          required/></div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group mb-4"><label data-toggle="tooltip"
                                                          title="Three digit CV code on the back of your card">
                    <h6>CVV <i className="fa fa-question-circle d-inline"/></h6>
                  </label> <input type="text" required className="form-control"/></div>
                </div>
              </div>
              </Col>
            </Row>
            <Button color={"primary"}> Confirm Payment</Button>
          </Form>

        </Col>
      </Row>
  );

  if (!accommodation) {
    return <Redirect to={HOME} />;
  }

  return (
    <div>
      <div className={"bg-light py-3"}>
        <Container>
          <Row>
            <Col sm={2} />
            <Col sm={8}>
              <ul className="steps">
                <WizardSteps />
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className={"py-3"}>
        <div className={"text-center my-3"}>
          <h2 className={"text-center "}>{title}</h2>
          <a
            href="javascript:void(0)"
            onClick={togglePanel}
            className={"text-center text-primary small"}
          >
            Hotel Information
          </a>
        </div>
        {steps.indexOf(wizardStep) === 0 && (
          <RoomSelection wizardStep={wizardStep} />
        )}
        {steps.indexOf(wizardStep) === 1 && <AddOns wizardStep={wizardStep} />}
        {steps.indexOf(wizardStep) === 2 && (
          <Payment
            wizardStep={wizardStep}
            // options={stayTypeOptions}
            // selection={selectedStay}
            // onClick={onSetSelectedStay}
          />
        )}
      </Container>
    </div>
  );
};

export default Booking;
