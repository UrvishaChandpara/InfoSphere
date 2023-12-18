import { GET_ALL_BILLS_FOR_INVOICE, getAllBillsForInvoiceSuccess, getAllBillsForInvoiceFail, ADD_INVOICE, addInvoiceSuccess, addInvoiceFail, GET_INVOCIE, GET_ALL_INVOICES, getAllInvoicesFail, getAllInvoicesSuccess, removeInvoiceSuccess, removeInvoiceFail, REMOVE_INVOICE, getInvoiceSuccess, getInvoiceFail, updatePayStatusSuccess, updatePayStatusFail, UPDATE_PAY_STATUS } from './action'
import { put, takeLatest, call } from 'redux-saga/effects';
import {  postApiToken } from "../Api";
import { apis } from '../apiConfig';

function* getInvoiceBill(data) {
    let object = {
        url: `${apis.getInvoiceBills}`,
        method: "POST",
        body: data.data.data,
        token: data.data.token,

    }
    try {
        const result = yield call(postApiToken, object)
        console.log("All Bills For Invoice Response => ", result)
        if (result.status == 'Success') {
            yield put(getAllBillsForInvoiceSuccess({ bills: result.bills, customer: result.customer }))
        }
        else if (result.status == 'Not Found') {

            const response = {
                error_type: 'bills',
                customer: result.customer
            }
            yield put(getAllBillsForInvoiceFail(response))
        }
    }

    catch (error) {
        console.log("Error in Get All Bills For Invoice", error)
    }

}

export function* getInvoiceBillSaga() {
    yield takeLatest(GET_ALL_BILLS_FOR_INVOICE, getInvoiceBill)
}

function* getAllInvoices(data) {
    let object = {
        url: `${apis.getAllInvoices}`,
        method: "POST",
        body: data.data.data,
        token: data.data.token,

    }
    try {
        const result = yield call(postApiToken, object)
        console.log("All Invoices Response => ", result)
        if (result.status == 'Success') {
            yield put(getAllInvoicesSuccess(result.data))
        }
        else if (result.status == 'Not Found') {

            const response = {
                error_type: 'invoices'
            }
            yield put(getAllInvoicesFail(response))
        }
    }

    catch (error) {
        console.log("Error in Get All Invoices", error)
    }

}

export function* getAllInvoicesSaga() {
    yield takeLatest(GET_ALL_INVOICES, getAllInvoices)
}


function* getInvoice(data) {
    let object = {
        url: `${apis.getInvoice}`,
        method: "POST",
        body: data.data.data,
        token: data.data.token,

    }
    try {
        const result = yield call(postApiToken, object)
        console.log("GET Invoice Response => ", result)
        if (result.status == 'Success') {
            yield put(getInvoiceSuccess(result.data))
        }
        else if (result.status == 'Not Found') {

            const response = {
                error_type: 'invoice'
            }
            yield put(getInvoiceFail(response))
        }
    }

    catch (error) {
        console.log("Error in Get Invoice", error)
    }

}

export function* getInvoiceSaga() {
    yield takeLatest(GET_INVOCIE, getInvoice)
}

function* addInvoice(data) {
    const object = {
        url: `${apis.addInvoice}`,
        body: data.data.data,
        method: "POST",
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("INVOICE ADD RESPONSE==>", result)
        if (result.status == 'Success') {
            yield put(addInvoiceSuccess(result.data))

        }
        else {
            yield put(addInvoiceFail())
            console.log("addInvoiceSaga Failed")
        }
    }
    catch (error) {
        console.log("Error in Add Invoice", error)
    }

}
export function* addInvoiceSaga() {
    yield takeLatest(ADD_INVOICE, addInvoice)
}


function* updateStatus(data) {
    const object = {
        url: `${apis.updatePayStatus}`,
        body: data.data.data,
        method: "PUT",
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("PAY STATUS UPDATE RESPONSE==>", result)
        if (result.status == 'Success') {
            yield put(updatePayStatusSuccess(result.data))

        }
        else {
            
            yield put(updatePayStatusFail('Fail'))
            console.log("updateStatusSaga Failed")
        }
    }
    catch (error) {
        console.log("Error in UPDATE PAY STATUS", error)
    }

}
export function* updateStatusSaga() {
    yield takeLatest(UPDATE_PAY_STATUS, updateStatus)
}


function* removeInvoice(data) {
    const object = {
        url: `${apis.removeInvoice}`,
        body: data.data.data,
        method: "DELETE",
        token: data.data.token
    }

    try {
        const result = yield call(postApiToken, object)
        console.log("INVOICE REMOVE RESPONSE==>", result)
        if (result.status == 'Success') {
            yield put(removeInvoiceSuccess())

        }
        else {
            let error_type = ''
            if (result.status == 'Not Found') {
                error_type = 'invoice'
            }
            else
            {
                error_type=result.status
            }
            const response = {
                error_type: error_type
            }
            yield put(removeInvoiceFail(response))
            console.log("removeInvoiceSaga Failed")
        }
    }
    catch (error) {
        console.log("Error in Remove Invoice", error)
    }

}
export function* removeInvoiceSaga() {
    yield takeLatest(REMOVE_INVOICE, removeInvoice)
}