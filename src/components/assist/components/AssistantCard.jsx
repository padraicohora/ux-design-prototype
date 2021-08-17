import {
    Badge, Button,
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
} from "reactstrap";
import React from "react";
import Icon from "../../_common_/components/Icon";
import {PIN_DROP} from "../../_common_/constants/icons";
import classnames from "classnames";
import {useSelector} from "react-redux";
import {ensureNonNull} from "../../_common_/Utils";
import TextTruncate from 'react-text-truncate';

const AssistantCard = ({
    image,
    title,
    location,
    rating,
    price,
    type,
    reviews,
    assistant,
    number
}) => {

    const { wizardOpen, assistDate, results,
        assistSeason,
        assistHolidayType,
        assistAccommodation,
        assistLocation,
        assistPersonalisation } = useSelector((state) => state.assist);

    function calculateRating(rating) {
        const number = parseFloat(rating) * 10;
        if (number <= 70) return "Okay"
        if (number > 70 && number <= 75) return "Good"
        if (number > 75 && number <= 80) return "Very Good"
        if (number > 80 && number <= 85) return "Great"
        if (number > 85 && number <= 90) return "Excellent"
        if (number > 90 && number <= 95) return "Excellent"
        if (number > 95 && number <= 100) return "Unbelievable"
    }

    const BadgeList = () => {
        return <>
            <Badge pill className={"mr-2"} color={"primary"}>
            {ensureNonNull(assistHolidayType).label}
        </Badge>
            <Badge pill className={"mr-2"} color={"primary"}>
                {ensureNonNull(assistAccommodation).label}
            </Badge>
        </>
    }

    const rootClass = classnames("accommodation-card p-4 position-relative", {
        assistant,
    })
    const cardClass = classnames( {
        assistant,
    })
    return (
        <div className={rootClass}>
            <div className={`assistant-rating ${number === 0 && "top-result"}`} style={{backgroundColor: number === 0 ? "gold" : "silver"}}><span>{number+1}</span></div>
            <Card className={cardClass}>
                <div className={"image-wrapper"} style={{backgroundImage:`url(${image})`}}>

                    {/*<CardImg top width="100%" src={image} alt="Card image cap"/>*/}
                </div>
                <CardBody className={"p-4 ml-3"}>
                    <div className={"card-heading align-items-center d-flex mt-2"}>
                        <div className={"d-flex flex-fill flex-column"}>
                            <CardTitle tag="span"
                                       className={"card-title flex-fill text-truncate"}>
                                {title}
                            </CardTitle>
                            <div className={"align-items-center d-flex text-truncate mb-2"}>
                                <CardSubtitle tag="span"
                                              className="text-secondary card-subtitle align-items-center d-flex flex-fill mb-0 text-truncate">
                                    <Icon svg={PIN_DROP}/>
                                    <span className={"flex-fill text-truncate"}>
                                        {location}
                                    </span>
                                </CardSubtitle>
                            </div>
                            <div className={"d-flex align-items-center rating"}>
                                <div className={"mr-2"}>
                                    <small
                                        className={"card-rating card-rating font-weight-bolder p-2 rounded-circle small"}>
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
                        <div className={"d-flex flex-column align-self-start"}>

                            <div className={"card-price text-dark mb-3 mt-1"}>From {price}</div>
                            <Button color={"primary"} outline>View Offers</Button>
                        </div>
                    </div>
                    <BadgeList />
                    <div className={"card-info d-flex align-items-center pt-3"}>
                        <CardText className={"mb-0 flex-fill"}>
                            <TextTruncate
                                line={3}
                                element="span"
                                truncateText="…"
                                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                textTruncateChild={<a href="#">Read on</a>}
                            />
                        </CardText>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default AssistantCard;
