export const LOGIN_DETAILS="login_details"
export const LOGIN_SUCCESS="login_success"
export const LOGIN_FAILED="login_failed"
export const RESET_VALUE="reset_value"

export const loginDetails=(data)=>{
    return {
        type:LOGIN_DETAILS,
        data
    }
}
export const loginSuccess=(data)=>{
    return {
        type:LOGIN_SUCCESS,
        data
    }
}
export const loginFail=(data)=>{
    return {
        type:LOGIN_FAILED,
        data
    }
}