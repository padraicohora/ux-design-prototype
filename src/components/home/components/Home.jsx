import React, {useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Container,
    Jumbotron,
    Row
} from "reactstrap";

import Flickity from "react-flickity-component";

import room1 from "../../../assets/hotels/bedroom-349698_640.jpg"
import room2 from "../../../assets/hotels/bed-4416515_640.jpg"
import room3 from "../../../assets/hotels/bedroom-490779_640.jpg"
import room4 from "../../../assets/hotels/hotel-389256_640.jpg"
import room5 from "../../../assets/hotels/hotel-1330841_640.jpg"
import room6 from "../../../assets/hotels/hotel-1330846_640.jpg"
import room7 from "../../../assets/hotels/hotel-room-1447201_640.jpg"
import room8 from "../../../assets/hotels/interior-1026452_640.jpg"
import room9 from "../../../assets/hotels/lake-192990_640.jpg"
import room10 from "../../../assets/hotels/pool-2128578_640.jpg"
import room11 from "../../../assets/hotels/terrace-1030758_640.jpg"
import room12 from "../../../assets/hotels/water-165219_640.jpg"
import room13 from "../../../assets/hotels/window-3178666_640.jpg"
import { useHistory } from "react-router-dom";
import {HOME, TOGGLE_SEARCH_BAR} from "../constants";
import {RESULTS} from "../../search/constants";
import {ASSIST_WIZARD} from "../../assist/constants";


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
                        <span className="arrow primera next "/>
                        <span className="arrow segunda next "/>
                    </div>
                </div>
            </div>

        </div>
      <ExploreSlider theme={"Relaxing"} onViewMore={openResults} />
      <ExploreSlider theme={"Relaxing"} onViewMore={openResults} />
      <ExploreSlider theme={"Relaxing"} onViewMore={openResults} />
    </div>
  );
};

const ExploreSlider = ({ theme, items, onViewMore }) => {
  return (
    <>
      <Container className={"d-flex align-items-center"}>
        <h2 className={"flex-fill"}>{theme}</h2>
        <Button color={"transparent"} onClick={onViewMore}>
          View More
        </Button>
      </Container>
      <Container fluid>

          <Flickity className={'carousel'} // default ''
                    elementType={'div'} // default 'div'
                    options={{initialIndex: 2}} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static >

              <AccommodationCard/>
              <AccommodationCard/>
              <AccommodationCard/>
              <AccommodationCard/>
              <AccommodationCard/>
              <AccommodationCard/>

          </Flickity>
      </Container>

    </>
  );
};

const AccommodationCard = ({image}) => {
   return  <div>
        <Card>
            <CardImg top width="100%" src={room1} alt="Card image cap" />
            <CardBody>
                <div className={"card-heading"}><CardTitle tag="h5" className={"card-title"}>Hotel Buena Vista</CardTitle>
                    <span className={"card-rating"}>9.1</span></div>
                <div className={"card-info"}>
                    <CardSubtitle tag="h6" className="mb-2 text-muted card-subtitle">Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's
                        content.
                    </CardText>
                </div>
                <div className={"card-price"}>€111</div>
            </CardBody>
        </Card>
    </div>
}

export default Home;
