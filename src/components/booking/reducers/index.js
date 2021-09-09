import accommodations from "../../../data/json/accommodations";
import {getDeals} from "../../detail/reducers";

const initialState = {
    accommodation:null,
    deal:null,
    adults: 2,
    children: 0,
    rooms: 1,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "OPEN_ACCOMMODATION": {
            return {
                ...state,
                ...action.payload,
            }
        }
        case "SET_GUEST_AMOUNT": {
            const {rooms, children, adults} = action.payload
            return {
                ...state,
                ...action.payload,
                deals:getDeals(rooms, children, adults)
            }
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
                adults:action.payload.adults,
                children: action.payload.children,
                rooms: action.payload.rooms,
                deals:getDeals(rooms, children, adults)
            };
        }
        case "SELECT_DEAL_RATE":{
            return {
                ...state,
                rate:action.payload
            };
        }
        case "SELECT_ADD_ON":{
            return {
                ...state,
                addOn:action.payload
            };
        }
        default: {
            return state;
        }
    }
}
