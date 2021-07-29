import propTypes from "prop-types";
import React, {useState} from "react";
import {
    Badge,
    Button,
    Container, CustomInput,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    UncontrolledButtonDropdown
} from "reactstrap";
import Icon from "../../_common_/components/Icon";
import {
    ACCOMMODATION_TYPE,
    ARROW_DOWN_ICON, ARROW_UP_ICON,
    PLACE
} from "../../_common_/constants/icons";
import {useSelector} from "react-redux";
import {guestString} from "../../_common_/components/Navigation";
export const dateFormat = "MMMM Do YYYY"
const Results = (props) => {
    const { location,
        startDate,
        endDate,
        adults,
        children,
        rooms,
        type } = useSelector((state) => state.search);

    const [sortBy, setSortBy ] = useState({
        label:"Price",
        filter:"price",
    });
    const [freeCancellationOnly, setFreeCancellationOnly ] = useState(false);
    const [direction, setDirection ] = useState("Descending");
    const SortByMenu = () => {
        const options = [
            {
                label:"Price",
                filter:"price",
            },
            {
                label: "Rating",
                filter:"rating",
            },
            {
                label:"Reviews",
                filter:"reviews",
            },
        ]
        return options.map(option => (
            <DropdownItem
                disabled={sortBy === option.filter}
                onClick={()=>setSortBy(option)}>
                {option.label}
            </DropdownItem>
        ))
    }

    return <div>
        <div className={"bg-light search-heading"}>
            <Container className={"position-relative"}>
                <div className={"d-flex flex-column"}>
                    <div className={"my-3"}>
                        Results for
                        <strong className={"pl-1"}>{location}</strong> between <strong>{`${startDate.format(dateFormat)} - ${endDate.format(dateFormat)}`}</strong> for <strong>{guestString(adults, children, rooms)}</strong><small className={"pl-1"}>{`(${"125"} results)`}</small>
                    </div>
                    <div className={"pr-3 flex-fill mb-3"}>
                        <div className={"d-flex align-items-center"}>
                            <div className={"pr-2"}>
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle
                                        style={{width:140}}
                                        className={"d-flex justify-content-between align-items-center"}
                                        size={"sm"} color={"primary"}
                                        outline>
                                        {`Sort By: ${sortBy.label} `}
                                        <Icon svg={ARROW_DOWN_ICON}/>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <SortByMenu />
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className={"px-1"}>
                                <Button size={"sm"} color={"primary"}
                                        style={{width:108}}
                                        className={"d-flex justify-content-between align-items-center"}
                                        outline
                                        onClick={() => setDirection(direction === "Descending" ? "Ascending" : "Descending")}>
                                    {direction} <Icon svg={direction === "Descending" ? ARROW_DOWN_ICON : ARROW_UP_ICON}/>
                                </Button>
                            </div>
                            <div className={"px-1"}>
                                <CustomInput
                                    type="switch"
                                    id="exampleCustomSwitch"
                                    name="customSwitch"
                                    onChange={(e)=>setFreeCancellationOnly(e.target.checked)}
                                    checked={freeCancellationOnly}
                                    label="Free Cancellation Only" />
                            </div>
                        </div>
                    </div>
                </div>


            </Container>
        </div>
    </div>
}

export default Results
