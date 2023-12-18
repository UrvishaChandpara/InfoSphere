export const GET_ALL_BILLS_FOR_INVOICE = "get_all_bills_for_invoice"
export const GET_ALL_BILLS_FOR_INVOICE_SUCCESS = "get_all_bills_for_invoice_success"
export const GET_ALL_BILLS_FOR_INVOICE_FAIL = "get_all_bills_for_invoice_fail"
export const NO_BILLS_FOUND = "no_bills_found"
export const GET_ALL_INVOICES = "get_all_invoices"
export const GET_ALL_INVOICES_SUCCESS = "get_all_invoices_success"
export const GET_ALL_INVOICES_FAIL = "get_all_invoices_fail"
export const GET_INVOCIE = "get_invoice"
export const GET_INVOCIE_SUCCESS = "get_invoice_success"
export const GET_INVOCIE_FAIL = "get_invoice_fail"
export const ADD_INVOICE = "add_invoice"
export const ADD_INVOICE_SUCCESS = "add_invoice_success"
export const ADD_INVOICE_FAIL = "add_invoice_fail"
export const REMOVE_INVOICE = "remove_invoice"
export const REMOVE_INVOICE_SUCCESS = "remove_invoice_success"
export const REMOVE_INVOICE_FAIL = "remove_invoice_fail"
export const UPDATE_PAY_STATUS = "update_pay_status"
export const UPDATE_PAY_STATUS_SUCCESS = "update_pay_status_success"
export const UPDATE_PAY_STATUS_FAIL = "update_pay_status_fail"
export const RESET_VALUE="reset_value"

export const getAllBillsForInvoice = (data) => {
    return {
        type: GET_ALL_BILLS_FOR_INVOICE,
        data
    }
}
export const getAllBillsForInvoiceSuccess = (data) => {
    return {
        type: GET_ALL_BILLS_FOR_INVOICE_SUCCESS,
        data
    }
}
export const getAllBillsForInvoiceFail = (data) => {
    return {
        type: GET_ALL_BILLS_FOR_INVOICE_FAIL,
        data
    }
}
export const addInvoice = (data) => {
    return {
        type: ADD_INVOICE,
        data
    }
}
export const addInvoiceSuccess = (data) => {
    return {
        type: ADD_INVOICE_SUCCESS,
        data
    }
}
export const addInvoiceFail = (data) => {
    return {
        type: ADD_INVOICE_FAIL,
        data
    }
}
export const removeInvoice = (data) => {
    return {
        type: REMOVE_INVOICE,
        data
    }
}
export const removeInvoiceSuccess = (data) => {
    return {
        type: REMOVE_INVOICE_SUCCESS,
        data
    }
}
export const removeInvoiceFail = (data) => {
    return {
        type: REMOVE_INVOICE_FAIL,
        data
    }
}
export const getInvoice = (data) => {
    return {
        type: GET_INVOCIE,
        data
    }
}
export const getInvoiceSuccess = (data) => {
    return {
        type: GET_INVOCIE_SUCCESS,
        data
    }
}
export const getInvoiceFail = (data) => {
    return {
        type: GET_INVOCIE_FAIL,
        data
    }
}
export const getAllInvoices = (data) => {
    return {
        type: GET_ALL_INVOICES,
        data
    }
}
export const getAllInvoicesSuccess = (data) => {
    return {
        type: GET_ALL_INVOICES_SUCCESS,
        data
    }
}
export const getAllInvoicesFail = (data) => {
    return {
        type: GET_ALL_INVOICES_FAIL,
        data
    }
}
export const updatePayStatus = (data) => {
    return {
        type: UPDATE_PAY_STATUS,
        data
    }
}
export const updatePayStatusSuccess = (data) => {
    return {
        type:UPDATE_PAY_STATUS_SUCCESS,
        data
    }
}
export const updatePayStatusFail = (data) => {
    return {
        type: UPDATE_PAY_STATUS_FAIL,
        data
    }
}
export const resetValue = (data) => {
    return {
        type: RESET_VALUE
    }
}