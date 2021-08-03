
const initialState = {
    wizardOpen:false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case "SHOW_BOOK_ASSIST_WIZARD":
            return {
                ...state, wizardOpen: action.payload,
            };

        default: {
            return state;
        }
    }
}
