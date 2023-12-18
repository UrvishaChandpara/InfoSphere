import { LOGIN_DETAILS, loginSuccess, loginFail } from "./action";
import { put, takeLatest, call } from 'redux-saga/effects';
import {postApi } from "../Api";
import { apis } from "../apiConfig";


function* login(data) {
    let object = {
        url: `${apis.login}`,
        body:data.data.data,
        method: "POST"
    }
    try {
        const result = yield call(postApi, object)
        console.log("LOGIN RESPONSE==>", result)
        if (result.status == 'Success') {
            const response = {
                data: result.data,
                isLoggedIn: true,
                token: result.token
            }
            yield put(loginSuccess(response))

        }
        else {
            let error_type=''
            if (result.status == 'Unauthorized') {
               error_type='password'
            }
            else if(result.status=='Not Found')
            {
                error_type='email'
            }
            const response = {
                isLoggedIn: false,
                error_type:error_type
            }
            yield put(loginFail(response))
            console.log("LoginSagaFailed")
        }
    }
    catch (error) {
        console.log("Error in Login", error)
    }

}
export default function* loginSaga() {
    yield takeLatest(LOGIN_DETAILS, login)
}