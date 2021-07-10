import { combineReducers } from "redux";
import accountReducers from "../components/account/reducers";
import assistReducers from "../components/assist/reducers";
import bookingReducers from "../components/booking/reducers";
import comparisonReducers from "../components/comparison/reducers";
import homeReducers from "../components/home/reducers";
import searchReducers from "../components/search/reducers";
import {TOGGLE_SEARCH_BAR} from "../components/home/constants";

// console.log(`homeReducers`, homeReducers({
//     searchOpen:true,
// }, {type:TOGGLE_SEARCH_BAR}))

const reducers = {
    account: accountReducers,
    assist: assistReducers,
    booking: bookingReducers,
    comparison: comparisonReducers,
    home: homeReducers,
    search: searchReducers,
};

// const rootReducer = combineReducers(reducers);

// export default (state, action) => rootReducer( state, action);
export default combineReducers(reducers);
