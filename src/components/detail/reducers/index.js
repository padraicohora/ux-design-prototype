import accommodations from "../../../data/json/accommodations";
import {getRandomInt} from "../../home/reducers";
import {sortByRating} from "../../search/reducers";

const initialState = {
    panelOpen:false,
    accommodation:null
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "SHOW_DETAIL_PANEL":
            const _state = !!action.payload ? state : initialState;
            return {
                ..._state,
                panelOpen: !!action.payload,
                accommodation: action.payload,
            };

        default: {
            return state;
        }
    }
}
