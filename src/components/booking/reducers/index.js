import accommodations from "../../../data/json/accommodations";

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
