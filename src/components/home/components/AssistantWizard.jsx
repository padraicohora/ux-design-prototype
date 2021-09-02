import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    Col,
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
    UncontrolledDropdown
} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import classnames from "classnames";
import Icon from "../../_common_/components/Icon";
import {
    CALENDAR, CIRCLE_CHECK, CIRCLE_CHEVRON_BACK, CIRCLE_CHEVRON_FORWARD,
} from "../../_common_/constants/icons";
import Emoji from "../../_common_/components/Emoji";
import DateRangePicker from "react-dates/esm/components/DateRangePicker";
import moment from "moment";
import {ASSISTANT} from "../../assist/constants";
import {useHistory} from "react-router-dom";

const AssistantWizard = (props) => {
  const { wizardOpen, assistDate,
      assistSeason,
      assistHolidayType,
      assistAccommodation,
      assistLocation,
      assistPersonalisation } = useSelector((state) => state.assist);
  const dispatch = useDispatch();
  const history = useHistory();

  const [wizardStep, setWizardStep] = useState("Welcome");
  const [selectedPersonalisation, setSelectedPersonalisation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState([]);
  const [selectedStay, setSelectedStay] = useState([]);

  const toggleAssistant = () => {
    dispatch({ type: "SHOW_BOOK_ASSIST_WIZARD", payload: !wizardOpen });
    setWizardStep("Welcome");
  };

  const handlePrevious = () => {
    const current = steps.indexOf(wizardStep);
    setWizardStep(steps[current - 1]);
  };

  const handleNext = () => {
    const current = steps.indexOf(wizardStep);
    setWizardStep(steps[current + 1]);
  };

  const submitDisabled = () => {
      return !assistPersonalisation
  }
  const handleSubmit = () => {
    dispatch({ type: "SUBMIT_ASSISTANT"});

    history.push(ASSISTANT);
  };

    const stayTypeOptions = [ { icon: "⛳", label: "Family Fun Holiday" },
        { icon: "💋", label: "Romantic Getaway" }, { icon: "🛀", label: "Relaxing Break" },
        { icon: "🛶", label: "Adventure" }, { icon: "💼", label: "Work Related" }, ];

    const accommodationTypeOptions = [ { icon: "🛎️", label: "Hotels" },
        { icon: "🏠", label: "Self Catering Stays" }, { icon: "🏂", label: "Resorts" },
        { icon: "🏰", label: "Mansions" }, { icon: "🛖", label: "Cabins" }, ];

    const locationTypeOptions = [ { icon: "🌴", label: "Tropical" },
        { icon: "🏖️", label: "Coastal" }, { icon: "🏙️", label: "Urban" },
        { icon: "✨", label: "Unique" }, { icon: "🏛️", label: "Cultural" }, ];

  const personalisationOptions = [
    {
      icon: "🛏️",
      label: "Comfort",
        description: "is very comfortable and luxurious"
    },
    {
      icon: "💶️",
      label: "Low Cost",
        description: "is low cost and relatively inexpensive"
    },
    {
      icon: "📍",
      label: "Location",
        description: "is centrally located and close to local attractions"
    },
    {
      icon: "🛀",
      label: "Amenities",
        description: "has excellent amenities and provisions"
    },
    {
      icon: "🤿",
      label: "Attractions",
        description: "is surrounded by awesome attractions"
    },
    {
      icon: "🍽️",
      label: "Food and Beverages",
        description: "has a highly rated restaurant and bar"
    },
    {
      icon: "🏆",
      label: "Highly Rated",
        description: "is highly ratings and reviews"
    },
  ];

    const steps = [
        "Welcome",
        "Dates",
        "Stay Type",
        "Accommodation",
        "Location",
        "Personalise",
    ];

  const WizardSteps = () =>
    steps.map((step, index) => {
      const active = steps.indexOf(wizardStep) === index;
      const success = steps.indexOf(step) < steps.indexOf(wizardStep);

      const stepClass = classnames("step", {
        "step-active": active,
        "step-success": success,
      });
      return (
        <li className={stepClass} onClick={() => (active || success) && setWizardStep(step)}>
          <div className="step-content">
            <span className="step-circle">{index + 1}</span>
            <span className="step-text">{step}</span>
          </div>
        </li>
      );
    });

  const showNext = steps.indexOf(wizardStep) < steps.indexOf("Personalise");
  const showSubmit = steps.indexOf(wizardStep) === steps.indexOf("Personalise");
  const showPrevious = steps.indexOf(wizardStep) > steps.indexOf("Welcome");

  const nextDisabled = ()=> {

      if(steps.indexOf(wizardStep) === 1 && !((assistDate && assistDate.startDate && assistDate.endDate) || assistSeason)){
          return true
      }
      if(steps.indexOf(wizardStep) === 2 && !assistHolidayType){
          return true
      }
      if(steps.indexOf(wizardStep) === 3 && !assistAccommodation){
          return true
      }
      if(steps.indexOf(wizardStep) === 4 && !assistLocation){
          return true
      }
      if(steps.indexOf(wizardStep) === 5 && !assistPersonalisation){
          return true
      }
      return false
  }

  function onSetSelectPersonalisation(option) {
    setSelectedPersonalisation(option);
      dispatch({ type: "SET_BOOK_ASSIST_PERSONALISATION", payload: option });
  }

  function onSetSelectLocation(option) {

    setSelectedLocation(option);
      dispatch({ type: "SET_BOOK_ASSIST_LOCATION", payload: option });
  }

  function onSetSelectedAccommodation(option) {

    setSelectedAccommodation(option);
      dispatch({ type: "SET_BOOK_ASSIST_ACCOMMODATION", payload: option });
  }

  function onSetSelectedStay(option) {
    setSelectedStay(option);
      dispatch({ type: "SET_BOOK_ASSIST_HOLIDAY_TYPE", payload: option });
  }

  return (
    <Collapse
      isOpen={wizardOpen}
      className={"assistant-collapse pb-4"}
      timeout={{ appear: 2000, enter: 5000, exit: 500 }}
      mountOnEnter={true}
    >
      <div className={"bg-light py-3"}>
        <Container>
          <Row>
            <Col sm={2} />
            <Col sm={8}>
              <ul className="steps">
                <WizardSteps />
              </ul>
            </Col>
            <Col sm={2} />
          </Row>
        </Container>
      </div>
      <Container
        className={"flex-fill d-flex align-items-center justify-content-center position-relative"}
      >
          {steps.indexOf(wizardStep) > 0 && (
              <div className={"text-center position-absolute"} style={{ top: "50px", right: 0 }}>
              <Button
                  size={"sm"}
                  color={"secondary"}
                  className={"mx-4 icon-button"}
                  onClick={toggleAssistant}
              >
                  Close
              </Button>
          </div>)}
        <Row className={"py-5 w-100"}>
          <Col sm={1} />
          <Col
            sm={10}
            className={"d-flex align-items-center justify-content-center"}
          >
            {steps.indexOf(wizardStep) === 0 && (
              <Welcome wizardStep={wizardStep}
              />
            )}
            {steps.indexOf(wizardStep) === 1 && (
              <Dates wizardStep={wizardStep} />
            )}
            {steps.indexOf(wizardStep) === 2 && (
              <StayType wizardStep={wizardStep}
                        options={stayTypeOptions}
                        selection={selectedStay}
                        onClick={onSetSelectedStay}
              />
            )}
            {steps.indexOf(wizardStep) === 3 && (
              <Accommodation wizardStep={wizardStep}
                  options={accommodationTypeOptions}
                  selection={selectedAccommodation}
                  onClick={onSetSelectedAccommodation}
              />
            )}
            {steps.indexOf(wizardStep) === 4 && (
              <Location wizardStep={wizardStep}
                        options={locationTypeOptions}
                        selection={selectedLocation}
                        onClick={onSetSelectLocation}
              />
            )}
            {steps.indexOf(wizardStep) === 5 && (
              <Personalise
                wizardStep={wizardStep}
                options={personalisationOptions}
                selection={selectedPersonalisation}
                onClick={onSetSelectPersonalisation}
              />
            )}
          </Col>
          <Col sm={1} />
        </Row>
      </Container>
      <div
        className={
          "d-flex justify-content-center py-4 wizardButtons h-25 align-items-baseline"
        }
      >

          {steps.indexOf(wizardStep) > 0 ? (
                  <Button
                      color={"dark"}
                      size={"lg"}
                      outline
                      className={"mx-4 min-w-7rem icon-button"}
                      onClick={handlePrevious}
                      disabled={!showPrevious}
                  >
                      <Icon svg={CIRCLE_CHEVRON_BACK} />
                      Previous
                  </Button>) :

              ( <Button
                  color={"dark"}
                  size={"lg"}
                  outline
                  className={"mx-4 min-w-7rem icon-button"}
                  onClick={toggleAssistant}
              >
                  Cancel
              </Button>)}
        {steps.indexOf(wizardStep) > 0 ?
            steps.indexOf(wizardStep) === 5 ? (
            <Button
                color={"primary"}
                size={"lg"}
                className={"mx-4 min-w-7rem icon-button"}
                onClick={handleSubmit}
                disabled={!showSubmit || submitDisabled()}
            >
                Submit
                <Icon svg={CIRCLE_CHECK} />
            </Button>
        ) : (
            <Button
                color={"primary"}
                size={"lg"}
                outline
                outlines
                className={"mx-4 min-w-7rem icon-button"}
                onClick={handleNext}
                disabled={!showNext || nextDisabled()}
            >
                Next
                <Icon svg={CIRCLE_CHEVRON_FORWARD} />
            </Button>
        ) : (

            <Button
              color={"primary"}
              size={"lg"}
              className={"mx-4 min-w-7rem icon-button"}
              onClick={handleNext}
            >
              Let's Begin
            </Button>
        )}
      </div>

    </Collapse>
  );
};

const Welcome = () => {
  return (
    <WizardScreen
      heading={
        <>
          <Emoji symbol="🧙🏾‍♂️️" label="wizard" /> Greetings,
        </>
      }
      subheading={"I'm the Booking Wizard"}
      description={
        "Please answer some simple questions, and I will work my magic to find the best match for you"
      }
    >
      {/*<span className={"flex-fill"}>*/}
      {/*  <strong>Tip:</strong> You can skip any question, but the more you answer*/}
      {/*  the better I can assist you*/}
      {/*</span>*/}
    </WizardScreen>
  );
};

const Dates = (props) => {
    const dispatch = useDispatch();
    const { assistDate, assistSeason } = useSelector((state) => state.assist);
    const [startDate, setStartDate] = useState(assistDate && assistDate.startDate);
    const [endDate, setEndDate] = useState(assistDate && assistDate.endDate);
    const [datesFocused, setDatesFocused] = useState();
    const setSearchDates = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
        // dispatch({
        //     type: "SET_BOOK_ASSIST_DATE", payload: {startDate, endDate} });
    };
    useEffect(() => {
        // startDate && console.log(`startDate`, startDate.toString())
        // endDate && console.log(`endDate`, endDate.toString())
        // if(assistDate) {
        //     console.log(`endDate`, assistDate.startDate.toString())
        //     console.log(`endDate`, assistDate.endDate.toString())
        // }
        //
        // if(assistDate && startDate.toString() !== assistDate.startDate.toString() && endDate.toString() !== assistDate.endDate.toString()) {
        if(endDate && startDate)
            dispatch({
                type: "SET_BOOK_ASSIST_DATE",
                payload: {startDate, endDate}
            });
        // }
    }, [ startDate, endDate ]);
    const when_its_hot = "When it's hot";
    const not_too_hot = "When it's not too hot";
    const off_season = "When it's off season";
    const when_there_is_snow = "When there is snow";
    const christmas_new_year = "At Christmas and New Year";
    const [type, setType] = useState(assistSeason);
    const [typeFocused, setTypeFocused] = useState(false);

    useEffect(() => {
        if(type !== assistSeason){
            dispatch({ type: "SET_BOOK_ASSIST_SEASON", payload: type });
        }

    }, [ type ]);

    const dropdownClass = classnames("nav-link form-control input pl-2", {
        "bg-light":!type && !typeFocused
    })
    return (
    <WizardScreen
      heading={
        <>
          <Emoji symbol="📅" label="wizard" /> {props.wizardStep}
        </>
      }
      subheading={"When were you thinking of going?"}
    >
        <div className={"d-flex flex-fill justify-content-center px-2 text-center"}>
            <FormGroup className="mb-2 mb-sm-0 px-3 text-left">
                <Label className={"h5 font-weight-bold"}>Have a date?</Label>
                <InputGroup
                    style={{width:"240px"}}
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
            <FormGroup className="mb-2 mb-sm-0 px-3 text-left">
                <Label className={"h5 font-weight-bold"}>Or the season?</Label>
                <UncontrolledDropdown setActiveFromChild style={{width:"240px"}}>
                        <DropdownToggle
                            tag="Input"
                            className={dropdownClass}
                            caret
                            value={type ? type : "Select season"}
                            onChange={()=>null}
                            onFocus={() => setTypeFocused(true)}
                            onBlur={() => setTypeFocused(false)}
                        >
                            {type ? type : "Select season"}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                active={type === when_its_hot}
                                onClick={() => setType(when_its_hot)}
                            >
                                {when_its_hot}
                            </DropdownItem>
                            <DropdownItem
                                active={type === not_too_hot}
                                onClick={() => setType(not_too_hot)}
                            >
                                {not_too_hot}
                            </DropdownItem>
                            <DropdownItem
                                active={type === off_season}
                                onClick={() => setType(off_season)}
                            >
                                {off_season}
                            </DropdownItem>
                            <DropdownItem
                                active={type === when_there_is_snow}
                                onClick={() => setType(when_there_is_snow)}
                            >
                                {when_there_is_snow}
                            </DropdownItem>
                            <DropdownItem
                                active={type === christmas_new_year}
                                onClick={() => setType(christmas_new_year)}
                            >
                                {christmas_new_year}
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
            </FormGroup>
        </div>
    </WizardScreen>
  );
};

