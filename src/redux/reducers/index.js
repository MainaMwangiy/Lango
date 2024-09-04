import { combineReducers } from "redux";
import { actions } from "../actions";

const initialState = {
    showLocationCards: false,
    openNotification: false,
    user: {}
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_LOCATION_CARDS:
            return { ...state, showLocationCards: true };
        case actions.CLOSE_LOCATION_CARDS:
            return { ...state, showLocationCards: false };
        case actions.LOAD_NOTIFICATION:
            return { ...state, openNotification: true };
        case actions.LOAD_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

const reducers = combineReducers({
    location: locationReducer,
});

export default reducers;
