export const GET_ALL_SERVICES="get_all_services"
export const GET_ALL_SERVICES_SUCCESS="get_all_services_success"
export const GET_ALL_SERVICES_FAIL="get_all_services_fail"
export const ADD_SERVICE="add_service"
export const ADD_SERVICE_SUCCESS="add_service_success"
export const ADD_SERVICE_FAIL="add_service_fail"
export const UPDATE_SERVICE="update_service"
export const UPDATE_SERVICE_SUCCESS="update_service_success"
export const UPDATE_SERVICE_FAIL="update_service_fail"
export const HANDLE_ERROR="handle_error"

export const getAllServices=(data)=>{
    return {
        type:GET_ALL_SERVICES,
        data
    }
}
export const getAllServicesSuccess=(data)=>{
    return {
        type:GET_ALL_SERVICES_SUCCESS,
        data
    }
}
export const getAllServicesFail=(data)=>{
    return {
        type:GET_ALL_SERVICES_FAIL,
        data
    }
}
export const addService=(data)=>{
    return {
        type:ADD_SERVICE,
        data
    }
}
export const addServiceSuccess=(data)=>{
    return {
        type:ADD_SERVICE_SUCCESS,
        data
    }
}
export const addServiceFail=(data)=>{
    return {
        type:ADD_SERVICE_FAIL,
        data
    }
}
export const updateService=(data)=>{
    return {
        type:UPDATE_SERVICE,
        data
    }
}
export const updateServiceSuccess=(data)=>{
    return {
        type:UPDATE_SERVICE_SUCCESS,
        data
    }
}
export const updateServiceFail=(data)=>{
    return {
        type:UPDATE_SERVICE_FAIL,
        data
    }
}
export const handleError = ()=>{
    return { type: HANDLE_ERROR}
   };
   