const StayType = (props) => {

  return (
    <WizardScreen
      heading={
        <>
          <Emoji symbol="⛱️️" label="stay type" /> {props.wizardStep}
        </>
      }
      subheading={<> What is the purpose of your stay?</>}
      // description={"Or skip to the next question"}
    >
      <WizardOptions items={props.options} onClick={props.onClick} selection={props.selection}/>
    </WizardScreen>
  );
};

const Accommodation = (props) => {

  return (
    <WizardScreen
      heading={
        <>
          <Emoji symbol="🏨" label="accommodation type" /> {props.wizardStep}
        </>
      }
      subheading={<> What type are you looking for?</>}
    >
      <WizardOptions items={props.options} onClick={props.onClick} selection={props.selection}/>
    </WizardScreen>
  );
};

const Location = (props) => {

  return (
    <WizardScreen
      heading={
        <>
          <Emoji symbol="🌄" label="location" /> {props.wizardStep}
        </>
      }
      subheading={<> Where would you like stay?</>}
    >
      <WizardOptions items={props.options} onClick={props.onClick} selection={props.selection}/>
    </WizardScreen>
  );
};

const Personalise = (props) => {
  return (
    <WizardScreen
      heading={
        <>
          <Emoji symbol="❤️" label="important" /> {props.wizardStep}
        </>
      }
      subheading={
        <> Finally, what is most important to you in a rented accommodation</>
      }
    >
      <WizardOptions
        items={props.options}
        onClick={props.onClick}
        selection={props.selection}
      />
    </WizardScreen>
  );
};

