import {GET_ALL_SERVICES_SUCCESS, GET_ALL_SERVICES_FAIL, ADD_SERVICE_SUCCESS, ADD_SERVICE_FAIL, UPDATE_SERVICE_SUCCESS, UPDATE_SERVICE_FAIL,HANDLE_ERROR, GET_ALL_SERVICES, UPDATE_SERVICE, ADD_SERVICE } from './action'

const initialState = {
    isLoading:false,
    isLoadingButton:false,
    isRegistered: false,
    error_type: '',
    services: []
}

export const ServiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SERVICES:
            return {
                ...state,
                isLoading:true
            }
        case GET_ALL_SERVICES_SUCCESS:
            return {
                ...state,
                isLoading:false,
                services: action.data
            }
        case GET_ALL_SERVICES_FAIL:
            return {
                ...state,
                isLoading:false,
                isRegistered: action.data.isRegistered,
                error_type: action.data.error_type,
                services: []
            }
        case ADD_SERVICE:
            return {
                ...state,
                isLoadingButton:true
            }
        case ADD_SERVICE_SUCCESS:
            return {
                ...state,
                isLoadingButton:false,
                isRegistered: action.data
            }
        case ADD_SERVICE_FAIL:
            return {
                ...state,
                isLoadingButton:false,
                isRegistered: action.data.isRegistered,
                error_type: action.data.error_type
            }
        case UPDATE_SERVICE:
            return {
                ...state,
                isLoadingButton:true
            }
        case UPDATE_SERVICE_SUCCESS:
            return {
                ...state,
                isLoadingButton:false,
                isRegistered: action.data
            }
        case UPDATE_SERVICE_FAIL:
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
            return state ;
    }
}