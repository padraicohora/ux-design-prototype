import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, Container, Jumbotron} from "reactstrap";

const Home = () => {
  const dispatch = useDispatch();

  return (
      <div>
        <Jumbotron fluid id={"home-splash"}>
          <Container fluid className={"text-center"}>
            <h1 className="display-3">Welcome To Book assist</h1>
            <p className="lead">The number one booking platform</p>
            <p className="lead">
              <Button color="primary">Find MY Perfect Booking</Button>
            </p>
          </Container>
        </Jumbotron>
      <Container>
      </Container>
      </div>
  );
};

export default Home;
