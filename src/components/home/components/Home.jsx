import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Jumbotron} from "reactstrap";
import {useHistory} from "react-router-dom";
import {TOGGLE_SEARCH_BAR} from "../constants";
import {RESULTS} from "../../search/constants";
import {ASSIST_WIZARD} from "../../assist/constants";
import  ExploreSlider from "./ExploreSlider";
import {adventureHotels, romanceHotels} from "../../../data/home";
import relaxingHotels from "../../../data/json/relaxing";



const Home = () => {

  const dispatch = useDispatch();

  const history = useHistory();
    const {searchOpen} = useSelector(state => state.home)

  const openResults = () => {
    history.push(RESULTS);
    dispatch({type:TOGGLE_SEARCH_BAR})
  };

  const startAssistant = () => {
      history.push(ASSIST_WIZARD)
    if(searchOpen) dispatch({type:TOGGLE_SEARCH_BAR})
  };

  const scrollDown = () =>{
      if(searchOpen) dispatch({type:TOGGLE_SEARCH_BAR})
      window.scrollTo({
          top: ((window.innerHeight / 100) * 70) + 160,
          behavior:"smooth"
      })
  }



  return (
    <div>
      <Jumbotron fluid id={"home-splash"} className={"d-flex align-items-center"}>
        <Container fluid className={"text-center position-relative text-white"}>
          <h1 className="display-4  font-weight-medium mb-2 text-white">Welcome to Book Assist</h1>
          <h4 className={"text-white mb-4"}>The world's best assisted booking platform</h4>
          <div>
            <Button color="primary" size="lg" onClick={startAssistant}>Start Your Perfect Booking</Button>
          </div>
        </Container>
      </Jumbotron>
        <div className="d-flex align-items-center justify-content-center arrow-container ">
            <div className={"d-inline-flex flex-column align-items-center cursor-pointer"}
                 onClick={scrollDown}>
                <span className={"h5 text-secondary font-weight-bold mb-0"}>Explore</span>
                <div className="round">
                    <div id="cta">
                        <span className="arrow primera down-arrow "/>
                        <span className="arrow segunda down-arrow "/>
                    </div>
                </div>
            </div>

        </div>
      <ExploreSlider theme={"Relaxing and Pampering"} onViewMore={openResults} items={relaxingHotels} />
      <ExploreSlider theme={"Adventure and Fun"} onViewMore={openResults} items={adventureHotels} />
      <ExploreSlider theme={"Romance and Beauty"} onViewMore={openResults} items={romanceHotels} />
    </div>
  );
};



export default Home;