const WizardOptions = ({ items, onClick, selection = [] }) => {
  return items.map((item) => {
    const cardClass = classnames("wizard-card p-3", {
      selected: selection.label === item.label,
    });
    return (
      <Card
        key={item.label}
        onClick={() => onClick(item)}
        className={cardClass}
        style={{
          width: `calc(${100 / items.length}% - ${
            100 / items.length / (items.length - 1)
          }%)`,
        }}
      >
        <div
          className={
            "d-flex align-items-center justify-content-center flex-column flex-fill h5 mb-0"
          }
          style={{ minHeight: "100px" }}
        >
          <Emoji symbol={item.icon} label={item.label} className={"pb-2"} />
          {item.label}
        </div>
      </Card>
    );
  });
};

const WizardScreen = ({ children, heading, subheading, description }) => {
  return (
    <Container fluid className={"text-center position-relative"}>
      {heading && (
        <h1 className="font-weight-medium mb-2" style={{ fontSize: "2.1rem" }}>
          {heading}
        </h1>
      )}
      {subheading && (
        <h2 className={"text-nowrap"} style={{ fontSize: "1.6rem" }}>
          {subheading}
        </h2>
      )}
      {description && <h5 className={" px-5 m-5"}>{description}</h5>}
      <div className={"my-5 d-flex justify-content-between"}>{children}</div>
    </Container>
  );
};
export default AssistantWizard;
