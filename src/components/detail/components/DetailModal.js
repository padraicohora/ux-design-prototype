import React, {useEffect, useState} from "react";
import Scrollspy from "react-scrollspy";
import {NavHashLink} from "react-router-hash-link";
import {useHistory, useLocation} from "react-router-dom";
import {DateRangePicker} from "react-dates";
import _ from "lodash";
import {
    Alert,
    Badge,
    Button,
    ButtonGroup,
    CardText,
    Col,
    Container,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    List,
    Row,
    UncontrolledCollapse,
    UncontrolledTooltip,
} from "reactstrap";
import {Drawer,} from "react-rainbow-components";
import Lightbox from "react-image-lightbox";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {ensureNonNull} from "../../_common_/Utils";
import {
    AC_UNIT,
    ADD_CIRCLE_SOLID,
    BED,
    BOOKMARK,
    BOOKMARK_BORDER,
    CALENDAR,
    EDIT_ICON,
    FITNESS_CENTER,
    IMAGE,
    INFO,
    LIQUOR,
    LOCAL_OFFER,
    LOCAL_PARKING,
    LOCATION_ICON,
    NIGHT_SHELTER,
    PIN_DROP,
    REMOVE_CIRCLE_SOLID,
    RESTAURANT_MENU,
    REVIEWS,
    ROOM_SERVICE,
    SPA,
    STAR_RATE,
    SUPPORT_AGENT,
    THUMB_DOWN,
    THUMB_UP,
    USERS,
    WIFI,
} from "../../_common_/constants/icons";
import Icon from "../../_common_/components/Icon";
import {calculateRating} from "../../home/components/AccommodationCard";
import {getRandomInt} from "../../home/reducers";
import map from "../../../assets/map.jpg";
import classnames from "classnames";
import {toast} from "react-toastify";
import {reviewData} from "../../../data/json/reviews";
import {BOOKING} from "../../booking/constants";
import {dateFormat} from "../../search/components/Results";

const extra = [ "Excellent Staff", "Cosy " ];

const PhotoSection = ({ images, outsideIndex }) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ photoIndex, setPhotoIndex ] = useState(0);
    useEffect(() => {
        if (outsideIndex) {
            setIsOpen(!isOpen);
            setPhotoIndex(outsideIndex);
        }
    }, [ outsideIndex ]);
    useEffect(() => {
        if (!isOpen) {
            setPhotoIndex(0);
        }
    }, [ isOpen ]);
    const Thumbnails = () => images.map((image, index) => {
        return (<div
            key={index}
            className={"thumbnail lightbox-image"}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => {
                setIsOpen(!isOpen);
                setPhotoIndex(index);
            }}
        />);
    });
    return (<section id={"photos"}>
        <h4 className={"text-secondary pt-2"}>Photos</h4>
        <div style={{ margin: "0 -10px" }}>
            <Thumbnails/>
        </div>
        {isOpen && (<Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) %
                images.length)}
            onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />)}
    </section>);
};

