


import {
    AUTH_FAIL,
    AUTH_START,
    AUTH_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_START,
    LOGOUT_SUCCESS,
} from './action';
const initialState = {
    isLoading: false,
    isLoggedIn: false,
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    error: null,
}

const ReducerCheckout = (state = initialState, {type , payload}) => {
        switch (type) {
            case AUTH_START:
            case LOGOUT_START:
                return {
                    ...state,
                    isLoading: true,
                };
            case AUTH_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    isLoggedIn: true,
                    currentUser: payload,
                };
            case AUTH_FAIL:
                return {
                    ...state,
                    isLoggedIn: false,
                    currentUser: null,
                    isLoading: false,
                    error: payload,
                };
            case LOGOUT_SUCCESS:
                return {
                    ...initialState,
                };
            case LOGOUT_FAIL: {
                return {
                    ...state,
                    isLoading: false,
                    error: payload,
                };
            } 
        default:
            return state;
    }
}

export default ReducerCheckout;