import propTypes from "prop-types";
import React, {useState} from "react";
import classnames from "classnames";
import {Button, Col, Container, Row} from "reactstrap";
import classicDouble from "../../../assets/rooms/classic-double.jpg";
import familyRoom from "../../../assets/rooms/family-room.jpg";
import superiorRoom from "../../../assets/rooms/superior-double.jpg";
import twinRoom from "../../../assets/rooms/twin-room.jpg";
import Icon from "../../_common_/components/Icon";
import {BED, USERS} from "../../_common_/constants/icons";

const Booking = (props) => {
    const [wizardStep, setWizardStep] = useState("Room Selection");

    const steps = [
        "Date Selection",
        "Room Selection",
        "Add-ons",
        "Payment"
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

    const Rooms = () => {
        const dealData = [
            {
                title:"Economy Double Room",
                bed: "Large Double bed",
                person: 2,
                image: classicDouble,
            },
            {
                title:"Classic Double/Twin Room",
                bed: "Double bed, Twin bed",
                person: 2,
                image: twinRoom
            },
            {
                title:"Superior Double Room",
                bed: "Queen bed",
                person: 2,
                image: superiorRoom
            },
            {
                title:"Family Room",
                bed: "Double bed, Single bed",
                person: 5,
                image: familyRoom
            },
        ]

        const deals =  dealData.map(deal => (
            <Row className={"room-deal my-4"} key={deal.title} onClick={() => console.log(`Select room`, deal)}>
                <Col sm="3" className={"px-0 overflow-hidden"}>
                    <img src={deal.image} className={"w-100"}/>
                </Col>
                <Col sm="9" className={"pl-4"}>
                    <h5 className={"font-weight-bold"}>{deal.title}</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci alias aliquid, aut deserunt, dicta dolorum esse id</p>
                    <div className={"text-muted"}>
                        <Icon svg={BED} className={"mr-1"}/><span className={"mr-2"}>{deal.bed}</span>
                        <Icon svg={USERS} className={"mr-1"}/><span className={"mr-2"}>{deal.person} guests</span>
                    </div>
                </Col>
            </Row>
            
            ));

        return <section id={"deals"}>
                {deals}
        </section>

    }

    const DateSelection = () => <div>DateSelection</div>

    const RoomSelection = () => <Row>
        <Col sm={12}><h2 className={"text-center"}>Choose a Room Type</h2></Col>
        <Col sm={1}/>
        <Col sm={3}>
            <div className={"bg-light p-5 text-center rounded shadow mt-4"}>
                <div className={"d-flex text-primary mb-2"}>
                    <div className={"bg-white flex-fill mx-3 py-3 "}>
                        <h2 className={"mb-1"}>6</h2>
                        <h6 className={"mb-0"}>Jul</h6>
                    </div>
                    <div className={"bg-white flex-fill mx-3 py-3"}>
                        <h2 className={"mb-1"}>6</h2>
                        <h6 className={"mb-0"}>Jul</h6>
                    </div>
                </div>
                <h4 className={"py-3 mb-0"}>8 nights</h4>
                <h6 className={"pb-3"}>1 room, 2 guests</h6>
                <Button color={"primary"} outline>New Search</Button>
            </div>
        </Col>
        <Col sm={7} className={"pl-5"}>
            <Rooms/>
        </Col>

    </Row>

    const AddOns = () => <div>AddOns</div>

    const Payment = () => <div>Payment</div>


    return <div>
        <div className={"bg-light py-3"}>
            <Container>
                <Row>
                    <Col sm={2} />
                    <Col sm={8}>
                        <ul className="steps">
                            <WizardSteps/>
                        </ul>
                    </Col>
                </Row>

            </Container>
        </div>
        <Container className={"py-5"}>
            {steps.indexOf(wizardStep) === 0 && (
                <DateSelection wizardStep={wizardStep}
                />
            )}
            {steps.indexOf(wizardStep) === 1 && (
                <RoomSelection wizardStep={wizardStep}
                />
            )}
            {steps.indexOf(wizardStep) === 2 && (
                <AddOns wizardStep={wizardStep} />
            )}
            {steps.indexOf(wizardStep) === 3 && (
                <Payment wizardStep={wizardStep}
                    // options={stayTypeOptions}
                    // selection={selectedStay}
                    // onClick={onSetSelectedStay}
                />
            )}
        </Container>
    </div>
}

export default Booking