const DetailModal = () => {
    const [ bookmarkActive, setBookmarkActive ] = useState();
    const [ mainImage, setMainImage ] = useState();
    const [ extraIndex, setExtraIndex ] = useState(getRandomInt(0, extra.length - 1));
    const [ photoIndex, setPhotoIndex ] = useState(0);

    const [ localStartDate, setStartDate ] = useState();
    const [ localEndDate, setEndDate ] = useState();
    const [ datesFocused, setDatesFocused ] = useState();
    const setSearchDates = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
        dispatch({
            type: "SET_DETAIL_TIME", payload: { startDate, endDate }
        });
    };

    const { panelOpen, accommodation, images, deals } = useSelector((state) => state.detail, shallowEqual);

    const {
        image,
        title,
        location,
        rating,
        subText,
        price,
        type,
        reviews,
        compact,
        locationBased,
        group,
        city,
        country,
        startDate,
        endDate
    } = ensureNonNull(accommodation);
    const dispatch = useDispatch();
    const browserLocation = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (panelOpen) {
            const initLocation = {
                ...browserLocation, hash: "#overview",
            };
            history.push(initLocation);
            setMainImage(image);
        }
    }, [ panelOpen ]);

    useEffect(() => {
        if (bookmarkActive) {
            toast(<Alert color="secondary">
                <h5>Bookmarked</h5>
                {title} has been added to you bookmark list found in your account
                page.
            </Alert>);
        }
    }, [ bookmarkActive ]);

    const closePanel = () => {
        dispatch({ type: "SHOW_DETAIL_PANEL", payload: null });
        const resetLocation = {
            ...browserLocation, hash: "",
        };
        history.push(resetLocation);
        setExtraIndex(getRandomInt(0, extra.length - 1));
    };

    const showMap = () => {
        const resetLocation = {
            ...browserLocation, hash: "#info",
        };
        history.push(resetLocation);
    };

    const navItems = [ {
        label: "Overview", id: "overview", icon: NIGHT_SHELTER,
    }, {
        label: "Photos", id: "photos", icon: IMAGE,
    }, {
        label: "Location", id: "location", icon: PIN_DROP,
    }, {
        label: "Info", id: "info", icon: INFO,
    }, {
        label: "Reviews", id: "reviews", icon: REVIEWS,
    }, {
        label: "Deals", id: "deals", icon: LOCAL_OFFER,
    } ];

    const openBooking = (item) => {
        dispatch({ type: "OPEN_ACCOMMODATION", payload: item });
        const resetLocation = {
            ...browserLocation, hash: "",
        };
        history.push(resetLocation);
        setExtraIndex(getRandomInt(0, extra.length - 1));
        history.push(BOOKING);
    };
    const scrollspyItems = navItems.map((item) => (<NavHashLink
        key={item.id}
        to={`#${item.id}`}
        activeClassName="active bg-white text-primary"
        className={"border-left-0 list-group-item text-right text-decoration-none"}
    >
        {item.label} <Icon svg={item.icon}/>
    </NavHashLink>));

    const bookmarkClass = classnames("rounded-pill", {
        active: bookmarkActive,
    });

    const Overview = () => {
        return <section id={"overview"}>
            <h4 className={"text-secondary px-3 mb-0 mt-3"}>Overview</h4>
            <div className={"pt-3 rounded shadow-sm mb-4"}>
                <div className={"card-heading d-flex px-3"}>
                    <div className={"d-flex flex-fill flex-column text-truncate"}>
                        <h2 className={"flex-fill text-truncate"}>{title}</h2>

                        <div className={"align-items-center d-flex"}>
                <span
                    className="text-secondary card-subtitle align-items-center d-flex flex-fill mb-0 ">
                  {!locationBased && <Icon svg={PIN_DROP}/>}
                    <span className={"flex-fill"}>{location}</span>
                </span>
                        </div>
                        <NavHashLink
                            to={`#location`}
                            className={"m-0 mt-1 p-0 text-primary small text-decoration-none"}
                        >
                            Show on map
                        </NavHashLink>
                    </div>
                    <div
                        className={"card-info d-flex flex-column align-items-end justify-content-end"}
                    >
                        <div className={"d-flex align-items-center rating"}>
                            <div className={"mx-2"}>
                                <small
                                    className={"card-rating card-rating font-weight-bolder p-2 rounded-circle small star-rating"}
                                >
                                    {rating}
                                </small>
                            </div>
                            <div className={"d-flex flex-column "}>
                  <span className={"mb-0 text-secondary rating-text"}>
                    {calculateRating(rating)}
                  </span>
                                <small
                                    className={"text-muted rating-text"}
                                >{`${reviews} reviews`}</small>
                            </div>
                        </div>
                        <NavHashLink
                            to={`#reviews`}
                            className={"m-0 mt-1 p-0 text-primary small text-decoration-none text-right"}
                        >
                            Show reviews
                        </NavHashLink>
                    </div>
                </div>
                <div className={" align-items-center d-flex my-3 px-3"}>
                    <CardText className={"mb-0 flex-fill"}>
                        <Badge color={"grey"} pill>
                            {type}
                        </Badge>
                        <Badge color={"grey"} className={"ml-2 text-capitalize"} pill>
                            {group}
                        </Badge>
                        <Badge color={"grey"} className={"ml-2 text-capitalize"} pill>
                            {extra[extraIndex]}
                        </Badge>
                    </CardText>

                    <Button
                        className={bookmarkClass}
                        color={"light"}
                        size={"sm"}
                        onClick={() => {
                            setBookmarkActive(!bookmarkActive);
                        }}
                    >
                        <Icon svg={bookmarkActive ? BOOKMARK : BOOKMARK_BORDER}/>
                    </Button>
                </div>
                <div
                    className={"image-wrapper lightbox-image position-relative"}
                    style={{
                        backgroundImage: `url(${mainImage})`, backgroundSize: "cover",
                    }}
                    onClick={() => {
                        setPhotoIndex(images.findIndex((_image) => _image === mainImage));
                    }}
                >
                    <Badge color={"light"} className={"m-3 position-absolute"}
                           style={{ bottom: 0, fontSize: 16 }}>From {price}</Badge>
                </div>
                {/*<div*/}
                {/*    className={*/}
                {/*      "card-price text-dark flex-fill pt-3 px-3 justify-content-between"*/}
                {/*    }*/}
                {/*>*/}
                {/*  <span className={"price d-flex align-items-center"}>*/}
                {/*    <small className={"mr-2"}>From</small> {price}*/}
                {/*  </span>*/}
                {/*<Button color={"primary"} className={"rounded-pill mr-2"}>*/}
                {/*  View Offers*/}
                {/*</Button>*/}
                {/*</div>*/}
            </div>
        </section>;
    };

    const Location = () => {
        return <section id={"location"} className={"mb-4"}>
            <h4 className={"text-secondary my-2 pt-3 pb-2"}>Location</h4>
            <div
                className={"image-wrapper position-relative"}
                style={{ backgroundImage: `url(${map})`, backgroundSize: "cover" }}
            >
                <Icon svg={LOCATION_ICON} className={"map-pin-icon"}/>
                <h4 className={"map-address"}>
                    <Badge color={"light"} className={"text-body"}>
                        {location}
                    </Badge>
                </h4>
                <ButtonGroup className={"map-controls-button"} vertical>
                    <Button size={"sm"} color={"light"}>
                        <Icon svg={ADD_CIRCLE_SOLID}/>
                    </Button>
                    <Button size={"sm"} color={"light"}>
                        <Icon svg={REMOVE_CIRCLE_SOLID}/>
                    </Button>
                </ButtonGroup>
            </div>
        </section>;
    };

    const Info = () => {
        return <section id={"info"} className={"mb-4"}>
            <h4 className={"text-secondary my-2"}>Info</h4>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <Container className={"pl-0 pr-3 highlight-features"}>
                <h6 className="font-weight-bold text-muted">Highlighted Features</h6>
                <Row className={"py-2 align-items-center"}>
                    <Col xs="3" className={"pb-3"}>
                        <div className={"d-flex align-items-center my-2"}>
                            <Icon svg={WIFI}/>
                            <div>
                                <span>Free Wifi in Rooms</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs="3" className={"pb-3"}>
                        <div className={"d-flex align-items-center my-2"}>
                            <Icon svg={SPA}/>
                            <div>
                                <span>Spa</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs="3" className={"pb-3"}>
                        <div className={"d-flex align-items-center my-2"}>
                            <Icon svg={LOCAL_PARKING}/>
                            <div>
                                <span>Car Parking</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs="3" className={"pb-3"}>
                        <div className={"d-flex align-items-center my-2"}>
                            <Icon svg={AC_UNIT}/>
                            <div>
                                <span>Climate control</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs="3" className={"pb-3"}>
                        <div className={"d-flex align-items-center my-2"}>
                            <Icon svg={RESTAURANT_MENU}/>
                            <div>
                                <span>Restaurant</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs="3" className={"pb-3"}>
                        <div className={"d-flex align-items-center my-2"}>
                            <Icon svg={ROOM_SERVICE}/>
                            <div>
                                <span>Room service</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs="3" className={"pb-3"}>
                        <div className={"d-flex align-items-center  my-2"}>
                            <Icon svg={FITNESS_CENTER}/>
                            <div>
                                <span>Fitness Center</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs="3" className={"pb-3"}>
                        <div className={"d-flex align-items-center my-2"}>
                            <Icon svg={LIQUOR}/>
                            <div>
                                <span>Bar</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <UncontrolledCollapse toggler="#toggler">
                <Container className={"px-0"}>
                    <Row>
                        <Col xs="4">
                            <h6 className="font-weight-bold text-muted">
                                Hotel facilities
                            </h6>
                            <List className={"pl-4"}>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    24-hour reception
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Airport shuttle
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Breakfast
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Business centre
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Car park
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Cashless payment
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Computer with Internet
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Concierge
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Conference rooms
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Doctor on site
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Free WiFi
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Free WiFi in public areas
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Gym
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Hand sanitizer provided
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Hotel bar
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Hotel safe
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Laundry service
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Lift
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    New safety protocols
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Non-smoking rooms
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Online check in/check out
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Restaurant
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Room service
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Safe distance
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Temperature screening
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    WiFi in public areas
                                </li>
                            </List>
                        </Col>
                        <Col xs="4">
                            <h6 className="font-weight-bold text-muted">Room facilities</h6>
                            <List className={"pl-4"}>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Air conditioning
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Bathtub (upon inquiry)
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Cable TV
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Central heating
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Desk
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Electric kettle
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Free WiFi (rooms)
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Fridge
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Hairdryer
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Ironing board
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Safe
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Satellite TV
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Shower
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Telephone
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Television
                                </li>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    WiFi
                                </li>
                            </List>
                        </Col>
                        <Col xs="4">
                            <h6 className="font-weight-bold text-muted">Accessibility</h6>
                            <List className={"pl-4"}>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Wheelchair accessible
                                </li>
                            </List>
                            <h6 className="font-weight-bold text-muted">For children</h6>
                            <List className={"pl-4"}>
                                <li
                                    className="unordered-list__item"
                                    itemProp="amenityFeature"
                                >
                                    Cot
                                </li>
                            </List>
                        </Col>
                    </Row>
                </Container>
            </UncontrolledCollapse>
            <a id="toggler" className={"mb-2 text-primary cursor-pointer"}>
                + All features
            </a>
        </section>;
    };

    const MemberReviews = () => {
        let top = [];
        let collapseItems = [];
        reviewData.forEach((review, index) => {
            const item = <>
                <div className="reviews-members py-4" key={review.id}>
                    <div className="media mr-2">
                        <img src={review.avatar}/>
                        <div className="media-body">
                            <div className="reviews-members-header d-flex justify-content-between">
                                <div>
                                    <h6 className="mb-1 font-weight-bold">
                                        {review.author}
                                    </h6>
                                    <p className="font-weight-bold small text-secondary mb-1">{review.date}</p>
                                </div>
                                {index === 0 &&
                                <Badge color={"primary"} className="align-self-start">
                                    Top Rated
                                </Badge>}
                            </div>
                            <div className="reviews-members-body">
                                <p>
                                    {review.content}
                                </p>
                            </div>
                            <div
                                className="align-items-center d-flex justify-content-between reviews-members-footer">
                                <div>
                <span className={"text-muted"}>
                  {review.useful} found this useful
                </span>
                                </div>
                                <div>
                                    <Icon svg={THUMB_UP} className={"text-secondary"}
                                          id={`thumbs_up_${review.id}`}/>
                                    <UncontrolledTooltip placement="right"
                                                         target={`thumbs_up_${review.id}`}>
                                        Mark as helpful
                                    </UncontrolledTooltip>
                                    <Icon svg={THUMB_DOWN} className={"text-secondary"}
                                          id={`thumbs_down_${review.id}`}/>
                                    <UncontrolledTooltip placement="right"
                                                         target={`thumbs_down_${review.id}`}>
                                        Mark as unhelpful
                                    </UncontrolledTooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>;
            if (index <= 1) {
                top.push(item);
            } else {
                collapseItems.push(item);
            }
        });

        return <>
            {top}
            <UncontrolledCollapse toggler="#reviewToggler">
                <Container className={"px-0"}>
                    {collapseItems}
                </Container>
            </UncontrolledCollapse>
            <a id="reviewToggler" className={"mb-2 text-primary cursor-pointer"}>
                + More Reviews
            </a>
        </>;
    };

    const Reviews = () => {
        return <section id={"reviews"} className={"mb-4"}>
            <h4 className={"text-secondary my-2 pt-3"}>Reviews</h4>
            <div>
                <div>
                    <div className="offer-dedicated-body-left">
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade active show"
                                id="pills-reviews"
                                role="tabpanel"
                                aria-labelledby="pills-reviews-tab"
                            >

                                <div className="bg-white rounded  mb-4 clearfix graph-star-rating">
                                    <div className="graph-star-rating-header">


                                        <h6 className="font-weight-bold text-muted d-flex justify-content-between my-4">

                        <span><Icon svg={STAR_RATE}/>
                          <strong>{reviews} reviews</strong></span>
                                            <span
                                                className="mb-4 mt-2">Rated {rating} out of 10</span>
                                        </h6>

                                    </div>
                                    <div className="graph-star-rating-body">
                                        <div className="rating-list">
                                            <div className="rating-list-left">5 Star</div>
                                            <div className="rating-list-center">
                                                <div className="progress">
                                                    <div
                                                        style={{ width: "56%" }}
                                                        aria-valuemax={5}
                                                        aria-valuemin={0}
                                                        aria-valuenow={5}
                                                        role="progressbar"
                                                        className="progress-bar bg-primary"
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rating-list-right">56%</div>
                                        </div>
                                        <div className="rating-list">
                                            <div className="rating-list-left">4 Star</div>
                                            <div className="rating-list-center">
                                                <div className="progress">
                                                    <div
                                                        style={{ width: "23%" }}
                                                        aria-valuemax={5}
                                                        aria-valuemin={0}
                                                        aria-valuenow={5}
                                                        role="progressbar"
                                                        className="progress-bar bg-primary"
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rating-list-right">23%</div>
                                        </div>
                                        <div className="rating-list">
                                            <div className="rating-list-left">3 Star</div>
                                            <div className="rating-list-center">
                                                <div className="progress">
                                                    <div
                                                        style={{ width: "11%" }}
                                                        aria-valuemax={5}
                                                        aria-valuemin={0}
                                                        aria-valuenow={5}
                                                        role="progressbar"
                                                        className="progress-bar bg-primary"
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rating-list-right">11%</div>
                                        </div>
                                        <div className="rating-list">
                                            <div className="rating-list-left">2 Star</div>
                                            <div className="rating-list-center">
                                                <div className="progress">
                                                    <div
                                                        style={{ width: "2%" }}
                                                        aria-valuemax={5}
                                                        aria-valuemin={0}
                                                        aria-valuenow={5}
                                                        role="progressbar"
                                                        className="progress-bar bg-primary"
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rating-list-right">02%</div>
                                        </div>
                                    </div>

                                </div>
                                <div
                                    className="bg-white rounded mb-4 restaurant-detailed-ratings-and-reviews">
                                    <h6 className="font-weight-bold text-secondary mb-1">All Ratings
                                        and Reviews</h6>

                                    <MemberReviews/>
                                    <a
                                        className="text-center w-100 d-block mt-4 font-weight-bold"
                                        href="javascript:void(0)"

                                    >
                                        See All Reviews
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    };

    const Rooms = () => {

        const roomDeals = deals.map(deal => (<Row className={"room-deal my-4"} key={deal.title}
                           onClick={() => startDate && endDate &&
                               openBooking({ deal, accommodation, deals })}>
            <Col sm="3" className={"px-0 overflow-hidden"}>
                <img src={deal.image} className={"w-100"}/>
            </Col>
            <Col sm="9" className={"pl-4"}>
                <h5 className={"font-weight-bold"}>{deal.title}</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci alias
                    aliquid, aut deserunt, dicta dolorum esse id</p>
                <div className={"text-muted"}>
                    <Icon svg={BED} className={"mr-1"}/><span
                    className={"mr-2"}>{deal.bed}</span>
                    <Icon svg={USERS} className={"mr-1"}/><span
                    className={"mr-2"}>{deal.person} guests</span>
                </div>
            </Col>
        </Row>));

        return <section id={"deals"}>

            {(startDate && endDate) ? <>
                <div className={"d-flex justify-content-between flex-row"}>
                    <h4 className={"text-secondary mt-2"}>
                        Rooms {`(${deals.length})`}
                    </h4>
                    <div className={"d-flex"}>
                        <Badge className={"align-self-center p-1 px-2"} color={"grey"}>
                            {startDate.format(dateFormat)} - {endDate.format(dateFormat)}
                        </Badge>
                        <Button
                            className={bookmarkClass}
                            color={"light"}
                            size={"sm"}
                            onClick={() => {
                                setStartDate(null);
                                setEndDate(null);
                                dispatch({ type: "REMOVE_DETAIL_TIME" });
                            }}
                        >
                            <Icon svg={EDIT_ICON}/>
                        </Button>
                    </div>
                </div>
                {deals.length === 0 ? <Alert color="danger"
                                             className={"mt-3 mb-2 d-flex flex-column"}>
                    No rooms were available for you selected dates, please re-select dates again
                    <Button onClick={() => dispatch({ type: "REMOVE_DETAIL_TIME" })}
                            className={"my-3 align-self-start btn-outline-primary"}
                            color={"light"}>Select New Dates</Button>
                </Alert> : <Container>
                    {roomDeals}
                </Container>}
                {/*{deals}*/}
            </> : <>
                <div>
                    <h4 className={"text-secondary mt-2"}>
                        Rooms
                    </h4>
                    <Alert color="warning"
                           className={"d-flex justify-content-between flex-row p-4 my-3"}>
                        <div>
                            <strong className={"d-block"}>No dates selected</strong>
                            You must select a date to view the rooms
                        </div>
                        <FormGroup className="mb-2 mb-sm-0 text-left align-self-center">
                            <InputGroup
                                style={{ width: "240px" }}
                                className={`flex-fill ${datesFocused ? "focused" : null}`}
                            >
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText
                                        className={datesFocused ? "border-primary" : null}
                                    >
                                        <Icon svg={CALENDAR}/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <DateRangePicker
                                    startDate={localStartDate}
                                    startDateId="your_unique_start_date_id"
                                    endDate={localEndDate}
                                    endDateId="your_unique_end_date_id"
                                    onDatesChange={setSearchDates}
                                    focusedInput={datesFocused}
                                    onFocusChange={(focusedInput) => setDatesFocused(focusedInput)}
                                    customArrowIcon={<></>}
                                    displayFormat={"DD/MM/YYYY"}
                                    hideKeyboardShortcutsPanel
                                    small
                                />
                            </InputGroup>
                        </FormGroup>
                    </Alert>
                </div>
                <div style={{ minHeight: "350px" }}/>
            </>}
        </section>;

    };

    const ScrollSections = () => (<>
        <Overview/>
        <PhotoSection images={images} outsideIndex={photoIndex}/>
        <Location/>
        <Info/>
        <Reviews/>
        <Rooms/>
    </>);

    const scrollSpyItems = navItems.map(item => item.id);

    return (<Drawer
        header={"Accommodation Detail"}
        className={"detail-modal"}
        slideFrom="right"
        size={"medium"}
        isOpen={panelOpen}
        onRequestClose={closePanel}
        footer={<div className={"text-center"}>
            {!(startDate || endDate) ? <NavHashLink
                to={`#deals`}
                className={"mx-2 btn btn-primary text-decoration-none"}
            >
                View Offers
            </NavHashLink> : <Button color="primary" onClick={() => {
                openBooking({ accommodation, deals });
            }} className={"mx-2"} style={{ minWidth: "8rem" }}>
                View Offers
            </Button>}
            <Button color="light" className={"mx-2"} style={{ minWidth: "8rem" }}>
                <Icon svg={SUPPORT_AGENT} className={"mr-1"}/>
                Live Chat
            </Button>s
        </div>}
    >
        <div className={"d-flex"}>
            <div className={"position-relative"} style={{ width: "180px" }}>
                <Scrollspy
                    items={scrollSpyItems}
                    currentClassName="is-current"
                    className={"list-group mr-3 position-fixed"}
                >
                    {scrollspyItems}
                </Scrollspy>

            </div>
            <div className={"flex-fill"} style={{ marginLeft: "120px" }}>
                <ScrollSections/>
            </div>
        </div>
    </Drawer>);
};

export default DetailModal;


