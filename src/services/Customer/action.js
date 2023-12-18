export const GET_ALL_CUSTOMERS = "get_all_customers"
export const GET_ALL_CUSTOMERS_SUCCESS = "get_all_customers_success"
export const GET_ALL_CUSTOMERS_FAIL = "get_all_customers_fail"
export const GET_CUSTOMER = "get_customer"
export const GET_CUSTOMER_SUCCESS = "get_customer_success"
export const GET_CUSTOMER_FAIL = "get_customer_fail"
export const ADD_CUSTOMER = "add_customer"
export const ADD_CUSTOMER_SUCCESS = "add_customer_success"
export const ADD_CUSTOMER_FAIL = "add_customer_fail"
export const UPDATE_CUSTOMER = "update_customer"
export const UPDATE_CUSTOMER_SUCCESS = "update_customer_success"
export const UPDATE_CUSTOMER_FAIL = "update_customer_fail"
export const REMOVE_CUSTOMER = "remove_customer"
export const REMOVE_CUSTOMER_SUCCESS = "remove_customer_success"
export const REMOVE_CUSTOMER_FAIL = "remove_customer_fail"
export const HANDLE_ERROR = "handle_error"


export const getAllCustomers = (data) => {
    return {
        type: GET_ALL_CUSTOMERS,
        data
    }
}
export const getAllCustomersSuccess = (data) => {
    return {
        type: GET_ALL_CUSTOMERS_SUCCESS,
        data
    }
}
export const getAllCustomersFail = (data) => {
    return {
        type: GET_ALL_CUSTOMERS_FAIL,
        data
    }
}
export const getCustomer = (data) => {
    return {
        type: GET_CUSTOMER,
        data
    }
}
export const getCustomerSuccess = (data) => {
    return {
        type: GET_CUSTOMER_SUCCESS,
        data
    }
}
export const getCustomerFail = (data) => {
    return {
        type: GET_CUSTOMER_FAIL,
        data
    }
}
export const addCustomer = (data) => {
    return {
        type: ADD_CUSTOMER,
        data
    }
}
export const addCustomerSuccess = (data) => {
    return {
        type: ADD_CUSTOMER_SUCCESS,
        data
    }
}
export const addCustomerFail = (data) => {
    return {
        type: ADD_CUSTOMER_FAIL,
        data
    }
}
export const updateCustomer = (data) => {
    return {
        type: UPDATE_CUSTOMER,
        data
    }
}
export const updateCustomerSuccess = (data) => {
    return {
        type: UPDATE_CUSTOMER_SUCCESS,
        data
    }
}
export const updateCustomerFail = (data) => {
    return {
        type: UPDATE_CUSTOMER_FAIL,
        data
    }
}
export const removeCustomer = (data) => {
    return {
        type: REMOVE_CUSTOMER,
        data
    }
}
export const removeCustomerSuccess = (data) => {
    return {
        type: REMOVE_CUSTOMER_SUCCESS,
        data
    }
}
export const removeCustomerFail = (data) => {
    return {
        type: REMOVE_CUSTOMER_FAIL,
        data
    }
}
export const handleError = (data) => {
    return {
        type: HANDLE_ERROR
    }
}