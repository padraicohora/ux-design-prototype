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

    const { panelOpen } = useSelector((state) => state.detail);

    const togglePanel = (accommodation) => {
        dispatch({ type: "SHOW_DETAIL_PANEL", payload: accommodation });
    };

    useEffect(() => {
        dispatch({ type: "HIDE_SEARCH_BAR" });
        let timer1 = setTimeout(() => dispatch({ type: "UNSET_LOADING"}),  1400);
        return () => clearTimeout(timer1);
    }, [wizardOpen ]);

    const startAssistant = () => {
        dispatch({ type: "RESTART_BOOK_ASSIST_WIZARD", payload:true })
    };

    const List = () => {
        let items;
        if(!_.isEmpty(results)){
                items = results.map((result, index)=>{
                    return <Col sm={"12"}><AssistantCard {...result} item={result} key={result.id}
                                                         startDate={assistDate.startDate}
                                                         endDate={assistDate.endDate}
                                                         assistant number={index} onOpen={() => togglePanel(result)}/></Col>  })
        }else{
            return <Redirect to={HOME} />
        }

        return items
    }

    function renderDates(){
        if(assistDate && assistDate.startDate && assistDate.endDate) {
            return <>from <strong>{assistDate.startDate.format(dateFormat)}</strong> to <strong>{assistDate.endDate.format(dateFormat)}</strong></>
        }
        if(assistSeason){
            return <strong>
            {_.lowerFirst(assistSeason)}
            </strong>

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
                            <p>Here are the best <strong>{ensureNonNull(assistAccommodation).label}</strong> in an <strong>{ensureNonNull(assistLocation).label}</strong> setting for your <strong>{ensureNonNull(assistHolidayType).label}</strong> {renderDates()}. I made sure to include accommodations that <strong>{ensureNonNull(assistPersonalisation).description}</strong></p>
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
