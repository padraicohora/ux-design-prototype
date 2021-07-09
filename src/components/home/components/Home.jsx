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
import { RESULTS } from "../../search/constants";
import {ASSIST_WIZARD} from "../../assist/constants";

const Home = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const openResults = () => {
    history.push(RESULTS);
  };

  return (
    <div>
      <Jumbotron fluid id={"home-splash"} >
        <Container fluid className={"text-center position-relative"}>
          <h1 className="display-3">Welcome To Book assist</h1>
          <p className="lead">The number one booking platform</p>
          <p className="lead">
            <Button color="primary" onClick={()=>history.push(ASSIST_WIZARD)}>Find MY Perfect Booking</Button>
          </p>
        </Container>
      </Jumbotron>
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
