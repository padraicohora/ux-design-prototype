import React, { useEffect, useState } from "react";
import Scrollspy from "react-scrollspy";
import { NavHashLink } from "react-router-hash-link";
import { useLocation, useHistory } from "react-router-dom";
import {
  Alert, Badge,
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
  ADD_CIRCLE, BOOKMARK,
  BOOKMARK_BORDER,
  CALENDAR,
  IMAGE,
  INFO,
  LOCAL_OFFER,
  NIGHT_SHELTER,
  PIN_DROP,
  REVIEWS
} from "../../_common_/constants/icons";
import Icon from "../../_common_/components/Icon";
import {calculateRating} from "../../home/components/AccommodationCard";
import {getRandomInt} from "../../home/reducers";
import classnames from "classnames";
import {toast} from "react-toastify";

const extra = ["Excellent Staff", "Cosy "]

const PhotoSection = ({images, outsideIndex}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  useEffect(()=> {
    if(outsideIndex){
      setIsOpen(!isOpen);
      setPhotoIndex(outsideIndex);
    }
  }, [outsideIndex])
  useEffect(()=> {
    if(!isOpen){
      setPhotoIndex(0);
    }
  }, [isOpen])
  const Thumbnails = () => images.map((image, index) => {
    return <div className={"thumbnail lightbox-image"}
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => {
                  setIsOpen(!isOpen);
                  setPhotoIndex(index)}}/>
  })
  return <section id={"photos"}>Photos
    <div >
      <Thumbnails />
    </div>
    {isOpen && (
        <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false )}
            onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
            onMoveNextRequest={() => setPhotoIndex( (photoIndex + 1) % images.length)}
        />
    )}
  </section>
}

const DetailModal = () => {
  const [bookmarkActive, setBookmarkActive] = useState()
  const [mainImage, setMainImage] = useState()
  const [extraIndex, setExtraIndex] = useState(getRandomInt(0, extra.length - 1))
  const [photoIndex, setPhotoIndex] = useState(0)

  const { images } = useSelector(
      (state) => state.detail,
      shallowEqual
  );
  const { panelOpen, accommodation } = useSelector(
    (state) => state.detail,
    shallowEqual
  );

  const {image,
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
    accomodations} = ensureNonNull(accommodation)
  const dispatch = useDispatch();
  const browserLocation = useLocation();
  const history = useHistory();

  useEffect(() => {
    if(panelOpen){
      const initLocation = {
        ...browserLocation,
        hash:"#overview"
      }
      history.push(initLocation)
      setMainImage(image)
    }

  }, [ panelOpen ]);

  useEffect(() => {
    if(bookmarkActive){
      toast(<Alert color="secondary">
        <h5>Bookmarked</h5>
        {title} has been added to you bookmark list found in your account page.
      </Alert>)
    }

  }, [ bookmarkActive ]);

  const closePanel = () => {
    dispatch({ type: "SHOW_DETAIL_PANEL", payload: null });
    const resetLocation = {
      ...browserLocation,
      hash:""
    }
    history.push(resetLocation)
    setExtraIndex(getRandomInt(0, extra.length - 1))
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
      className={"border-left-0 list-group-item text-right text-decoration-none"}
    >
      {item.label} <Icon svg={item.icon} />
    </NavHashLink>
  ));

  const bookmarkClass = classnames("rounded-pill",{
    "active": bookmarkActive
  })



  const ScrollSections = () =><>
    <section id={"overview"}>
      <div className={"card-heading d-flex"}>
        <div className={"d-flex flex-fill flex-column text-truncate"}>
          <h3 className={"flex-fill text-truncate"}>
            {title}
          </h3>

          <div className={"align-items-center d-flex"}>
            <span className="text-secondary card-subtitle align-items-center d-flex flex-fill mb-0 ">
              {!locationBased && <Icon svg={PIN_DROP}/>}
              <span className={"flex-fill"}>{location}</span>
            </span>

          </div>

        </div>
        <div className={"card-info d-flex align-items-center justify-content-end"}>
          <div className={"d-flex align-items-center rating"}>
            <div className={"mx-2"}>
              <small
                  className={"card-rating card-rating font-weight-bolder p-2 rounded-circle small star-rating"}>
                {rating}
              </small>
            </div>
            <div className={"d-flex flex-column "}>
                                <span className={"mb-0 text-secondary rating-text"}>
                                    {calculateRating(rating)}
                                </span>
              <small
                  className={"text-muted rating-text"}>{`${reviews} reviews`}</small>
            </div>
          </div>
        </div>
      </div>
      <div className={" align-items-center d-flex my-3"}>

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


        <Button className={bookmarkClass}
                size={"sm"}
                color={"light"}
                onClick={()=> {
                  setBookmarkActive(!bookmarkActive);
                }}>
          <Icon svg={bookmarkActive ? BOOKMARK : BOOKMARK_BORDER}/></Button>
      </div>
      <div className={"image-wrapper lightbox-image"}
           style={{backgroundImage:`url(${mainImage})`}}
           onClick={() => {
             setPhotoIndex(images.findIndex(_image => _image === mainImage))
           }}/>
      <div className={"card-price text-dark flex-fill"}>
        <Button color={"primary"} className={"rounded-pill mr-2"} size={"sm"}>View Offers</Button> from <span className={"price ml-2"}>{price}</span>
      </div>
    </section>
    {console.log(`photoIndex`, photoIndex)}
    <PhotoSection images={images} outsideIndex={photoIndex}/>

    <section id={"info"}>
      Info
    </section>
    <section id={"reviews"}>
      reviews
    </section><section id={"deals"}>
    deals
  </section>

  </>


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
        <div className={"position-relative"} style={{width:"140px"}}>
          <Scrollspy
            items={["section-1", "section-2", "section-3"]}
            currentClassName="is-current"
            className={"list-group mr-3 position-fixed"}
          >
            {scrollspyItems}
          </Scrollspy>
        </div>
        <div className={"flex-fill"}>
          <ScrollSections />
        </div>
      </div>
    </Drawer>
  );
};

export default DetailModal;
