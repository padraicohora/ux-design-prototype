import propTypes from "prop-types";
import React from "react";
import {
    Badge, Button, Container, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
import Icon from "../../_common_/components/Icon";
import {ACCOMMODATION_TYPE, PLACE} from "../../_common_/constants/icons";
import {useSelector} from "react-redux";
import {guestString} from "../../_common_/components/Navigation";

const Results = (props) => {
    const { location,
        startDate,
        endDate,
        adults,
        children,
        rooms,
        type } = useSelector((state) => state.search);
    return <div>
        <div className={"bg-light search-heading"}>
            <Container className={"position-relative"}>
                <div className={"d-inline-flex align-items-center"}>
                    <div className={"px-2 mr-2"}>Showing</div>
                    <div className={"px-2 mr-2"}>
                        <Badge color={"filter"}>{location}</Badge>
                    </div>
                    <div className={"px-2 mr-2"}>
                        <Badge color={"filter"}>date - date</Badge>
                    </div>
                    <div className={"px-2 mr-2"}>
                        <Badge color={"filter"}>{guestString(adults, children, rooms)}</Badge>
                    </div>
                    <div className={"px-2 mr-2"}>total results size</div>

                </div>
            </Container>
        </div>
    </div>
}

export default Results
