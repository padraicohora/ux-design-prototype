import React, {useEffect} from "react";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {HOME, TOGGLE_SEARCH_BAR} from "../../home/constants";
import {Button, Col, Container, DropdownToggle, UncontrolledButtonDropdown} from "reactstrap";
import {dateFormat} from "../../search/components/Results";
import {guestString} from "../../_common_/components/Navigation";
import AssistantCard from "./AssistantCard";
import {Redirect, useHistory} from "react-router-dom";

const Assistant = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch({ type: "HIDE_SEARCH_BAR" });
        let timer1 = setTimeout(() => dispatch({ type: "UNSET_LOADING"}),  1400);
        return () => clearTimeout(timer1);
    }, [ ]);
    const { wizardOpen, assistDate, results,
        assistSeason,
        assistHolidayType,
        assistAccommodation,
        assistLocation,
        assistPersonalisation } = useSelector((state) => state.assist);

    const renderHolidayType = () => assistHolidayType
        ? assistHolidayType.map(type => <span>{type.label}</span>) : null;
    const renderAccommodation = () => assistAccommodation ? assistAccommodation.map(type => type.label) : null;
    const renderLocation = () => assistLocation ? assistLocation.map(type => type.label) : null;

    const startAssistant = () => {
        // history.push(ASSISTANT);
        dispatch({ type: "SHOW_BOOK_ASSIST_WIZARD", payload:true })
        // if (searchOpen) dispatch({ type: TOGGLE_SEARCH_BAR });
    };

    const List = () => {
        let items;
        if(!_.isEmpty(results)){
                items = results.map((result)=>{
                    return <Col sm={"12"}><AssistantCard {...result} key={result.id} compact/></Col>  })
        }else{
            // items = "No accommodation found"
            // history.push(HOME);
            return <Redirect to={HOME} />
        }

        return items
    }

    return <div>
        <div className={"bg-light search-heading"}>
            <Container className={"position-relative"}>
                <div className={"d-flex align-items-center justify-content-between"}>
                    <div className={"my-3 flex-fill"}>
                        Results for&nbsp;
                        <strong className={"pl-1"}>{renderHolidayType()}</strong>
                        <strong className={"pl-1"}>{renderAccommodation()}</strong>
                        <strong className={"pl-1"}>{renderLocation()}</strong>
                        {assistDate && assistDate.startDate && assistDate.endDate && <>&nbsp;between&nbsp;
                            <strong>{`${assistDate.startDate.format(dateFormat)} - ${assistDate.endDate.format(dateFormat)}`}</strong></>}
                        {assistSeason && <>
                            <strong>{assistSeason}</strong></>}
                    </div>
                    <Button onClick={startAssistant}>Reset</Button>
                </div>
            </Container>
        </div>
        <div>
            <h1 className={"text-center"}>Top Results</h1>
            {/*<AssistantCard />*/}
            <List />
        </div>
        </div>
}

export default Assistant
