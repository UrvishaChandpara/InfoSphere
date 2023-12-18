import {GET_ALL_CUSTOMERS, getAllCustomersSuccess, addCustomerSuccess, ADD_CUSTOMER, addCustomerFail, UPDATE_CUSTOMER, updateCustomerSuccess, updateCustomerFail,GET_ALL_CUSTOMERS_FAIL,GET_CUSTOMER,getCustomerSuccess,getCustomerFail, REMOVE_CUSTOMER, removeCustomerSuccess, removeCustomerFail, getAllCustomersFail } from "./action";
import { put, takeLatest, call } from 'redux-saga/effects';
import { postApiToken} from "../Api";
import { apis } from "../apiConfig";

function* getAllCustomers(data) {
    let object = {
        url: `${apis.getAllCustomers}`,
        method: "POST",
        body:data.data.data,
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("All Customer Response => ",result)
        if (result.status == 'Success') {
            yield put(getAllCustomersSuccess(result.data))
        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'customers'
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(getAllCustomersFail(response))
        }
    }
    catch (error) {
        console.log("Error in Get All Customers", error)
    }

}
export function* getAllCustomerSaga() {
    yield takeLatest(GET_ALL_CUSTOMERS, getAllCustomers)
}

function* getCustomer(data) {
    let object = {
        url: `${apis.getCustomer}`,
        method: "POST",
        body:data.data.data,
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("get Customer Response => ",result)
        if (result.status == 'Success') {
            yield put(getCustomerSuccess(result.data))
        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'customer'
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(getCustomerFail(response))
            console.log("getCustomerSaga Failed")
        }
    }
    catch (error) {
        console.log("Error in Get All Customers", error)
    }

}
export function* getCustomerSaga() {
    yield takeLatest(GET_CUSTOMER, getCustomer)
}

function* addCustomer(data) {
    let object = {
        url: `${apis.addCustomer}`,
        body: data.data.data,
        method: "POST",
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("Add Customer Response => ",result)
        if (result.status == 'Success') {
            yield put(addCustomerSuccess(true))
        }
        else {
            let error_type = ''
            if (result.status == 'Customer Found') {
                error_type = 'email'
            }
            else if (result.status == 'Not Found') {
                error_type = 'register_customer'
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(addCustomerFail(response))
        }
    }
    catch (error) {
        console.log("Error in Add Customer", error)
    }
}
export function* addCustomerSaga() {
    yield takeLatest(ADD_CUSTOMER, addCustomer)
}


function* updateCustomer(data) {
    const object = {
        url: `${apis.updateCustomer}`,
        body: data.data.data,
        method: "PUT",
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("UPDATE CUSTOMER RESPONSE==>", result)
        if (result.status == 'Success') {
            yield put(updateCustomerSuccess(true))
        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'customer'
            }
            else if(result.status == 'email_id Found')
            {
                error_type = 'email'
            }
            else if (result.status == 'Register Customer Not Found') {
                error_type = 'register_customer'
            }
            else
            {
                error_type=result.message
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(updateCustomerFail(response))
        }
    }
    catch (error) {
        console.log("Error in Customer Update", error)
    }

}
export function* updateCustomerSaga() {
    yield takeLatest(UPDATE_CUSTOMER, updateCustomer)
}

function* removeCustomer(data) {
    let object = {
        url: `${apis.removeCustomer}`,
        method: "DELETE",
        body: data.data.data,
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("Customer Delete Response => ",result)
        if (result.status == 'Success') {
            yield put(removeCustomerSuccess())
        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'customer'
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(removeCustomerFail(response))
        }
    }
    catch (error) {
        console.log("Error in Delete Customers", error)
    }

}
export function* removeCustomerSaga() {
    yield takeLatest(REMOVE_CUSTOMER, removeCustomer)
}
