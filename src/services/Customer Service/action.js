export const GET_ALL_CUSTOMER_SERVICES = "get_all_customer_services"
export const GET_ALL_CUSTOMER_SERVICES_SUCCESS = "get_all_customer_services_success"
export const GET_ALL_CUSTOMER_SERVICES_FAIL = "get_all_customer_services_fail"
export const GET_CUSTOMER_SERVICE = "get_customer_service"
export const GET_CUSTOMER_SERVICE_SUCCESS = "get_customer_service_success"
export const GET_CUSTOMER_SERVICE_FAIL = "get_customer_service_fail"
export const ADD_CUSTOMER_SERVICE = "add_customer_service"
export const ADD_CUSTOMER_SERVICE_SUCCESS = "add_customer_service_success"
export const ADD_CUSTOMER_SERVICE_FAIL = "add_customer_service_fail"
// export const UPDATE_CUSTOMER_SERVICE = "update_customer_service"
// export const UPDATE_CUSTOMER_SERVICE_SUCCESS = "update_customer_service_success"
// export const UPDATE_CUSTOMER_SERVICE_FAIL = "update_customer_service_fail"
export const REMOVE_CUSTOMER_SERVICE = "remove_customer_service"
export const REMOVE_CUSTOMER_SERVICE_SUCCESS = "remove_customer_service_success"
export const REMOVE_CUSTOMER_SERVICE_FAIL = "remove_customer_service_fail"

export const getAllCustomerServices = (data) => {
    return {
        type: GET_ALL_CUSTOMER_SERVICES,
        data
    }
}
export const getAllCustomerServicesSuccess = (data) => {
    return {
        type: GET_ALL_CUSTOMER_SERVICES_SUCCESS,
        data
    }
}
export const getAllCustomerServicesFail = (data) => {
    return {
        type: GET_ALL_CUSTOMER_SERVICES_FAIL,
        data
    }
}
export const getCustomerService = (data) => {
    return {
        type: GET_CUSTOMER_SERVICE,
        data
    }
}
export const getCustomerServiceSuccess = (data) => {
    return {
        type: GET_CUSTOMER_SERVICE_SUCCESS,
        data
    }
}
export const getCustomerServiceFail = (data) => {
    return {
        type: GET_CUSTOMER_SERVICE_FAIL,
        data
    }
}
export const addCustomerService = (data) => {
    return {
        type: ADD_CUSTOMER_SERVICE,
        data
    }
}
export const addCustomerServiceSuccess = (data) => {
    return {
        type: ADD_CUSTOMER_SERVICE_SUCCESS,
        data
    }
}
export const addCustomerServiceFail = (data) => {
    return {
        type: ADD_CUSTOMER_SERVICE_FAIL,
        data
    }
}
// export const updateCustomerService = (data) => {
//     return {
//         type: UPDATE_CUSTOMER_SERVICE,
//         data
//     }
// }
// export const updateCustomerServiceSuccess = (data) => {
//     return {
//         type: UPDATE_CUSTOMER_SERVICE_SUCCESS,
//         data
//     }
// }
// export const updateCustomerServiceFail = (data) => {
//     return {
//         type: UPDATE_CUSTOMER_SERVICE_FAIL,
//         data
//     }
// }
export const removeCustomerService = (data) => {
    return {
        type: REMOVE_CUSTOMER_SERVICE,
        data
    }
}
export const removeCustomerServiceSuccess = (data) => {
    return {
        type: REMOVE_CUSTOMER_SERVICE_SUCCESS,
        data
    }
}
export const removeCustomerServiceFail = (data) => {
    return {
        type: REMOVE_CUSTOMER_SERVICE_FAIL,
        data
    }
}