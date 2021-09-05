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
    title: "Classic Double/Twin Room", bed: "Double bed, Twin bed", person: 2, image: twinRoom
}, {
    title: "Superior Double Room", bed: "Queen bed", person: 2, image: superiorRoom
}, {
    title: "Family Room", bed: "Double bed, Single bed", person: 5, image: familyRoom
}, ];

const initialState = {
    panelOpen:false,
    accommodation:null,
    images:[],
    deals:[]
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "SHOW_DETAIL_PANEL": {
            if (action.payload) {
                const images = accommodations
                .filter(accommodation => accommodation.group === action.payload.group)
                .map(group => group.image);
                const {startDate, endDate} = action.payload;
                const deals = (startDate && endDate) ?
                    _.sampleSize(dealData, getRandomInt(-1, 3)) : []
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
            const deals = _.sampleSize(dealData, getRandomInt(-1, 3))
            return {
                ...state,
                accommodation: {
                    ...state.accommodation,
                    startDate:action.payload.startDate,
                    endDate:action.payload.endDate,
                },
                deals
            };
        }
        default: {
            return state;
        }
    }
}
