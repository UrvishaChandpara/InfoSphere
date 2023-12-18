import {GET_ALL_SERVICES, getAllServicesSuccess, addServiceSuccess, ADD_SERVICE, addServiceFail, UPDATE_SERVICE, updateServiceSuccess, updateServiceFail, getAllServicesFail } from "./action";
import { put, takeLatest, call } from 'redux-saga/effects';
import {  postApiToken} from "../Api";
import { apis } from "../apiConfig";
function* getAllServices(data) {
    let object = {
        url: `${apis.getAllServices}`,
        method: "POST",
        body:data.data.data,
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("All Service Response => ",result)
        if (result.status == 'Success') {
            yield put(getAllServicesSuccess(result.data))
        }
        else {

            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'serivces'
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(getAllServicesFail(response))
        }
    }
    catch (error) {
        console.log("Error in Get All Services", error)
    }

}
export function* getAllServiceSaga() {
    yield takeLatest(GET_ALL_SERVICES, getAllServices)
}

function* addService(data) {
    let object = {
        url: `${apis.addService}`,
        body: data.data.data,
        method: "POST",
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("Add Service Response => ",result)
        if (result.status == 'Success') {
            yield put(addServiceSuccess(true))
        }
        else {
            let error_type = ''
            if (result.status == 'Service Found') {
                error_type = 'service'
            }
            else if (result.status == 'Not Found') {
                error_type = 'register_customer'
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(addServiceFail(response))
        }
    }
    catch (error) {
        console.log("Error in Add Service", error)
    }
}
export function* addServiceSaga() {
    yield takeLatest(ADD_SERVICE, addService)
}


function* updateService(data) {
    const object = {
        url: `${apis.updateService}`,
        body: data.data.data,
        method: "PUT",
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("UPDATE SERVICE RESPONSE==>", result)
        if (result.status == 'Success') {
            yield put(updateServiceSuccess(true))
        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'service not found'
            }
            else if(result.status == 'Service Found')
            {
                error_type = 'service'
            }
            else if (result.status == 'Fail') {
                error_type = result.messaage
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(updateServiceFail(response))
        }
    }
    catch (error) {
        console.log("Error in Service Update", error)
    }

}
export function* updateServiceSaga() {
    yield takeLatest(UPDATE_SERVICE, updateService)
}