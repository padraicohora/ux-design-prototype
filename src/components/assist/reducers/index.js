
const initialState = {
    wizardOpen:false,
    assistDate:null,
    assistSeason:null,
    assistHolidayType:null,
    assistAccommodation:null,
    assistLocation:null,
    assistPersonalisation:null,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "SHOW_BOOK_ASSIST_WIZARD":
            return {
                ...initialState,
                wizardOpen: action.payload,
            };
        case "SUBMIT_ASSISTANT":
            return {
                ...state,
                wizardOpen: false,
            };
        case "SET_BOOK_ASSIST_DATE":
            return {
                ...state,
                assistDate: action.payload,
                assistSeason: initialState.assistSeason
            };
        case "SET_BOOK_ASSIST_SEASON":
            return {
                ...state,
                assistDate: initialState.assistDate,
                assistSeason: action.payload,
            };
        case "SET_BOOK_ASSIST_HOLIDAY_TYPE":
            return {
                ...state,
                assistHolidayType: action.payload.length === 0 ? null : action.payload,
            };
        case "SET_BOOK_ASSIST_ACCOMMODATION":
            return {
                ...state,
                assistAccommodation: action.payload.length === 0 ? null : action.payload,
            };
        case "SET_BOOK_ASSIST_LOCATION":
            return {
                ...state,
                assistLocation: action.payload.length === 0 ? null : action.payload,
            };
        case "SET_BOOK_ASSIST_PERSONALISATION":
            return {
                ...state,
                assistPersonalisation: action.payload.length === 0 ? null : action.payload,
            };
        default: {
            return state;
        }
    }
}
