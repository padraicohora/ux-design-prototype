import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Container, Jumbotron} from "reactstrap";

import Flickity from "react-flickity-component";

import room1 from "../../../assets/hotels/bedroom-349698_640.jpg"
import {useHistory} from "react-router-dom";
import {TOGGLE_SEARCH_BAR} from "../constants";
import {RESULTS} from "../../search/constants";
import {ASSIST_WIZARD} from "../../assist/constants";

const AccommodationCard = ({image}) => {
    return  <Card style={{minWidth:"350px", width: "25%"}} className={"px-4 "}>
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
}

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
      <ExploreSlider theme={"Relaxing and Pampering"} onViewMore={openResults} />
      <ExploreSlider theme={"Relaxing and Pampering"} onViewMore={openResults} />
      <ExploreSlider theme={"Relaxing and Pampering"} onViewMore={openResults} />
    </div>
  );
};

const ExploreSlider = ({ theme, items, onViewMore }) => {
   const [headingLeft, setHeadingLeft] = useState(0);
    const heading =  useRef({})
    let flkty = {}

    useEffect(()=>{
        if(heading && heading.current){
            setHeadingLeft(heading.current.offsetLeft - 22)
        }
    }, [])

  return (
    <>
      <Container className={"d-flex align-items-center my-3"}>
        <h3 className={"flex-fill font-weight-medium mb-0"} ref={heading}>{theme}</h3>
        <Button color={"light"} outline={true} onClick={onViewMore} className={"text-primary"}>
          Want to see more?
        </Button>
      </Container>
      <Container fluid className={"px-0 overflow-x-hidden"}>

          <Flickity className={'carousel overflow-hidden h-100'} // default ''
                    style={{height:"calc(100% + 40px)"}}
                    elementType={'div'} // default 'div'
                    options={{
                        initialIndex: 0,
                        cellAlign: 'left',
                        contain: true,
                        freeScroll: true,
                        percentPosition: false
                    }} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    flickityRef={c => flkty = c}
                    static >
                <div style={{width:headingLeft, height:"100%"}} className={"invisible"}/>
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



export default Home;
