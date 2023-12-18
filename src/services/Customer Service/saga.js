import {GET_ALL_CUSTOMER_SERVICES, getAllCustomerServicesSuccess, ADD_CUSTOMER_SERVICE, addCustomerServiceFail, REMOVE_CUSTOMER_SERVICE, removeCustomerServiceSuccess, removeCustomerServiceFail, getAllCustomerServicesFail, addCustomerServiceSuccess } from "./action";

import { put, takeLatest, call } from 'redux-saga/effects';
import { postApiToken } from "../Api";
import { apis } from "../apiConfig";

function* getAllCustomerServices(data) {
    let object = {
        url: `${apis.getAllCustomerServices}`,
        method: "POST",
        body: data.data.data,
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("All Customer Services Response => ",result.data)
        if (result.status == 'Success') {
            yield put(getAllCustomerServicesSuccess(result.data))
        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'customerServices'
            }
            yield put(getAllCustomerServicesFail(error_type))
        }
    }
    catch (error) {
        console.log("Error in Get All Customer Services", error)
    }

}
export function* getAllCustomerServiceSaga() {
    yield takeLatest(GET_ALL_CUSTOMER_SERVICES, getAllCustomerServices)
}

function* addCustomerServices(data) {
    let object = {
        url: `${apis.addCustomerServices}`,
        body: data.data.data,
        method: "POST",
        token: data.data.token
    }
    try {
        const result = yield call(postApiToken, object)
        console.log("Add Customer Service Response => ",result)
        if (result.status == 'Success') {
            yield put(addCustomerServiceSuccess(true))
        }
        else {
            let error_type = ''
            if (result.status == 'Customer Service Found') {
                error_type = 'customerService'
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(addCustomerServiceFail(response))
        }
    }
    catch (error) {
        console.log("Error in Add Customer Service", error)
    }
}
export function* addCustomerServiceSaga() {
    yield takeLatest(ADD_CUSTOMER_SERVICE, addCustomerServices)
}


function* removeCustomerService(data) {
    let object = {
        url: `${apis.removeCustomerService}`,
        method: "DELETE",
        body: data.data.data,
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("Customer Service Delete Response => ",result)
        if (result.status == 'Success') {
            yield put(removeCustomerServiceSuccess(true))
        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'customerService'
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(removeCustomerServiceFail(response))
        }
    }
    catch (error) {
        console.log("Error in Delete Customer Service", error)
    }

}
export function* removeCustomerServiceSaga() {
    yield takeLatest(REMOVE_CUSTOMER_SERVICE, removeCustomerService)
}
