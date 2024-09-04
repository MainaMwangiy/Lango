import { combineReducers } from "redux";
import { actions } from "../actions";

const initialState = {
    showLocationCards: false,
    openNotification: false
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_LOCATION_CARDS:
            return { ...state, showLocationCards: true };
        case actions.CLOSE_LOCATION_CARDS:
            return { ...state, showLocationCards: false };
        case actions.LOAD_NOTIFICATION:
            return { ...state, openNotification: true };
        default:
            return state;
    }
};

const reducers = combineReducers({
    location: locationReducer,
});

export default reducers;
