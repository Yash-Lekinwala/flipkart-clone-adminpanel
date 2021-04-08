import { productConstants } from "../actions/constants";

const initialState = {
    products: [],

}

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case productConstants.PRODUCT_SUCCESS:
            return state = {
                ...state,
                products: action.payload.products
            }    
        default:
            return state;
    }
}

export default ProductReducer;