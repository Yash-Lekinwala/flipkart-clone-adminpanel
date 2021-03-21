import { authConstants } from "../actions/constants"

const authReducer = (state = {authData: null}, action) => {
    switch(action.type) {
        case authConstants.LOGIN_REQUEST:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action?.data}
        case authConstants.LOGOUT_REQUEST:
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state;
    }
}

export default authReducer;