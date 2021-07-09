import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import promise from "redux-promise-middleware";

const middleware = process.env.NODE_ENV === "production"
    ? applyMiddleware(promise, thunk)
    : applyMiddleware(promise, thunk, logger);

export default middleware;
