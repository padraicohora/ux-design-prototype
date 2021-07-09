import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import PublicRoutes from "./components/PublicRoutes";
import reducers from "./store";
import middleware from "./store/middleware";
import Loader from "./components/_common_/components/Loader";

const store = createStore(reducers, middleware);

ReactDOM.render(
        <Provider store={store}>
        <Suspense fallback={<Loader className="position-absolute vh-100 col-sm-12 col-xl-12"/>}>
            <PublicRoutes />
        </Suspense>
    </Provider>
    , document.getElementById("app"),
);
