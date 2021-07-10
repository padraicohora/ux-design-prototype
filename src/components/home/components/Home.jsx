import React from "react";
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
import Slider from "react-slick";
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
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  return (
    <>
      <Container className={"d-flex align-items-center"}>
        <h2 className={"flex-fill"}>{theme}</h2>
        <Button color={"transparent"} onClick={onViewMore}>
          View More
        </Button>
      </Container>
      <Container fluid>
        <Slider {...settings}>
          <div>
              <AccommodationCard/>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
            <div>
                <h3>1</h3>
            </div>
            <div>
                <h3>2</h3>
            </div>
            <div>
                <h3>3</h3>
            </div>
            <div>
                <h3>4</h3>
            </div>
            <div>
                <h3>5</h3>
            </div>
            <div>
                <h3>6</h3>
            </div>
        </Slider>
      </Container>
    </>
  );
};

const AccommodationCard = () => {
   return  <div>
        <Card>
            <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
            <CardBody>
                <CardTitle tag="h5" className={"card-title"}>Card title</CardTitle>
                <span className={"card-rating"}>9.1</span>
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
