import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle,} from "reactstrap";
import React from "react";
import Icon from "../../_common_/components/Icon";
import {PIN_DROP} from "../../_common_/constants/icons";
import classnames from "classnames";

const AssistantCard = ({
    image,
    title,
    location,
    rating,
    price,
    type,
    reviews,
    assistant
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

    const rootClass = classnames("accommodation-card p-4", {
        assistant,
    })
    const cardClass = classnames( {
        assistant,
    })
    return (
        <div className={rootClass}>
            <Card className={cardClass}>
                <div className={"image-wrapper"}>
                    <CardImg top width="100%" src={image} alt="Card image cap"/>
                </div>
                <CardBody>
                    <div className={"card-heading align-items-center d-flex"}>
                        <div className={"d-flex flex-fill flex-column text-truncate"}>
                            <CardTitle tag="span"
                                       className={"card-title flex-fill text-truncate"}>
                                {title}
                            </CardTitle>
                            <div className={"align-items-center d-flex text-truncate"}>
                                <CardSubtitle tag="span"
                                              className="text-secondary card-subtitle align-items-center d-flex flex-fill mb-0 text-truncate">
                                    <Icon svg={PIN_DROP}/>
                                    <span className={"flex-fill text-truncate"}>
                                        {location}
                                    </span>
                                </CardSubtitle>
                            </div>
                        </div>
                        <div className={"d-flex flex-column"}>
                            <div className={"d-flex align-items-center rating"}>
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
                                    <small
                                        className={"text-muted rating-text"}>{`${reviews} reviews`}</small>
                                </div>
                            </div>
                            <div className={"card-price text-dark mt-2"}>{price}</div>
                        </div>
                    </div>

                    <div className={"card-info d-flex align-items-center"}>
                        <CardText className={"mb-0 flex-fill"}>
                            <Badge color={"primary"} pill>
                                {type}
                            </Badge>
                        </CardText>

                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default AssistantCard;
