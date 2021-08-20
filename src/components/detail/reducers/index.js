import accommodations from "../../../data/json/accommodations";

const initialState = {
    panelOpen:false,
    accommodation:null,
    images:[]
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "SHOW_DETAIL_PANEL":
            if(action.payload){
                const images = accommodations
                .filter(accommodation => accommodation.group === action.payload.group)
                .map(group => group.image)
                return {
                    ...state,
                    panelOpen: !!action.payload,
                    accommodation: action.payload,
                    images
                };
            }else{
                return {
                    ...initialState
                };
            }

        default: {
            return state;
        }
    }
}
