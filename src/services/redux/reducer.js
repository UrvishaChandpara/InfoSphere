import { combineReducers } from "redux";
import { RegistrationReducer } from "../Registration/reducer";
import { LoginReducer } from "../Login/reducer";
import { ProfileReducer } from "../Profile/reducer";
import { ServiceReducer } from "../Service/reducer";
import { SubServiceReducer } from "../Sub Service/reducer";
import { CustomerReducer } from "../Customer/reducer";
import { CustomerServiceReducer } from "../Customer Service/reducer";
import {BillReducer} from '../Bill/reducer'
import {InvoiceReducer} from '../Invoice/reducer'

const appReducer = combineReducers({
    RegistrationReducer,
    LoginReducer,
    ProfileReducer,
    ServiceReducer,
    SubServiceReducer,
    CustomerReducer,
    CustomerServiceReducer,
    BillReducer,
    InvoiceReducer
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer
