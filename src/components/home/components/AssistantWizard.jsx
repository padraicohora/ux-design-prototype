import propTypes from "prop-types";
import React, {useState} from "react";
import {Col, Collapse, Container, Row} from "reactstrap";
import {useSelector} from "react-redux";
import classnames from "classnames";

const AssistantWizard = (props) => {
  const { wizardOpen } = useSelector((state) => state.assist);

  const [wizardStep, setWizardStep] = useState("Dates");

  const steps = ["Dates", "Stay Type", "Accommodation", "Location", "Personalise"]
  const WizardSteps = () => steps.map((step, index) => {
    const active = steps.indexOf(wizardStep) === index
    const success = steps.indexOf(step) < steps.indexOf(wizardStep)

    const stepClass = classnames("step", {
      "step-active":active,
      "step-success":success
    })
    return <li className={stepClass} onClick={()=>setWizardStep(step)}>
      <div className="step-content">
        <span className="step-circle">{index + 1}</span>
        <span className="step-text">{step}</span>
      </div>
    </li>;
  })


    return <Collapse isOpen={wizardOpen} className={"assistant-collapse"} timeout={1000}>
      <div className={"bg-light py-3"}><Container>
        <Row>
          <Col sm={2}/>
          <Col sm={8}>
            <ul className="steps">
              <WizardSteps/>
            </ul>
          </Col>
          <Col sm={2}/>
        </Row>
      </Container></div>
    </Collapse>
};


export default AssistantWizard;
