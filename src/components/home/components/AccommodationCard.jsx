import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle,} from "reactstrap";
import React from "react";
import Icon from "../../_common_/components/Icon";
import {PIN_DROP} from "../../_common_/constants/icons";

const AccommodationCard = ({
    image,
    title,
    location,
    rating,
    subText,
    price,
    type,
    reviews
}) => {

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

    return (
        <div className={"p-4 accommodation-card"}>
            <Card className={"my-2"}>
                <CardImg top width="100%" src={image} alt="Card image cap"/>
                <CardBody>
                    <div className={"card-heading align-items-center d-flex mb-2"}>
                        <div className={"d-flex flex-fill flex-column"}>
                            <CardTitle tag="span"
                                       className={"card-title flex-fill mb-2"}>
                                {title}
                            </CardTitle>
                            <CardSubtitle
                                tag="span"
                                className="mb-2 text-secondary card-subtitle align-items-center d-flex">
                                <Icon svg={PIN_DROP}/>
                                {location}
                            </CardSubtitle>
                        </div>

                        <div className={"card-price text-dark"}>{price}</div>
                    </div>

                    <div className={"card-info d-flex align-items-center"}>
                        <CardText className={"mb-0 flex-fill"}>
                            {subText}
                            <Badge color={"primary"} pill>
                                {type}
                            </Badge>
                        </CardText>
                        <div className={"d-flex align-items-center"}>
                            <div className={"mx-2"}>
                                <small
                                    className={"card-rating card-rating font-weight-bolder p-2 rounded-circle small"}>
                                    {rating}
                                </small>
                            </div>
                            <div className={"d-flex flex-column "}>
                                <span className={"mb-0 text-secondary rating-text"}>
                                    {calculateRating(rating)}
                                </span>
                                <small className={"text-muted rating-text"}>{`${reviews} reviews`}</small>
                            </div>
                        </div>

                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default AccommodationCard;
