import { combineReducers } from "redux";
import usersReducer from "./Reducers/reducer";
import OurServicesReducer from "./Reducers/OurServicesReducer";
import OurProductsReducer from "./Reducers/OurProductsReducer";

const rootReducer = combineReducers({
    // registerData: usersReducer,
    // loginData: usersReducer,
    // logoutData: usersReducer,
    // data: usersReducer,
    userDetails: usersReducer,
    // changePass: usersReducer,
    serviceData: OurServicesReducer,
    productsDetail : OurProductsReducer,
})

export default rootReducer;
