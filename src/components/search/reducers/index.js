
import accommodations from "../../../data/json/accommodations";
import locations from "../../../data/json/locations";
import moment from "moment";


const initialState = {
    location:"Anywhere",
    startDate:moment(),
    endDate:moment().add(2, 'days'),
    adults:2,
    children:0,
    rooms:1,
    type:"Hotel"
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "SUBMIT_SEARCH":
            return {
                ...state,
                ...action.payload,
                location: action.payload.location
                    ? action.payload.location
                    : initialState.location
            }
        default: {
            return state
        }
    }
}
