import {GET_ALL_SUB_SERVICES, getAllSubServicesSuccess, addSubServiceSuccess, ADD_SUB_SERVICE, addSubServiceFail, UPDATE_SUB_SERVICE, updateSubServiceSuccess, updateSubServiceFail, getAllSubServicesFail } from "./action";
import { put, takeLatest, call } from 'redux-saga/effects';
import { postApiToken } from "../Api";
import { apis } from "../apiConfig";
function* getAllSubServices(data) {
    let object = {
        url: `${apis.getAllSubServices}`,
        method: "POST",
        body:data.data.data,
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("All Sub Service Response => ",result)
        if (result.status == 'Success') {
            yield put(getAllSubServicesSuccess(result.data))
        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'sub serivces'
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(getAllSubServicesFail(response))
        }
    }
    catch (error) {
        console.log("Error in Get All Sub Services", error)
    }

}
export function* getAllSubServiceSaga() {
    yield takeLatest(GET_ALL_SUB_SERVICES, getAllSubServices)
}

function* addSubService(data) {
    let object = {
        url: `${apis.addSubService}`,
        body: data.data.data,
        method: "POST",
        token: data.data.token
    }
    console.log(object)

    try {
        const result = yield call(postApiToken, object)
        console.log("Add Sub Service Response => ",result)
        if (result.status == 'Success') {
            yield put(addSubServiceSuccess(true))
        }
        else {
            let error_type = ''
            if (result.status == 'Sub Service Found') {
                error_type = 'subservice'
            }
            else if (result.status == 'Not Found') {
                error_type = 'service'
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(addSubServiceFail(response))
        }
    }
    catch (error) {
        console.log("Error in Add Sub Service", error)
    }
}
export function* addSubServiceSaga() {
    yield takeLatest(ADD_SUB_SERVICE, addSubService)
}


function* updateSubService(data) {
    const object = {
        url: `${apis.updateSubService}`,
        body: data.data.data,
        method: "PUT",
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("UPDATE SUB SERVICE RESPONSE==>", result)
        if (result.status == 'Success') {
            yield put(updateSubServiceSuccess(true))
        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'service not found'
            }
            else if(result.status == 'Sub Service Found')
            {
                error_type = 'subservice'
            }
            else if (result.status == 'Fail') {
                error_type = result.messaage
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(updateSubServiceFail(response))
        }
    }
    catch (error) {
        console.log("Error in Sub Service Update", error)
    }

}
export function* updateSubServiceSaga() {
    yield takeLatest(UPDATE_SUB_SERVICE, updateSubService)
}