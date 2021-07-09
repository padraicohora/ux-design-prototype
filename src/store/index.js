import { combineReducers } from "redux";
import authReducers from "../components/auth/reducers";

const reducers = {
    auth: authReducers,
};

const rootReducer = combineReducers(reducers);

export default (state, action) => rootReducer(action.type === "LOGOUT" ? undefined : state, action);
