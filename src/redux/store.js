import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import appReducer from './reducers/index';
// import { createHashHistory } from "history";
import { thunk } from "redux-thunk";

const reducers = combineReducers({
    appReducer: appReducer
});


// const history = createHashHistory();

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
// const enhancer = composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)));

const store = createStore(
    reducers,
    enhancer
);


export { store };
// export { store, history };