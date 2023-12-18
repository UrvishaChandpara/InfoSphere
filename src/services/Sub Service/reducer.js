import {GET_ALL_SUB_SERVICES_SUCCESS,GET_ALL_SUB_SERVICES_FAIL, ADD_SUB_SERVICE_SUCCESS, ADD_SUB_SERVICE_FAIL, UPDATE_SUB_SERVICE_SUCCESS, UPDATE_SUB_SERVICE_FAIL, HANDLE_ERROR, GET_ALL_SUB_SERVICES, ADD_SUB_SERVICE, UPDATE_SUB_SERVICE } from './action'

const initialState = {
    isRegistered: false,
    isLoading:false,
    isLoadingButton:false,
    error_type: '',
    subServices: []
}

export const SubServiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SUB_SERVICES:
            return {
                ...state,
                isLoading:true
            }
        case GET_ALL_SUB_SERVICES_SUCCESS:
            return {
                ...state,
                isRegistered:false,
                isLoading:false,
                subServices: action.data
            }
        case GET_ALL_SUB_SERVICES_FAIL:
            return {
                ...state,
                isLoading:false,
                isRegistered:action.data.isRegistered,
                error_type:action.data.error_type,
                subServices:[]
            }
        case ADD_SUB_SERVICE:
            return {
                ...state,
                isLoadingButton:true
            }
        case ADD_SUB_SERVICE_SUCCESS:
            return {
                ...state,
                isLoadingButton:false,
                isRegistered: action.data
            }
        case ADD_SUB_SERVICE_FAIL:
            return {
                ...state,
                isLoadingButton:false,
                isRegistered: action.data.isRegistered,
                error_type: action.data.error_type
            }
        case UPDATE_SUB_SERVICE:
            
            return {
                ...state,
                isLoadingButton: true
            }
        case UPDATE_SUB_SERVICE_SUCCESS:
            
            return {
                ...state,
                isLoadingButton:false,
                isRegistered: action.data
            }
        case UPDATE_SUB_SERVICE_FAIL:
            return {
                ...state,
                isLoadingButton:false,
                isRegistered: action.data.isRegistered,
                error_type: action.data.error_type
            }
        case HANDLE_ERROR:
            return {
                ...state,
                error_type: ''
            }
        default:
            return {...state};
    }
}