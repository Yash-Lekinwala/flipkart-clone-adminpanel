import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import { combineReducers } from "redux";
import categoryReducer from "./category.reducers";
import productReducer from "./product.reducers";
import pageReducer from "./page.reducers";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    page: pageReducer
});

export default rootReducer;