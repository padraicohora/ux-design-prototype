import propTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {
    Badge,
    Button,
    Col,
    Container,
    CustomInput,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Row,
    UncontrolledButtonDropdown
} from "reactstrap";
import Icon from "../../_common_/components/Icon";
import {
    ACCOMMODATION_TYPE,
    ARROW_DOWN_ICON, ARROW_UP_ICON,
    PLACE
} from "../../_common_/constants/icons";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {guestString} from "../../_common_/components/Navigation";
import AccommodationCard from "../../home/components/AccommodationCard";
export const dateFormat = "MMMM Do YYYY"
export const directions = [
    {
        label: "Highest First",
        filter: "desc",
    },
    {
        label: "Lowest First",
        filter: "asc",
    }
]
const Results = (props) => {
    const dispatch = useDispatch();
    const { location,
        results,
        startDate,
        sortBy,
        endDate,
        adults,
        children,
        rooms,
        direction,
        type } = useSelector((state) => state.search);
    const { loading } = useSelector((state) => state.home);

    useEffect(() => {

        let timer1 = setTimeout(() => dispatch({ type: "UNSET_LOADING"}),  1400);
        return () => clearTimeout(timer1);
    }, [loading]);

    const setSortBy = (option) => dispatch({
        type:"SET_SEARCH_SORT",
        payload: option
    })

    const setDirection = (option) => dispatch({
        type:"SET_SEARCH_DIRECTION",
        payload: directions[directions.findIndex(d => d.filter !== direction.filter)]
    })
    //
    // const setFreeCancellationOnly = (option) => dispatch({
    //     type:"SET_FREE_CANCELLATION",
    //     payload: !freeCancellationOnly
    // })

    const [freeCancellationOnly, setFreeCancellationOnly ] = useState(false);


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
                key={option.filter}
                disabled={sortBy === option.filter}
                onClick={()=>setSortBy(option)}>
                {option.label}
            </DropdownItem>
        ))
    }

    const List = () => {
        let items;
        if(!_.isEmpty(results)){
            if(freeCancellationOnly){
                items = results.filter(item => item.freeCancellation !== true)
                items = items.map((result)=>{
                    return <Col sm={"3"}><AccommodationCard {...result} key={result.id}/></Col>
                })
            }else{
                items = results.map((result)=>{
                    return <Col sm={"3"}><AccommodationCard {...result} key={result.id}/></Col>  })
            }
        }else{
            items = "No accommodation found"
        }

        return items
    }



    return <div>
        <div className={"bg-light search-heading"}>
            <Container className={"position-relative"}>
                <div className={"d-flex flex-column"}>
                    <div className={"my-3"}>
                        Results for&nbsp;
                        <strong className={"pl-1"}>{location}</strong>
                        &nbsp;between&nbsp;
                        <strong>{`${startDate.format(dateFormat)} - ${endDate.format(dateFormat)}`}</strong>
                        &nbsp;for&nbsp;
                        <strong>{guestString(adults, children, rooms)}</strong>
                        <small className={"pl-1"}>{`(${results ? results.length : 0} results)`}</small>
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
                                        style={{width:120}}
                                        className={"d-flex justify-content-between align-items-center"}
                                        outline
                                        onClick={()=>setDirection()}>
                                    {direction.label} <Icon svg={direction.filter === "desc" ? ARROW_DOWN_ICON : ARROW_UP_ICON}/>
                                </Button>
                            </div>
                            <div className={"px-1"}>
                                <CustomInput
                                    type="switch"
                                    id="exampleCustomSwitch"
                                    name="customSwitch"
                                    onChange={(e)=>setFreeCancellationOnly(e.target.checked)}
                                    // onChange={setFreeCancellationOnly}
                                    checked={freeCancellationOnly}
                                    label="Free Cancellation Only" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        <div>
            <Container className={"position-relative"}>
                <Row>
                    <List/>
                </Row>

            </Container>
        </div>
    </div>
}

export default Results
