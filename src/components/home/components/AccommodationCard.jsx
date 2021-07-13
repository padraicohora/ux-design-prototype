import {Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";
import React from "react";
import Icon from "../../_common_/components/Icon";

const AccommodationCard = ({image, title, location, rating, subText, price}) => {
    return <div className={"p-4 accommodation-card"}>
        <Card className={"bg-light my-2"}>
            <CardImg top width="100%" src={image} alt="Card image cap"/>
            <CardBody>
                <div className={"card-heading align-items-center d-flex mb-3"}>
                    <CardTitle tag="h5" className={"card-title flex-fill mb-0"}>
                        {title}
                    </CardTitle>
                    <small className={"card-rating card-rating font-weight-bolder p-2 rounded-circle small"}>
                        {rating}
                    </small>
                </div>
                <CardSubtitle tag="h6" className="mb-2 text-muted card-subtitle">
                    <Icon svg={}/>
                        {location}
                </CardSubtitle>
                <div className={"card-info d-flex"}>
                    <CardText className={"mb-0"}>{subText}
                    </CardText>
                    <div className={"card-price align-self-end"}>{price}</div>
                </div>
            </CardBody>
        </Card>
    </div>
}

export default AccommodationCard
