import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = process.env.NODE_ENV === "production"
    ? applyMiddleware(promise, thunk)
    : composeEnhancers(applyMiddleware(promise, thunk, logger));

export default middleware;
