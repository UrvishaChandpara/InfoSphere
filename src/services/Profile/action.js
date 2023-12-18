export const GET_PROFILE_DETAILS="get_profile_details"
export const GET_PROFILE_DETAILS_SUCCESS="get_profile_details_success"
export const UPDATE_PROFILE="update_profile"
export const UPDATE_PROFILE_SUCCESS="update_profile_success"
export const UPDATE_PROFILE_FAIL="update_profile_fail"
export const RESET_VALUE="reset_value"

export const getProfileDeatils=(data)=>{
    return {
        type:GET_PROFILE_DETAILS,
        data
    }
}
export const getProfileDeatilsSuccess=(data)=>{
    return {
        type:GET_PROFILE_DETAILS_SUCCESS,
        data
    }
}
export const updateProfile=(data)=>{
    return {
        type:UPDATE_PROFILE,
        data
    }
}
export const updateProfileSuccess=(data)=>{
    return {
        type:UPDATE_PROFILE_SUCCESS,
        data
    }
}
export const updateProfileFail=(data)=>{
    return {
        type:UPDATE_PROFILE_FAIL,
        data
    }
}