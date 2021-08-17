import React, {useEffect} from "react";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {HOME, TOGGLE_SEARCH_BAR} from "../../home/constants";
import {Button, Col, Container, DropdownToggle, Row, UncontrolledButtonDropdown} from "reactstrap";
import {dateFormat} from "../../search/components/Results";
import {guestString} from "../../_common_/components/Navigation";
import AssistantCard from "./AssistantCard";
import {Redirect, useHistory} from "react-router-dom";
import Emoji from "../../_common_/components/Emoji";
import {ensureNonNull} from "../../_common_/Utils";

const Assistant = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { wizardOpen, assistDate, results,
        assistSeason,
        assistHolidayType,
        assistAccommodation,
        assistLocation,
        assistPersonalisation } = useSelector((state) => state.assist);

    useEffect(() => {
        dispatch({ type: "HIDE_SEARCH_BAR" });
        let timer1 = setTimeout(() => dispatch({ type: "UNSET_LOADING"}),  1400);
        return () => clearTimeout(timer1);
    }, [wizardOpen ]);

    const startAssistant = () => {
        dispatch({ type: "SHOW_BOOK_ASSIST_WIZARD", payload:true })
    };

    const List = () => {
        let items;
        if(!_.isEmpty(results)){
                items = results.map((result)=>{
                    return <Col sm={"12"}><AssistantCard {...result} key={result.id} assistant/></Col>  })
        }else{
            return <Redirect to={HOME} />
        }

        return items
    }

    function renderDates(){
        if(assistDate && assistDate.startDate && assistDate.endDate){
            return <>{`from ${assistDate.startDate.format(dateFormat)} to ${assistDate.endDate.format(dateFormat)}`}</>}
        if(assistSeason){
            return `${_.lowerFirst(assistSeason)}`

        }
        return null
    }

    return <div>
        <div className={"bg-light search-heading"}>
            <Container className={"position-relative"}>
                <div className={"d-flex align-items-center justify-content-between"}>
                    <div className={"my-3 py-3 flex-fill d-flex"}>
                        <Emoji symbol="🧙🏾‍♂️️" label="wizard" className={"display-4  mb-0 px-4"}/>
                        <div className={"speech-bubble"}>
                            <p>Here are the best {ensureNonNull(assistAccommodation).label} in an {ensureNonNull(assistLocation).label} setting for your {ensureNonNull(assistHolidayType).label} {renderDates()}. I made sure to include accommodations that {ensureNonNull(assistPersonalisation).description}</p>
                            <p className={"mb-0"}>Want to start again? <a href={"#"} onClick={(e) => {
                                e.preventDefault();
                                startAssistant();
                            }}>Restart the booking assistant</a></p>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
        <Container>
            <h2 className={"text-center my-5"}>Top Results</h2>
            <Row>
                <List />
            </Row>

        </Container>
        </div>
}

export default Assistant
