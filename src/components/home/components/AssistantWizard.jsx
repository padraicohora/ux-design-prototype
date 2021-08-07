import React, {useState} from "react";
import {Button, Card, Col, Collapse, Container, Row,} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import classnames from "classnames";
import Icon from "../../_common_/components/Icon";
import {
  CIRCLE_BACK, CIRCLE_CHECK, CIRCLE_CHEVRON_BACK, CIRCLE_CHEVRON_FORWARD,
} from "../../_common_/constants/icons";
import Emoji from "../../_common_/components/Emoji";

const AssistantWizard = (props) => {
  const { wizardOpen } = useSelector((state) => state.assist);
  const dispatch = useDispatch();

  const [wizardStep, setWizardStep] = useState("Welcome");
  const [selectedPersonalisation, setSelectedPersonalisation] = useState([]);

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

  const handleSubmit = () => {
    toggleAssistant();
  };

  const selectStaytype = (option) => {
    console.log(`selectStaytype`, option);
  };

  const steps = [
    "Welcome",
    "Dates",
    "Stay Type",
    "Accommodation",
    "Location",
    "Personalise",
  ];

  const personalisationOptions = [
    {
      icon: "🛏️",
      label: "Comfort",
    },
    {
      icon: "💶️",
      label: "Low Cost",
    },
    {
      icon: "📍",
      label: "Location",
    },
    {
      icon: "🛀",
      label: "Amenities",
    },
    {
      icon: "🤿",
      label: "Attractions",
    },
    {
      icon: "🍽️",
      label: "Food and Beverages",
    },
    {
      icon: "🏆",
      label: "Highly Rated",
    },

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
        <li className={stepClass} onClick={() => setWizardStep(step)}>
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

  function onSetSelectPersonalisation(option){
    const options = selectedPersonalisation.slice();
    const index = options.findIndex(o => o.label === option.label);
    if(index >= 0){
      options.splice(index, 1)
    }else{
      options.push(option)
    }
    console.log(`options`, options)
    setSelectedPersonalisation(options)
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
        className={"flex-fill d-flex align-items-center justify-content-center"}
      >
        <Row className={"py-5 w-100"}>
          <Col sm={1} />
          <Col
            sm={10}
            className={"d-flex align-items-center justify-content-center"}
          >
            {steps.indexOf(wizardStep) === 0 && (
              <Welcome wizardStep={wizardStep} />
            )}
            {steps.indexOf(wizardStep) === 1 && (
              <Dates wizardStep={wizardStep} />
            )}
            {steps.indexOf(wizardStep) === 2 && (
              <StayType wizardStep={wizardStep} onClick={selectStaytype} />
            )}
            {steps.indexOf(wizardStep) === 3 && (
              <Accommodation wizardStep={wizardStep} />
            )}
            {steps.indexOf(wizardStep) === 4 && (
              <Location wizardStep={wizardStep} />
            )}
            {steps.indexOf(wizardStep) === 5 && (
              <Personalise wizardStep={wizardStep} options={personalisationOptions} selection={selectedPersonalisation} onClick={onSetSelectPersonalisation}/>
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
        {steps.indexOf(wizardStep) === 0 && (
          <React.Fragment>
            <Button
              color={"dark"}
              size={"lg"}
              outline
              className={"mx-4 min-w-7rem icon-button"}
              onClick={toggleAssistant}
            >
              Cancel
            </Button>
            <Button
              color={"primary"}
              size={"lg"}
              className={"mx-4 min-w-7rem icon-button"}
              onClick={handleNext}
            >
              Let's Begin
            </Button>
          </React.Fragment>
        )}

        {steps.indexOf(wizardStep) > 0 && (
          <React.Fragment>
            <Button
              color={"dark"}
              outline
              className={"mx-4 min-w-7rem icon-button"}
              onClick={toggleAssistant}
            >
              <Icon svg={CIRCLE_BACK} />
              Cancel
            </Button>
            <Button
              color={"primary"}
              outline
              className={"mx-2 min-w-7rem icon-button"}
              onClick={handlePrevious}
              disabled={!showPrevious}
            >
              <Icon svg={CIRCLE_CHEVRON_BACK} />
              Previous
            </Button>
            <Button
              color={"primary"}
              outline
              className={"mx-2 min-w-7rem icon-button"}
              onClick={handleNext}
              disabled={!showNext}
            >
              Next
              <Icon svg={CIRCLE_CHEVRON_FORWARD} />
            </Button>
            <Button
              color={"primary"}
              className={"mx-4 min-w-7rem icon-button"}
              onClick={handleSubmit}
              disabled={!showSubmit}
            >
              Submit
              <Icon svg={CIRCLE_CHECK} />
            </Button>
          </React.Fragment>
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
      <span className={"flex-fill"}>
        <strong>Tip:</strong> You can skip any question, but the more you answer
        the better I can assist you</span>
    </WizardScreen>
  );
};

const Dates = (props) => {
  return (
    <WizardScreen
      heading={
        <>
          <Emoji symbol="📅" label="wizard" /> {props.wizardStep}
        </>
      }
      subheading={"When were you thinking of going?"}
      // description={"If you dont have a planned then skip to the next question"}
    >
      date picker
    </WizardScreen>
  );
};

const StayType = (props) => {
  const stayTypeOptions = [
    {
      icon: "⛳",
      label: "Family Fun Holiday",
    },
    {
      icon: "💋",
      label: "Romantic Getaway",
    },
    {
      icon: "🛀",
      label: "Relaxing Break",
    },
    {
      icon: "🛶",
      label: "Adventure",
    },
    {
      icon: "💼",
      label: "Work Related",
    },
  ];
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
      <WizardOptions items={stayTypeOptions} onClick={props.onClick} />
    </WizardScreen>
  );
};

const Accommodation = (props) => {
  const accommodationTypeOptions = [
    {
      icon: "🛎️",
      label: "Hotel",
    },
    {
      icon: "🏠",
      label: "Self Catering",
    },
    {
      icon: "🏂",
      label: "Resorts",
    },
    {
      icon: "🏰",
      label: "Mansion",
    },
    {
      icon: "🛖",
      label: "Cabin",
    },
  ];
  return (
    <WizardScreen
      heading={
        <>
          <Emoji symbol="🏨" label="accommodation type" /> {props.wizardStep}
        </>
      }
      subheading={<> What type are you looking for?</>}
    >
      <WizardOptions items={accommodationTypeOptions} onClick={props.onClick}/>
    </WizardScreen>
  );
};

const Location = (props) => {
  const locationTypeOptions = [
    {
      icon: "🌴",
      label: "Tropical",
    },
    {
      icon: "🏖️",
      label: "Coastal",
    },
    {
      icon: "🏙️",
      label: "Urban",
    },
    {
      icon: "✨",
      label: "Unique",
    },
    {
      icon: "🏛️",
      label: "Other",
    },
  ];
  return (
    <WizardScreen
      heading={
        <>
          <Emoji symbol="🌄" label="location" /> {props.wizardStep}
        </>
      }
      subheading={<> Where would you like stay?</>}
    >
      <WizardOptions items={locationTypeOptions} onClick={props.onClick}/>
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
      <WizardOptions items={props.options} onClick={props.onClick} selection={props.selection}/>
    </WizardScreen>
  );
};

const WizardOptions = ({ items, onClick, selection = [] }) => {
  console.log(`selection`, selection)
  return items.map((item) => {
    console.log(`selected`, selection.findIndex(s => s.label === item.label) >= 0)

    console.log(`item`, item)
    const cardClass = classnames("wizard-card p-3", {
      "selected":selection.findIndex(s => s.label === item.label) >= 0,
  })
    return (<Card
            key={item.label}
            onClick={() => onClick(item)}
            className={cardClass}
            style={{
              width: `calc(${100 / items.length}% - ${(100 / items.length) / (items.length - 1)}%)`
            }}
        >
          <div
              className={"d-flex align-items-center justify-content-center flex-column flex-fill h5 mb-0"}
              style={{ minHeight: "100px" }}>
            <Emoji symbol={item.icon} label={item.label} className={"pb-2"}/>
            {item.label}
          </div>
        </Card>);
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
