import { GET_ALL_CUSTOMER_SERVICES_SUCCESS, GET_ALL_CUSTOMER_SERVICES_FAIL, GET_CUSTOMER_SERVICE_SUCCESS, GET_CUSTOMER_SERVICE_FAIL, ADD_CUSTOMER_SERVICE_SUCCESS, ADD_CUSTOMER_SERVICE_FAIL, REMOVE_CUSTOMER_SERVICE_SUCCESS, REMOVE_CUSTOMER_SERVICE_FAIL, GET_ALL_CUSTOMER_SERVICES, GET_CUSTOMER_SERVICE, REMOVE_CUSTOMER_SERVICE } from './action'

const initialState = {
    isRegistered: false,
    isLoading: false,
    error_type: '',
    customerService: []
}

export const CustomerServiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CUSTOMER_SERVICES:
            return {
                ...state,
                isLoading: true,
            }
        case GET_ALL_CUSTOMER_SERVICES_SUCCESS:
            return {
                ...state,
                isRegistered: false,
                isLoading: false,
                customerService: action.data.customerServices
            }
        case GET_ALL_CUSTOMER_SERVICES_FAIL:
            return {
                ...state,
                isRegistered: false,
                isLoading: false,
                error_type: action.data.error_type,
                customerService: []
            }
        case GET_CUSTOMER_SERVICE:
            return {
                ...state,
            }
        case GET_CUSTOMER_SERVICE_SUCCESS:
            return {
                ...state,
                customerService: action.data
            }
        case GET_CUSTOMER_SERVICE_FAIL:
            return {
                ...state,
                isRegistered: action.data.isRegistered,
                error_type: action.data.error_type
            }
        case ADD_CUSTOMER_SERVICE_SUCCESS:
            return {
                ...state,
                isRegistered: action.data
            }
        case ADD_CUSTOMER_SERVICE_FAIL:
            return {
                ...state,
                isRegistered: action.data.isRegistered,
                error_type: action.data.error_type
            }
        case REMOVE_CUSTOMER_SERVICE:
            return {
                ...state,
            }
        case REMOVE_CUSTOMER_SERVICE_SUCCESS:
            return {
                ...state,
                isRegistered: true
            }
        case REMOVE_CUSTOMER_SERVICE_FAIL:
            return {
                ...state,
                isRegistered:false,
                error_type: action.data
            }
        default:
            return state ;
    }
}