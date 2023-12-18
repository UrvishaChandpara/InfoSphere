import { NO_BILLS_FOUND, GET_ALL_BILLS_FOR_INVOICE_SUCCESS, GET_ALL_BILLS_FOR_INVOICE_FAIL, GET_ALL_BILLS_FOR_INVOICE, ADD_INVOICE, ADD_INVOICE_SUCCESS, ADD_INVOICE_FAIL, RESET_VALUE, GET_ALL_INVOICES, GET_ALL_INVOICES_SUCCESS, GET_ALL_INVOICES_FAIL, REMOVE_INVOICE, REMOVE_INVOICE_SUCCESS, REMOVE_INVOICE_FAIL, GET_INVOCIE, GET_INVOCIE_SUCCESS, GET_INVOCIE_FAIL, UPDATE_PAY_STATUS, UPDATE_PAY_STATUS_FAIL, UPDATE_PAY_STATUS_SUCCESS } from './action'

const initialState = {
    isRegistered: false,
    isRegistered:false,
    isLoading: false,
    error_type: '',
    invoiceBills: [],
    customer: {},
    invoices:[],
    invoice:{},
    getInvoice:false,
    invoiceUrl:[]
}

export const InvoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BILLS_FOR_INVOICE:
            return {
                ...state,
                isLoading: true
            }
        case GET_ALL_BILLS_FOR_INVOICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                invoiceBills: action.data.bills,
                customer: action.data.customer
            }
        case GET_ALL_BILLS_FOR_INVOICE_FAIL:
            return {
                ...state,
                isLoading: false,
                customer: action.data.customer,
                error_type:action.data.error_type
            }
        case GET_ALL_INVOICES:
            return {
                ...state,
                isLoading: true,
            }
        case GET_ALL_INVOICES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                invoices: action.data
            }
        case GET_ALL_INVOICES_FAIL:
            return {
                ...state,
                isLoading: false,
                invoices:[],
                error_type:action.data.error_type
            }
        case GET_INVOCIE:
            return {
                ...state,
                getInvoice:false
            }
        case GET_INVOCIE_SUCCESS:
            return {
                ...state,
                getInvoice:true,
                invoiceUrl: action.data
            }
        case GET_INVOCIE_FAIL:
            return {
                ...state,
                isLoading: false,
                error_type:action.data.error_type
            }
        case ADD_INVOICE:
            return {
                ...state,
                isRegistered:false,
                isLoading:true,
                invoice:{}
            }
        case ADD_INVOICE_SUCCESS:
            return {
                ...state,
                invoiceBills:[],
                isLoading:false,
                invoice:action.data,
                isRegistered:true,
                
            }
        case ADD_INVOICE_FAIL:
            return {
                ...state,
                isRegistered: false,
                isLoading:false,
                error_type:'fail'
            }
        case REMOVE_INVOICE:
            return {
                ...state,
                isLoading:true,
                isRegistered:false
            }
        case REMOVE_INVOICE_SUCCESS:
            return {
                ...state,
                invoiceBills:[],
                isLoading:false,
                isRegistered:true,
                
            }
        case REMOVE_INVOICE_FAIL:
            return {
                ...state,
                isRegistered: false,
                isLoading:false,
                error_type:action.data.error_type
            }
        case UPDATE_PAY_STATUS:
            return {
                ...state,
                isRegistered:false,
                isLoading:true
            }
        case UPDATE_PAY_STATUS_SUCCESS:
            return {
                ...state,
                isRegistered:true,
                isLoading:false,
                invoice:action.data,
                
            }
        case UPDATE_PAY_STATUS_FAIL:
            return {
                ...state,
                isRegistered:false,
                isLoading:false,
                error_type:action.data
            }
        case NO_BILLS_FOUND:
            return {
                ...state,
                isLoading: false
            }
        case RESET_VALUE:
            return{
                ...state,
            isRegistered:false,
            getInvoice:false,
            error_type:''
            }
        default:
            return state ;
    }
}
