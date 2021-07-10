import {TOGGLE_SEARCH_BAR} from "../constants";

const initialState = {
    searchOpen:true,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case TOGGLE_SEARCH_BAR:
            return {
                ...state,
                searchOpen: !state.searchOpen,
            }
        default: {
            return state
        }
    }
}
