import React, {useEffect, useRef, useState} from "react";
import {Button, Container} from "reactstrap";
import Flickity from "react-flickity-component";
import AccommodationCard from "./AccommodationCard";

const ExploreSlider = ({theme, items, onViewMore}) => {
    const [headingLeft, setHeadingLeft] = useState(0);
    const heading = useRef({})
    let flkty = {}

    useEffect(() => {
        if (heading && heading.current) {
            setHeadingLeft(heading.current.offsetLeft - 22)
        }
    }, [])

    return (
        <>
            <Container className={"d-flex align-items-center mt-5 mb-3"}>
                <h3 className={"flex-fill font-weight-medium mb-0"} ref={heading}>{theme}</h3>
                <Button color={"light"}
                        onClick={onViewMore}>
                    Show All
                </Button>
            </Container>
            <Container fluid className={"px-0 overflow-x-hidden"}>
                <Flickity className={'carousel overflow-hidden h-100 mb-3'}
                          style={{height: "calc(100% + 40px)"}}
                          elementType={'div'}
                          options={{
                              initialIndex: 0,
                              cellAlign: 'left',
                              contain: true,
                              freeScroll: true,
                              percentPosition: false,
                              groupCells: 4
                          }}
                          disableImagesLoaded={false}
                          reloadOnUpdate
                          flickityRef={c => flkty = c}
                          static>
                    <div style={{width: headingLeft}} className={"invisible"}/>
                    {items && items.map(item => <AccommodationCard {...item} key={item.id}/>)}
                </Flickity>
            </Container>

        </>
    );
};


export default ExploreSlider
