import propTypes from "prop-types";
import React, { useState } from "react";
import {Button, Col, Collapse, Container, Jumbotron, Row} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import Icon from "../../_common_/components/Icon";
import {
  CIRCLE_ARROW_BACK,
  CIRCLE_BACK,
  CIRCLE_BACKWARD,
  CIRCLE_CHECK,
  CIRCLE_CHEVRON_BACK,
  CIRCLE_CHEVRON_FORWARD,
  CIRCLE_FORWARD, HAT_WIZARD
} from "../../_common_/constants/icons";
import {HatWizard} from "@styled-icons/fa-solid/HatWizard";
import Emoji from "../../_common_/components/Emoji";

const AssistantWizard = (props) => {
  const { wizardOpen } = useSelector((state) => state.assist);
  const dispatch = useDispatch();

  const [wizardStep, setWizardStep] = useState("Welcome");

  const toggleAssistant = () => {
    dispatch({ type: "SHOW_BOOK_ASSIST_WIZARD", payload: !wizardOpen });
    setWizardStep("Welcome");
  };

  const handlePrevious = () => {
    const current = steps.indexOf(wizardStep);
    setWizardStep(steps[current - 1])
  };

  const handleNext = () => {
    const current = steps.indexOf(wizardStep);
    setWizardStep(steps[current + 1])
  };

  const handleSubmit = () => {
    toggleAssistant()
  };



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

  return (
    <Collapse
      isOpen={wizardOpen}
      className={"assistant-collapse pb-4"}
      timeout={{ appear: 2000,
        enter: 5000,
        exit: 500,}}
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
      <div className={"flex-fill d-flex align-items-center justify-content-center"}>
        <div className={"py-5"}>
          <Container>
            <Row>
              <Col sm={2} />
              <Col sm={8} className={"d-flex align-items-center justify-content-center"}>
                {steps.indexOf(wizardStep) === 0 && <Welcome/>}
                {steps.indexOf(wizardStep) === 1 && <Dates/>}
                {steps.indexOf(wizardStep) === 2 && <StayType/>}
                {steps.indexOf(wizardStep) === 3 && <Accommodation/>}
                {steps.indexOf(wizardStep) === 4 && <Location/>}
                {steps.indexOf(wizardStep) === 5 && <Personalise/>}
              </Col>
              <Col sm={2} />
            </Row>
          </Container>
        </div>
      </div>
      <div className={"d-flex justify-content-center py-4 wizardButtons"}>
        {steps.indexOf(wizardStep) === 0 && <React.Fragment>
          <Button color={"dark"} size={"lg"} outline className={"mx-4 min-w-7rem icon-button"}
                  onClick={toggleAssistant}>
            <Icon svg={CIRCLE_BACK}/>
            Cancel
          </Button>
          <Button color={"primary"} size={"lg"} className={"mx-4 min-w-7rem icon-button"} onClick={handleNext}
                 >
            Let's Begin
            <Icon svg={CIRCLE_CHECK}/>
          </Button>
        </React.Fragment>}

        {steps.indexOf(wizardStep) > 0 && <React.Fragment>
          <Button color={"dark"} outline className={"mx-4 min-w-7rem icon-button"}
                  onClick={toggleAssistant}>
            <Icon svg={CIRCLE_BACK}/>
            Cancel
          </Button>
          <Button color={"primary"} outline className={"mx-2 min-w-7rem icon-button"}
                  onClick={handlePrevious} disabled={!showPrevious}>
            <Icon svg={CIRCLE_CHEVRON_BACK}/>
            Previous
          </Button>
          <Button color={"primary"} outline className={"mx-2 min-w-7rem icon-button"}
                  onClick={handleNext} disabled={!showNext}>
            Next
            <Icon svg={CIRCLE_CHEVRON_FORWARD}/>
          </Button>
          <Button color={"primary"} className={"mx-4 min-w-7rem icon-button"} onClick={handleSubmit}
                  disabled={!showSubmit}>
            Submit
            <Icon svg={CIRCLE_CHECK}/>
          </Button>
        </React.Fragment>}

      </div>
    </Collapse>
  );
};

const Welcome = () => {
  return <div>
      <Container fluid className={"text-center position-relative"}>

        <h1 className="font-weight-medium mb-2 display-4">
          <Emoji symbol="🧙🏾‍♂️️" label="wizard"/> Greetings,
        </h1>
        <h2>I'm the Booking Wizard</h2>
        <h5 className={"mb-4 px-5 mx-5 mt-3"}>
          Please answer some simple questions, and I will work my magic to find the best match for you
        </h5>
        <div>

        </div>
      </Container>
  </div>
}

const Dates = () => {
  return <div>
    <Container fluid className={"text-center position-relative"}>

      <h1 className="font-weight-medium mb-2 display-4">
        <Emoji symbol="🧙🏾‍♂️️" label="wizard"/> Greetings,
      </h1>
      <h2>I'm the Booking Wizard</h2>
      <h5 className={"mb-4 px-5 mx-5 mt-3"}>
        Please answer some simple questions below, and I will work my magic to find the best match for you
      </h5>
      <div>

      </div>
    </Container>
  </div>
}

const StayType = () => {
  return <div>StayType</div>
}

const Accommodation = () => {
  return <div>Accommodation</div>
}

const Location = () => {
  return <div>Location</div>
}

const Personalise = () => {
  return <div>Personalise</div>
}

export default AssistantWizard;
