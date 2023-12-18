import { GET_ALL_BILLS, getAllBillsSuccess, ADD_BILL, addBillFail, removeBillFail, removeBillSuccess, getAllBillsFail, addBillSuccess, REMOVE_BILL, noBillsFound, getBillSuccess, getBillFail, GET_BILL, UPDATE_BILL, updateBillFail ,updateBillSuccess} from "./action";

import { put, takeLatest, call} from 'redux-saga/effects';
import { postApiToken} from "../Api";
import { apis } from "../apiConfig";

function* getAllBill(data) { 

    let object = {
        url: `${apis.getAllBills}`,
        method: "POST",
        body: data.data.data,
        token: data.data.token
    }
    try {
        const result = yield call(postApiToken, object)
        console.log("All Bills Response => ", result)
        if (result.status == 'Success') {
            yield put(getAllBillsSuccess(result.data))
        }
        else if (result.status == 'Not Found') {

            const response = {
                isRegistered: false,
                error_type: result.message
            }
            yield put(getAllBillsFail(response))
        }
        else if (result.status == 'Bills Not Found') {
            const response = {
                isRegistered: false,
                error_type: result.message,
                service: result.data.service,
                sub_service: result.data.subService,
            }
            yield put(noBillsFound(response))
        }
    }

    catch (error) {
        console.log("Error in Get All Bills", error)
    }

}
export function* getAllBillSaga() {
    yield takeLatest(GET_ALL_BILLS, getAllBill)
}

function* getBill(data) {
    let object = {
        url: `${apis.getBill}`,
        method: "POST",
        body:data.data.data,
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("Bill Response => ",result)
        if (result.status == 'Success') {
            yield put(getBillSuccess(result.data))
        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'bill'
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(getBillFail(response))
            console.log("getBill Failed")
        }
    }
    catch (error) {
        console.log("Error in Get Bill", error)
    }

}
export function* getBillSaga() {
    yield takeLatest(GET_BILL, getBill)
}

function* addBills(data) {
    let object = {
        url: `${apis.addBill}`,
        body: data.data.data,
        method: "POST",
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("Add Bill Response => ",result)
        if (result.status == 'Success') {
            yield put(addBillSuccess(true))
        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'service'
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(addBillFail(response))
        }
    }
    catch (error) {
        console.log("Error in Add Bill", error)
    }
}
export function* addBillSaga() {
    yield takeLatest(ADD_BILL, addBills)
}


function* updateBill(data) {
    const object = {
        url: `${apis.updateBill}`,
        body: data.data.data,
        method: "PUT",
        token: data.data.token
    }
    try {
        const result = yield call(postApiToken, object)
        console.log("UPDATE CUSTOMER RESPONSE==>", result)
        if (result.status == 'Success') {
            yield put(updateBillSuccess(true))
        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'bill'
            }
            else if(result.status == 'Fail')
            {
                error_type = result.message
            }
            const response = {
                isRegistered: false,
                error_type: error_type
            }
            yield put(updateBillFail(response))
        }
    }
    catch (error) {
        console.log("Error in Bill  Update", error)
    }

}
export function* updateBillSaga() {
    yield takeLatest(UPDATE_BILL, updateBill)
}

function* removeBill(data) {
    let object = {
        url: `${apis.removeBill}`,
        method: "DELETE",
        body: data.data.data,
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("Bills Delete Response => ", result)
        if (result.status == 'Success') {
            yield put(removeBillSuccess())
        }
        else if (result.status == 'Bills Not Found') {
            const response = {
                isRegistered: false,
                error_type: result.message,
                data:result.data
            }
            yield put(noBillsFound(response))
        }
        else if (result.status == 'Not Found') {
            const response = {
                isRegistered: false,
                error_type: 'bill'
            }
            yield put(removeBillFail(response))
        }
    }
    catch (error) {
        console.log("Error in Delete Bill", error)
    }

}
export function* removeBillSaga() {
    yield takeLatest(REMOVE_BILL, removeBill)
}
