export const REGISTRATION_DETAILS="registration_details";
export const REGISTRATION_SUCCESS="registration_success";
export const REGISTRATION_FAIL="registration_fail";
export const RESET_VALUE="reset_value"

export const registrationDetails = (data) => {

    return {
        type: REGISTRATION_DETAILS,
        data
    }
}

export const registrationSuccess = (data) => {
    return {
        type: REGISTRATION_SUCCESS,
        data
    }
}

export const registrationFail = (data) => {
    return {
        type: REGISTRATION_FAIL,
        data
    }
}
