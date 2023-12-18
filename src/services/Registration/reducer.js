import { REGISTRATION_DETAILS,REGISTRATION_FAIL,REGISTRATION_SUCCESS , RESET_VALUE} from "./action";

const initialState={
    isLoading:false,
    isLoadingButton:false,
    register_customer_id:0,
    business_name:'',
    phoneno:'',
    email_id:'',
    customer_Fname:'',
    customer_Lname:'',
    dob:'',
    address:'',
    pincode:'',
    city:'',
    state:'',
    isRegistered:false,
    error_type:'',
    token:''
}

export const RegistrationReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case REGISTRATION_DETAILS:
            return{
                ...state,
                error_type:'',
                isLoadingButton:true
            }
        case REGISTRATION_SUCCESS:
            return{
                ...state,
                isLoadingButton:false,
                isRegistered:action.data.isRegistered,
                business_name:action.data.data.business_name,
                phoneno:action.data.data.phoneno,
                email_id:action.data.data.email_id,
                address:action.data.data.address,
                pincode:action.data.data.pincode,
                city:action.data.data.city,
                state:action.data.data.state,
                token:action.data.token,
                register_customer_id:action.data.data.register_customer_id
            }
        case REGISTRATION_FAIL:
            return{
                ...state,
                isLoadingButton:false,
                isRegistered:action.data.isRegistered,
                error_type:action.data.error_type
            }
        case RESET_VALUE:
            return{
                ...state,
                isRegistered:false,
                error_type:''
            }
            default:
                return state;
    }
}