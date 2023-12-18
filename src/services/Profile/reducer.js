import { GET_PROFILE_DETAILS, GET_PROFILE_DETAILS_SUCCESS,UPDATE_PROFILE,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_FAIL, RESET_VALUE } from "./action";

const initialState = {
    isLoading:false,
    isLoadingButton:false,
    register_customer_id: 0,
    business_name: '',
    phoneno: '',
    email_id: '',
    customer_Fname: '',
    customer_Lname: '',
    dob: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    token:'',
    isUpdated:false,
    error_type:'',
    device_type:''
}

export const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_DETAILS:
            return {
                ...state,
                isLoading:true
            }
        case GET_PROFILE_DETAILS_SUCCESS: {
            return {
                ...state,
                isLoading:false,
                register_customer_id: action.data.register_customer_id,
                business_name: action.data.business_name,
                phoneno: action.data.phoneno,
                email_id: action.data.email_id,
                customer_Fname: action.data.customer_Fname,
                customer_Lname: action.data.customer_Lname,
                dob: action.data.dob,
                address: action.data.address,
                pincode: action.data.pincode,
                city: action.data.city,
                state: action.data.state
            }
        }
        case UPDATE_PROFILE:{
            return{
                ...state,
                isLoadingButton:true
            }
        }
        case UPDATE_PROFILE_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                isLoadingButton:false,
                register_customer_id: action.data.data.register_customer_id,
                business_name: action.data.data.business_name,
                phoneno: action.data.data.phoneno,
                email_id: action.data.data.email_id,
                customer_Fname: action.data.data.customer_Fname,
                customer_Lname: action.data.data.customer_Lname,
                dob: action.data.data.dob,
                address: action.data.data.address,
                pincode: action.data.data.pincode,
                city: action.data.data.city,
                state: action.data.data.state,
                device_type: action.data.data.device_type,
                token:action.data.token,
                isUpdated:true
            }
        }
        case UPDATE_PROFILE_FAIL:
            return{
                ...state,
                isLoadingButton:false,
                isUpdated:action.data.isUpdated,
                error_type:action.data.error_type
            }
        case RESET_VALUE:
            return{
                ...state,
                isUpdated:false,
                error_type:''
            }
        default:
            return state;
    }
}