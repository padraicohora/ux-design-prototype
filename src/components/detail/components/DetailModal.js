import React, { useEffect, useState } from "react";
import Scrollspy from "react-scrollspy";
import { NavHashLink } from "react-router-hash-link";
import { useLocation, useHistory } from "react-router-dom";
import {
  Alert,
  Badge,
  Button,
  CardSubtitle,
  CardText,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import {
  Drawer,
  VerticalItem,
  VerticalNavigation,
  VerticalSection,
} from "react-rainbow-components";
import Lightbox from "react-image-lightbox";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ensureNonNull } from "../../_common_/Utils";
import {
    ADD_CIRCLE,
    BOOKMARK,
    BOOKMARK_BORDER,
    CALENDAR,
    IMAGE,
    INFO,
    LOCAL_OFFER,
    LOCATION_ICON,
    NIGHT_SHELTER,
    PIN_DROP,
    REVIEWS,
} from "../../_common_/constants/icons";
import Icon from "../../_common_/components/Icon";
import { calculateRating } from "../../home/components/AccommodationCard";
import { getRandomInt } from "../../home/reducers";
import map from "../../../assets/map.jpg";
import classnames from "classnames";
import { toast } from "react-toastify";

const extra = ["Excellent Staff", "Cosy "];

const PhotoSection = ({ images, outsideIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  useEffect(() => {
    if (outsideIndex) {
      setIsOpen(!isOpen);
      setPhotoIndex(outsideIndex);
    }
  }, [outsideIndex]);
  useEffect(() => {
    if (!isOpen) {
      setPhotoIndex(0);
    }
  }, [isOpen]);
  const Thumbnails = () =>
    images.map((image, index) => {
      return (
        <div
          className={"thumbnail lightbox-image"}
          style={{ backgroundImage: `url(${image})` }}
          onClick={() => {
            setIsOpen(!isOpen);
            setPhotoIndex(index);
          }}
        />
      );
    });
  return (
    <section id={"photos"}>
      <h5 className={"text-muted"}>Photos</h5>
      <div style={{ margin: "0 -10px" }}>
        <Thumbnails />
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </section>
  );
};

const DetailModal = () => {
  const [bookmarkActive, setBookmarkActive] = useState();
  const [mainImage, setMainImage] = useState();
  const [extraIndex, setExtraIndex] = useState(
    getRandomInt(0, extra.length - 1)
  );
  const [photoIndex, setPhotoIndex] = useState(0);

  const { images } = useSelector((state) => state.detail, shallowEqual);
  const { panelOpen, accommodation } = useSelector(
    (state) => state.detail,
    shallowEqual
  );

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
    accomodations,
  } = ensureNonNull(accommodation);
  const dispatch = useDispatch();
  const browserLocation = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (panelOpen) {
      const initLocation = {
        ...browserLocation,
        hash: "#overview",
      };
      history.push(initLocation);
      setMainImage(image);
    }
  }, [panelOpen]);

  useEffect(() => {
    if (bookmarkActive) {
      toast(
        <Alert color="secondary">
          <h5>Bookmarked</h5>
          {title} has been added to you bookmark list found in your account
          page.
        </Alert>
      );
    }
  }, [bookmarkActive]);

  const closePanel = () => {
    dispatch({ type: "SHOW_DETAIL_PANEL", payload: null });
    const resetLocation = {
      ...browserLocation,
      hash: "",
    };
    history.push(resetLocation);
    setExtraIndex(getRandomInt(0, extra.length - 1));
  };

  const showMap = () => {
    const resetLocation = {
      ...browserLocation,
      hash: "#info",
    };
    history.push(resetLocation);
  };

  const navItems = [
    {
      label: "Overview",
      id: "overview",
      icon: NIGHT_SHELTER,
    },
    {
      label: "Photos",
      id: "photos",
      icon: IMAGE,
    },
    {
      label: "Location",
      id: "location",
      icon: PIN_DROP,
    },
    {
      label: "Info",
      id: "info",
      icon: INFO,
    },
    {
      label: "Reviews",
      id: "reviews",
      icon: REVIEWS,
    },
    {
      label: "Deals",
      id: "deals",
      icon: LOCAL_OFFER,
    },
  ];

  const scrollspyItems = navItems.map((item) => (
    <NavHashLink
      to={`#${item.id}`}
      activeClassName="active bg-white text-primary"
      className={
        "border-left-0 list-group-item text-right text-decoration-none"
      }
    >
      {item.label} <Icon svg={item.icon} />
    </NavHashLink>
  ));

  const bookmarkClass = classnames("rounded-pill", {
    active: bookmarkActive,
  });

    const ScrollSections = () => (
        <>
            <section id={"overview"}>
                <h5 className={"text-muted px-3"}>Overview</h5>
                <div className={"py-3 rounded shadow-sm mb-4"}>
                    <div className={"card-heading d-flex px-3"}>
                        <div className={"d-flex flex-fill flex-column text-truncate"}>
                            <h3 className={"flex-fill text-truncate"}>{title}</h3>

              <div className={"align-items-center d-flex"}>
                <span className="text-secondary card-subtitle align-items-center d-flex flex-fill mb-0 ">
                  {!locationBased && <Icon svg={PIN_DROP} />}
                  <span className={"flex-fill"}>{location}</span>
                </span>
              </div>
              <NavHashLink
                to={`#location`}
                className={
                  "m-0 mt-1 p-0 text-primary small text-decoration-none"
                }
              >
                Show on map
              </NavHashLink>
            </div>
            <div
              className={
                "card-info d-flex flex-column align-items-end justify-content-end"
              }
            >
              <div className={"d-flex align-items-center rating"}>
                <div className={"mx-2"}>
                  <small
                    className={
                      "card-rating card-rating font-weight-bolder p-2 rounded-circle small star-rating"
                    }
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
                className={
                  "m-0 mt-1 p-0 text-primary small text-decoration-none text-right"
                }
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
              <Icon svg={bookmarkActive ? BOOKMARK : BOOKMARK_BORDER} />
            </Button>
          </div>
          <div
            className={"image-wrapper lightbox-image"}
            style={{ backgroundImage: `url(${mainImage})`, backgroundSize: "cover", }}
            onClick={() => {
              setPhotoIndex(images.findIndex((_image) => _image === mainImage));
            }}
          />
          <div
            className={
              "card-price text-dark flex-fill pt-3 px-3 justify-content-between"
            }
          >
            <span className={"price d-flex align-items-center"}>
              <small className={"mr-2"}>From</small> {price}
            </span>
            <Button color={"primary"} className={"rounded-pill mr-2"}>
              View Offers
            </Button>
          </div>
        </div>
      </section>
      <PhotoSection images={images} outsideIndex={photoIndex} />

      <section id={"location"} className={"mb-4"}>
        <h5 className={"text-muted my-2"}>Location</h5>
        <div
          className={"image-wrapper "}
          style={{ backgroundImage: `url(${map})`, backgroundSize: "cover" }}
        />
      </section>

      <section id={"info"} className={"mb-2"}>
        <h5 className={"text-muted my-2"}>Info</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="sl-box__block clearfix">
          <div className="all-amenities__group mb-gutter"><h5
              className="block mt-0 mb-gutter-three-quarters font-small fw-normal">Hotel
            facilities</h5>
            <ul className="unordered-list m-0" itemScope="itemscope"
                itemType="https://schema.org/Accommodation">
              <li className="unordered-list__item" itemProp="amenityFeature">24-hour reception</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Airport shuttle</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Breakfast</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Business centre</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Car park</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Cashless payment</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Computer with
                Internet
              </li>
              <li className="unordered-list__item" itemProp="amenityFeature">Concierge</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Conference rooms</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Doctor on site</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Free WiFi</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Free WiFi in public
                areas
              </li>
              <li className="unordered-list__item" itemProp="amenityFeature">Gym</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Hand sanitizer
                provided
              </li>
              <li className="unordered-list__item" itemProp="amenityFeature">Hotel bar</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Hotel safe</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Laundry service</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Lift</li>
              <li className="unordered-list__item" itemProp="amenityFeature">New safety protocols
              </li>
              <li className="unordered-list__item" itemProp="amenityFeature">Non-smoking rooms</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Online check in/check
                out
              </li>
              <li className="unordered-list__item" itemProp="amenityFeature">Restaurant</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Room service</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Safe distance</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Temperature screening
              </li>
              <li className="unordered-list__item" itemProp="amenityFeature">WiFi in public areas
              </li>
            </ul>
          </div>
          <div className="all-amenities__group mb-gutter"><h5
              className="block mt-0 mb-gutter-three-quarters font-small fw-normal">Room
            facilities</h5>
            <ul className="unordered-list m-0" itemScope="itemscope"
                itemType="https://schema.org/Accommodation">
              <li className="unordered-list__item" itemProp="amenityFeature">Air conditioning</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Bathtub (upon
                inquiry)
              </li>
              <li className="unordered-list__item" itemProp="amenityFeature">Cable TV</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Central heating</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Desk</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Electric kettle</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Free WiFi (rooms)</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Fridge</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Hairdryer</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Ironing board</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Safe</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Satellite TV</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Shower</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Telephone</li>
              <li className="unordered-list__item" itemProp="amenityFeature">Television</li>
              <li className="unordered-list__item" itemProp="amenityFeature">WiFi</li>
            </ul>
          </div>
          <div className="all-amenities__group mb-gutter"><h5
              className="block mt-0 mb-gutter-three-quarters font-small fw-normal">Accessibility</h5>
            <ul className="unordered-list m-0" itemScope="itemscope"
                itemType="https://schema.org/Accommodation">
              <li className="unordered-list__item" itemProp="amenityFeature">Wheelchair accessible
              </li>
            </ul>
          </div>
          <div className="all-amenities__group mb-gutter"><h5
              className="block mt-0 mb-gutter-three-quarters font-small fw-normal">For children</h5>
            <ul className="unordered-list m-0" itemScope="itemscope"
                itemType="https://schema.org/Accommodation">
              <li className="unordered-list__item" itemProp="amenityFeature">Cot</li>
            </ul>
          </div>
        </div>
      </section>
      <section id={"reviews"}>
        <h5 className={"text-muted my-2"}>reviews</h5>
      </section>
      <section id={"deals"}>
        <h5
          className={"text-muted mt-2"}
          style={{ marginBottom: "calc(100vh - 150px)" }}
        >
          deals
        </h5>
      </section>
    </>
  );

  return (
    <Drawer
      header={"Accommodation Detail"}
      className={"detail-modal"}
      slideFrom="right"
      size={"medium"}
      isOpen={panelOpen}
      onRequestClose={closePanel}
      footer={
        <div className={"text-center"}>
          <Button color="primary" onClick={closePanel}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={closePanel}>
            Cancel
          </Button>
        </div>
      }
    >
      <div className={"d-flex"}>
        <div className={"position-relative"} style={{ width: "140px" }}>
          <Scrollspy
            items={["section-1", "section-2", "section-3"]}
            currentClassName="is-current"
            className={"list-group mr-3 position-fixed"}
          >
            {scrollspyItems}
          </Scrollspy>
        </div>
        <div className={"flex-fill"} style={{marginLeft:"120px"}}>
          <ScrollSections />
        </div>
      </div>
    </Drawer>
  );
};

export default DetailModal;
