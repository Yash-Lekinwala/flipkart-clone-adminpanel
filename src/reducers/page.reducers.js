import { pageConstants } from "../actions/constants";

const initState = {
    error: null,
    loading:false,
    page: {}
}

const pageReducer = (state = initState, action) => {
    switch (action.type) {
        case pageConstants.CREATE_PAGE_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case pageConstants.CREATE_PAGE_SUCCESS:
            return state = {
                loading: false
            }
        case pageConstants.CREATE_PAGE_FAILURE:
            return state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            
        default:
            return state;
    }
}

export default pageReducer;