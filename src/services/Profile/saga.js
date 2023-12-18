import { GET_PROFILE_DETAILS, getProfileDeatilsSuccess, UPDATE_PROFILE,updateProfileSuccess,updateProfileFail} from "./action";
import { put, takeLatest, call } from 'redux-saga/effects';
import {  postApiToken } from "../Api";
import { apis } from "../apiConfig";

function* getProfileData(data) {
    let object = {
        url: `${apis.getProfileData}`,
        method: "POST",
        body:data.data.data,
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("Get Profile Response=>",result)
        if (result.status == 'Success') {
            yield put(getProfileDeatilsSuccess(result.data))
        }
        else {
            console.log("getProfileSaga Failed")
        }
    }
    catch (error) {
        console.log("Error in Get Profile", error)
    }

}
export function* getProfileSaga() {
    yield takeLatest(GET_PROFILE_DETAILS, getProfileData)
}


function* updateProfile(data) {
    const object = {
        url: `${apis.updateProfile}`,
        body: data.data.data,
        method: "PUT",
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("PROFILE RESPONSE==>", result)
        if (result.status == 'Success') {
            const response = {
                data: result.data,
                token: data.data.token
            }
            yield put(updateProfileSuccess(response))

        }
        else {
            let error_type = ''
            if (result.status == 'User Found') {
                error_type = 'email'
            }
            else if (result.status == 'Fail') {
                error_type = result.messaage
            }
            const response = {
                isUpdated: false,
                error_type: error_type
            }
            yield put(updateProfileFail(response))
            console.log("profileDetailsSaga Failed")
        }
    }
    catch (error) {
        console.log("Error in Profile Details", error)
    }

}
export function* profileDetailsSaga() {
    yield takeLatest(UPDATE_PROFILE, updateProfile)
}