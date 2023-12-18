import { REGISTRATION_DETAILS ,registrationSuccess, registrationFail} from "./action";
import { put, takeLatest, call } from 'redux-saga/effects';
import { postApi } from "../Api";
import {apis} from '../apiConfig'

function* registration(data) {
    let object = {
        url: `${apis.registration}`,
        body: data.data,
        method: "POST"
    }

    try {
        const result = yield call(postApi, object)
        console.log("REGISTER RESPONSE==>", result)
        if (result.status == 'Success') {
            const response = {
                data: result.data,
                isRegistered: true,
                token: result.token
            }
            yield put(registrationSuccess(response))
           
        }
        else {
            let error_type=''
            if (result.status == 'User Found') {
               error_type='email'
            }
            else if(result.status=='Fail')
            {
                error_type=result.messaage
            }
            const response = {
                isRegistered: false,
                error_type:error_type
            }
            yield put(registrationFail(response))
            console.log("RegisterSagaFailed")
        }
    }
    catch (error) {
        console.log("Error in Register", error)
    }

}
export default function* registrationSaga() {
    yield takeLatest(REGISTRATION_DETAILS, registration)
}