import propTypes from "prop-types";
import React from "react";
import {FACEBOOK, INSTAGRAM, MESSAGES_ICON, PHONE, PIN_DROP, TWITTER} from "../constants/icons";
import Icon from "./Icon";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";

const Footer = (props) => {
    return <>
  <section className="deneb_cta mt-5">
    <div className="container">
      <div className="cta_wrapper">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="cta_content">
              <h3>Save time, save money!</h3>
              <p>Sign up and we'll send the best deals to you</p>
            </div>
          </div>
          <div className="col-lg-5">
            <InputGroup>
              <Input placeholder={"Enter email"}/>
              <InputGroupAddon addonType="append">
              <Button color={"light"}>Sign Up</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer className="deneb_footer">
    <div className="widget_wrapper"
         style={{ "background-image": "url(http://demo.tortoizthemes.com/deneb-html/deneb-ltr/assets/images/footer_bg.png)" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12">
            <div className="widget widegt_about">
              {/*<div className="widget_title" style={{marginBottom:30}}/>*/}
              <p className={"mt-5"}>Quisque orci nisl, viverra et sem ac, tincidunt egestas massa. Morbi est arcu,
                hendrerit ac vehicula condimentum, euismod nec tortor praesent consequat urna.</p>
              <ul className="social">
                <li><a href="#"><Icon svg={FACEBOOK}/></a></li>
                <li><a href="#"><Icon svg={TWITTER}/></a></li>
                <li><a href="#"><Icon svg={INSTAGRAM}/></a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2"/>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="widget widget_link">
              <div className="widget_title">
                <h4>Links</h4>
              </div>
              <ul className={"list-group list-group-flush"}>
                <li className={"list-group-item bg-transparent mb-0 border-bottom-0 pl-0 pt-0"}><a href="#">About</a></li>
                <li className={"list-group-item bg-transparent mb-0 border-bottom-0 pl-0"}><a href="#">Customer Service</a></li>
                <li className={"list-group-item bg-transparent mb-0 border-bottom-0 pl-0"}><a href="#">Careers</a></li>
                <li className={"list-group-item bg-transparent mb-0 border-bottom-0 pl-0"}><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="widget widget_contact">
              <div className="widget_title">
                <h4>Contact Us</h4>
              </div>
              <div className="contact_info">
                <div className="single_info">
                  <div className="icon">
                    <Icon svg={PHONE}/>
                  </div>
                  <div className="info">
                    <p><a href="#">1800-121-3637</a></p>
                  </div>
                </div>
                <div className="single_info">
                  <div className="icon">
                    <Icon svg={MESSAGES_ICON}/>
                  </div>
                  <div className="info">
                    <p><a href="#">hellow@bookp-assist.com</a></p>

                  </div>
                </div>
                <div className="single_info">
                  <div className="icon">
                    <Icon svg={PIN_DROP}/>
                  </div>
                  <div className="info">
                    <p>Foxes Bow, Limerick, <span>Ireland.</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="copyright_area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="copyright_text">
              <p>Copyright &copy; 2020 All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
    </>
};


export default Footer;
