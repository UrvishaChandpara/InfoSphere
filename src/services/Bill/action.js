export const GET_ALL_BILLS = "get_all_bills"
export const GET_ALL_BILLS_SUCCESS = "get_all_bills_success"
export const GET_ALL_BILLS_FAIL = "get_all_bills_fail"
export const NO_BILLS_FOUND = "no_bills_found"
export const GET_BILL = "get_bill"
export const GET_BILL_SUCCESS = "get_bill_success"
export const GET_BILL_FAIL = "get_bill_fail"
export const ADD_BILL = "add_bill"
export const ADD_BILL_SUCCESS = "add_bill_success"
export const ADD_BILL_FAIL = "add_bill_fail"
export const UPDATE_BILL = "update_bill"
export const UPDATE_BILL_SUCCESS = "update_bill_success"
export const UPDATE_BILL_FAIL = "update_bill_fail"
export const REMOVE_BILL = "remove_bill"
export const REMOVE_BILL_SUCCESS = "remove_bill_success"
export const REMOVE_BILL_FAIL = "remove_bill_fail"

export const getAllBills = (data) => {
    return {
        type: GET_ALL_BILLS,
        data
    }
}
export const getAllBillsSuccess = (data) => {
    return {
        type: GET_ALL_BILLS_SUCCESS,
        data
    }
}
export const noBillsFound = (data) => {
    return {
        type: NO_BILLS_FOUND,
        data
    }
}
export const getAllBillsFail = (data) => {
    return {
        type: GET_ALL_BILLS_FAIL,
        data
    }
}
export const getBill = (data) => {
    return {
        type: GET_BILL,
        data
    }
}
export const getBillSuccess = (data) => {
    return {
        type: GET_BILL_SUCCESS,
        data
    }
}
export const getBillFail = (data) => {
    return {
        type: GET_BILL_FAIL,
        data
    }
}
export const addBill = (data) => {
    return {
        type: ADD_BILL,
        data
    }
}
export const addBillSuccess = (data) => {
    return {
        type: ADD_BILL_SUCCESS,
        data
    }
}
export const addBillFail = (data) => {
    return {
        type: ADD_BILL_FAIL,
        data
    }
}
export const updateBill = (data) => {
    return {
        type: UPDATE_BILL,
        data
    }
}
export const updateBillSuccess = (data) => {
    return {
        type: UPDATE_BILL_SUCCESS,
        data
    }
}
export const updateBillFail = (data) => {
    return {
        type: UPDATE_BILL_FAIL,
        data
    }
}
export const removeBill = (data) => {
    return {
        type: REMOVE_BILL,
        data
    }
}
export const removeBillSuccess = (data) => {
    return {
        type: REMOVE_BILL_SUCCESS,
        data
    }
}
export const removeBillFail = (data) => {
    return {
        type: REMOVE_BILL_FAIL,
        data
    }
}

