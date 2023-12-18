export const GET_ALL_SUB_SERVICES="get_all_sub_services"
export const GET_ALL_SUB_SERVICES_SUCCESS="get_all_sub_services_success"
export const GET_ALL_SUB_SERVICES_FAIL="get_all_sub_services_fail"
export const ADD_SUB_SERVICE="add_sub_service"
export const ADD_SUB_SERVICE_SUCCESS="add_sub_service_success"
export const ADD_SUB_SERVICE_FAIL="add_sub_service_fail"
export const UPDATE_SUB_SERVICE="update_sub_service"
export const UPDATE_SUB_SERVICE_SUCCESS="update_sub_service_success"
export const UPDATE_SUB_SERVICE_FAIL="update_sub_service_fail"
export const HANDLE_ERROR="handle_error"

export const getAllSubServices=(data)=>{
    return {
        type:GET_ALL_SUB_SERVICES,
        data
    }
}
export const getAllSubServicesSuccess=(data)=>{
    return {
        type:GET_ALL_SUB_SERVICES_SUCCESS,
        data
    }
}
export const getAllSubServicesFail=(data)=>{
    return {
        type:GET_ALL_SUB_SERVICES_FAIL,
        data
    }
}
export const addSubService=(data)=>{
    return {
        type:ADD_SUB_SERVICE,
        data
    }
}
export const addSubServiceSuccess=(data)=>{
    return {
        type:ADD_SUB_SERVICE_SUCCESS,
        data
    }
}
export const addSubServiceFail=(data)=>{
    return {
        type:ADD_SUB_SERVICE_FAIL,
        data
    }
}
export const updateSubService=(data)=>{
    return {
        type:UPDATE_SUB_SERVICE,
        data
    }
}
export const updateSubServiceSuccess=(data)=>{
    return {
        type:UPDATE_SUB_SERVICE_SUCCESS,
        data
    }
}
export const updateSubServiceFail=(data)=>{
    return {
        type:UPDATE_SUB_SERVICE_FAIL,
        data
    }
}
export const handleError = ()=>{
   return { type: HANDLE_ERROR}
  };
  