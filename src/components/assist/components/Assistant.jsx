import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TOGGLE_SEARCH_BAR} from "../../home/constants";
import {Container, DropdownToggle, UncontrolledButtonDropdown} from "reactstrap";
import {dateFormat} from "../../search/components/Results";
import {guestString} from "../../_common_/components/Navigation";

const Assistant = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "HIDE_SEARCH_BAR" });
        let timer1 = setTimeout(() => dispatch({ type: "UNSET_LOADING"}),  1400);
        return () => clearTimeout(timer1);
    }, [ ]);
    const { wizardOpen, assistDate,
        assistSeason,
        assistHolidayType,
        assistAccommodation,
        assistLocation,
        assistPersonalisation } = useSelector((state) => state.assist);

    const renderHolidayType = () => assistHolidayType
        ? assistHolidayType.map(type => <span>{type.label}</span>) : null;
    const renderAccommodation = () => assistAccommodation ? assistAccommodation.map(type => type.label) : null;
    const renderLocation = () => assistLocation ? assistLocation.map(type => type.label) : null;
    return <div>
        <div className={"bg-light search-heading"}>
            <Container className={"position-relative"}>
                <div className={"d-flex flex-column"}>
                    <div className={"my-3"}>
                        Results for&nbsp;
                        <strong className={"pl-1"}>{renderHolidayType()}</strong>
                        <strong className={"pl-1"}>{renderAccommodation()}</strong>
                        <strong className={"pl-1"}>{renderLocation()}</strong>
                        {assistDate && assistDate.startDate && assistDate.endDate && <>&nbsp;between&nbsp;
                            <strong>{`${assistDate.startDate.format(dateFormat)} - ${assistDate.endDate.format(dateFormat)}`}</strong></>}
                        {assistSeason && <>
                            <strong>{assistSeason}</strong></>}
                    </div>
                    {/*<div className={"pr-3 flex-fill mb-3"}>*/}
                    {/*    <div className={"d-flex align-items-center"}>*/}
                    {/*        <div className={"pr-2"}>*/}
                    {/*            <UncontrolledButtonDropdown>*/}
                    {/*                <DropdownToggle*/}
                    {/*                    style={{width:140}}*/}
                    {/*                    className={"d-flex justify-content-between align-items-center"}*/}
                    {/*                    size={"sm"} color={"primary"}*/}
                    {/*                    outline>*/}
                    {/*                    {`Sort By: ${sortBy.label} `}*/}
                    {/*                    <Icon svg={ARROW_DOWN_ICON}/>*/}
                    {/*                </DropdownToggle>*/}
                    {/*                <DropdownMenu>*/}
                    {/*                    <SortByMenu />*/}
                    {/*                </DropdownMenu>*/}
                    {/*            </UncontrolledButtonDropdown>*/}
                    {/*        </div>*/}
                    {/*        <div className={"px-1"}>*/}
                    {/*            <Button size={"sm"} color={"primary"}*/}
                    {/*                    style={{width:120}}*/}
                    {/*                    className={"d-flex justify-content-between align-items-center"}*/}
                    {/*                    outline*/}
                    {/*                    onClick={()=>setDirection()}>*/}
                    {/*                {direction.label} <Icon svg={direction.filter === "desc" ? ARROW_DOWN_ICON : ARROW_UP_ICON}/>*/}
                    {/*            </Button>*/}
                    {/*        </div>*/}
                    {/*        <div className={"px-1"}>*/}
                    {/*            <CustomInput*/}
                    {/*                type="switch"*/}
                    {/*                id="exampleCustomSwitch"*/}
                    {/*                name="customSwitch"*/}
                    {/*                onChange={(e)=>setFreeCancellationOnly(e.target.checked)}*/}
                    {/*                // onChange={setFreeCancellationOnly}*/}
                    {/*                checked={freeCancellationOnly}*/}
                    {/*                label="Free Cancellation Only" />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </Container>
        </div>
        </div>
}

export default Assistant
