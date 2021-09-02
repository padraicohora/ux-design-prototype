import accommodations from "../../../data/json/accommodations";

const initialState = {
    accommodation:null,
    deal:null,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "OPEN_ACCOMMODATION": {
            return {
                ...state,
                ...action.payload,
            }
        }
        default: {
            return state;
        }
    }
}
