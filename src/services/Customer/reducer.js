import { GET_ALL_CUSTOMERS_SUCCESS, ADD_CUSTOMER_SUCCESS, ADD_CUSTOMER_FAIL, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAIL, REMOVE_CUSTOMER_SUCCESS, REMOVE_CUSTOMER_FAIL, GET_ALL_CUSTOMERS_FAIL, GET_CUSTOMER_SUCCESS, GET_CUSTOMER_FAIL, HANDLE_ERROR, GET_ALL_CUSTOMERS, GET_CUSTOMER, REMOVE_CUSTOMER, ADD_CUSTOMER, UPDATE_CUSTOMER } from './action'

const initialState = {
    isRegistered: false,
    error_type: '',
    customers: [],
    customer: {},
    isLoading: false,
    isLoadingButton:false
}

export const CustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CUSTOMERS:
            return {
                ...state,
                isLoading: true
            }
        case GET_ALL_CUSTOMERS_SUCCESS:
            return {
                ...state,
                isRegistered: false,
                isLoading: false,
                customers: action.data
            }
        case GET_ALL_CUSTOMERS_FAIL:
            return {
                ...state,
                isRegistered: false,
                isLoading: false,
                error_type: action.data.error_type,
                customers: []
            }
        case GET_CUSTOMER:
            return {
                ...state,
                isLoading: true
            }
        case GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                customer: action.data,
                isLoading: false
            }
        case GET_CUSTOMER_FAIL:
            return {
                ...state,
                isLoading: false,
                isRegistered: action.data.isRegistered,
                error_type: action.data.error_type,
            }
        case ADD_CUSTOMER:
            return {
                ...state,
            isLoadingButton:true
            }
        case ADD_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoadingButton:false,
                isRegistered: action.data
            }
        case ADD_CUSTOMER_FAIL:
            return {
                ...state,
                isRegistered: action.data.isRegistered,
                isLoadingButton:false,
                error_type: action.data.error_type
            }
        case UPDATE_CUSTOMER:
            return {
                ...state,
                isLoadingButton:true
            }
        case UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoadingButton:false,
                isRegistered: action.data
            }
        case UPDATE_CUSTOMER_FAIL:
            return {
                ...state,
                isRegistered: action.data.isRegistered,
                isLoadingButton:false,
                error_type: action.data.error_type
            }
        case REMOVE_CUSTOMER_SUCCESS:
            return {
                ...state,
                isRegistered:true
            }
        case REMOVE_CUSTOMER_FAIL:
            return {
                ...state,
                isRegistered: action.data.isRegistered,
                error_type: action.data.error_type
            }
        case HANDLE_ERROR:
            return {
                ...state,
                error_type: ''
            }
        default:
            return state ;
    }
}