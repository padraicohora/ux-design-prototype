import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";
import React from "react";
import Icon from "../../_common_/components/Icon";
import {PIN_DROP, PLACE} from "../../_common_/constants/icons";

const AccommodationCard = ({image, title, location, country, rating, subText, price, type}) => {
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
                <CardSubtitle tag="h6" className="mb-2 text-muted card-subtitle align-items-center d-flex">
                    <Icon svg={PIN_DROP}/>
                        {location}, {country}
                </CardSubtitle>
                <div className={"card-info d-flex"}>

                    <CardText className={"mb-0"}>
                        {subText}
                        <Badge color={"primary"} pill>{type}</Badge>
                    </CardText>
                    <div className={"card-price align-self-end"}>{price}</div>
                </div>
            </CardBody>
        </Card>
    </div>
}

export default AccommodationCard
