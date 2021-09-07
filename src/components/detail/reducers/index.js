import _ from "lodash"
import accommodations from "../../../data/json/accommodations";
import classicDouble from "../../../assets/rooms/classic-double.jpg";
import familyRoom from "../../../assets/rooms/family-room.jpg";
import superiorRoom from "../../../assets/rooms/superior-double.jpg";
import twinRoom from "../../../assets/rooms/twin-room.jpg";
import {getRandomInt} from "../../home/reducers";
const dealData = [ {
    title: "Economy Double Room", bed: "Large Double bed", person: 2, image: classicDouble,
}, {
    title: "Superior Double Room", bed: "Queen bed", person: 2, image: superiorRoom
},
    {
    title: "Classic Double/Twin Room", bed: "Double bed, Twin bed", person: 3, image: twinRoom
},  {
    title: "Family Room", bed: "Double bed, Single bed", person: 4, image: familyRoom
}, ];

const getDeals = (rooms, children, adults) => {
    const random = getRandomInt(0, rooms > 1 ? rooms : 4)
    let deals = [];
    if((children + adults) <= 2){
        deals.push(dealData[0])
        deals.push(dealData[1])
    }
    if((children + adults) === 3){
        deals.push(dealData[2])
        deals.push(dealData[3])
    }
    if((children + adults) === 4){
        deals.push(dealData[3])
    }
    if((children + adults) === 5){
        deals = _.sampleSize(dealData, random)
    }
    return deals
}

const initialState = {
    panelOpen:false,
    accommodation:null,
    images:[],
    deals:[],
    adults: 2,
    children: 0,
    rooms: 1,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "SHOW_DETAIL_PANEL": {
            const {rooms, children, adults} = state
            if (action.payload) {
                const images = accommodations
                .filter(accommodation => accommodation.group === action.payload.group)
                .map(group => group.image);
                const {startDate, endDate} = action.payload;
                const deals = (startDate && endDate) ?
                    getDeals(rooms, children, adults) : []
                return {
                    ...state,
                    panelOpen: !!action.payload,
                    accommodation: action.payload,
                    images,
                    deals
                };
            } else {
                return {
                    ...initialState
                };
            }
        }
        case "OPEN_ACCOMMODATION":{
            return {
                ...state,
                ...initialState
            };
        }
        case "REMOVE_DETAIL_TIME":{
            return {
                ...state,
                accommodation: {
                    ...state.accommodation,
                    startDate:null,
                    endDate:null,
                },
                deals:initialState.deals
            };
        }
        case "SET_DETAIL_TIME":{
            const {rooms, children, adults} = state
            return {
                ...state,
                accommodation: {
                    ...state.accommodation,
                    startDate:action.payload.startDate,
                    endDate:action.payload.endDate,
                },
                deals:getDeals(rooms, children, adults)
            };
        }
        case "SUBMIT_SEARCH":{
            const {rooms, children, adults} = action.payload
            return {
                ...state,
                accommodation: {
                    ...state.accommodation,
                    startDate:action.payload.startDate,
                    endDate:action.payload.endDate,
                },
                adults,
                children,
                rooms,
                deals:getDeals(rooms, children, adults)
            };
        }
        case "SET_GUEST_AMOUNT": {
            const {rooms, children, adults} = action.payload
            return {
                ...state,
                ...action.payload,
                deals:getDeals(rooms, children, adults)
            }
        }
        default: {
            return state;
        }
    }
}
