import authReducer from "./auth.reducers";
import userReducer from "./user.reducers";
import { combineReducers } from "redux";
import categoryReducer from "./category.reducers";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer
});

export default rootReducer;