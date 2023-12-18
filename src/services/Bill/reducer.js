import { GET_ALL_BILLS_SUCCESS, GET_ALL_BILLS_FAIL, GET_BILL_SUCCESS, GET_BILL_FAIL, ADD_BILL_SUCCESS, ADD_BILL_FAIL, UPDATE_BILL_SUCCESS, UPDATE_BILL_FAIL, REMOVE_BILL_SUCCESS, REMOVE_BILL_FAIL, NO_BILLS_FOUND, GET_ALL_BILLS, GET_BILL, ADD_BILL, REMOVE_BILL, UPDATE_BILL } from './action'

const initialState = {
    isRegistered: false,
    isLoading: false,
    isLoadingButton:false,
    error_type: '',
    bills: [],
    bill: [],
    service: [],
    sub_service: [],
    invoiceBills: []
}

export const BillReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BILLS:
            return {
                ...state,
                isRegistered: false,
                isLoading: true
            }
        case GET_ALL_BILLS_SUCCESS:
            return {
                ...state,
                isRegistered: false,
                isLoading: false,
                bills: action.data.bills,
                service: action.data.service,
                sub_service: action.data.subService
            }
        case GET_ALL_BILLS_FAIL:
            return {
                ...state,
                isRegistered: false,
                error_type: action.data.error_type
            }
        case NO_BILLS_FOUND:
            return {
                ...state,
                isRegistered: action.data.isRegistered,
                isLoading: false,
                service: action.data.service,
                sub_service: action.data.sub_service,
                error_type: action.data.error_type,
                bills: []
            }
        case GET_BILL:
            return {
                ...state,
                isRegistered: false,
                isLoading: true
            }
        case GET_BILL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                bill: action.data
            }
        case GET_BILL_FAIL:
            return {
                ...state,
                isLoading: false,
                isRegistered: action.data.isRegistered,
                error_type: action.data.error_type
            }
        case ADD_BILL:
            return {
                ...state,
                isLoadingButton:true,
                isRegistered: action.data
            }
        case ADD_BILL_SUCCESS:
            return {
                ...state,
                isLoadingButton:false,
                isRegistered: action.data
            }
        case ADD_BILL_FAIL:
            return {
                ...state,
                isLoadingButton:false,
                isRegistered: action.data.isRegistered,
                error_type: action.data.error_type
            }
        case UPDATE_BILL:
            return {
                isRegistered: action.data,
                isLoadingButton:true
            }
        case UPDATE_BILL_SUCCESS:
            return {
                isRegistered: action.data,
                isLoadingButton:false
            }
        case UPDATE_BILL_FAIL:
            return {
                ...state,
                isRegistered: action.data.isRegistered,
                isLoadingButton:false,
                error_type: action.data.error_type
            }
        case REMOVE_BILL_SUCCESS:
            return {
                ...state,
                isRegistered: true
            }
        case REMOVE_BILL_FAIL:
            return {
                ...state,
                isRegistered: action.data.isRegistered,
                error_type: action.data.error_type
            }
        default:
            return state;
    }
}
