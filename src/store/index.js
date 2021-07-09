import { combineReducers } from "redux";
import accountReducers from "../components/account/reducers";
import assistReducers from "../components/assist/reducers";
import bookingReducers from "../components/booking/reducers";
import comparisonReducers from "../components/comparison/reducers";
import homeReducers from "../components/home/reducers";
import searchReducers from "../components/search/reducers";

const reducers = {
    account: accountReducers,
    assist: assistReducers,
    booking: bookingReducers,
    comparison: comparisonReducers,
    home: homeReducers,
    search: searchReducers,
};

const rootReducer = combineReducers(reducers);

export default (state, action) => rootReducer(action.type === "LOGOUT" ? undefined : state, action);
