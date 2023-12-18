import { LOGIN_DETAILS,LOGIN_SUCCESS,LOGIN_FAILED,RESET_VALUE } from "./action";

const initialState={
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
    isLoggedIn:false,
    token:'',
    error_type:''
}

export const LoginReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case LOGIN_DETAILS:
            return {
                ...state,
                isLoadingButton:true,
                error_type:'',
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                isLoadingButton:false,
                isLoggedIn:action.data.isLoggedIn,
                register_customer_id:action.data.data.register_customer_id,
                business_name:action.data.data.business_name,
                phoneno:action.data.data.phoneno,
                email_id:action.data.data.email_id,
                token:action.data.token,
                customer_Fname:action.data.data.customer_Fname,
                customer_Lname:action.data.data.customer_Lname,
                dob:action.data.data.dob,
                address:action.data.data.address,
                pincode:action.data.data.pincode,
                city:action.data.data.city,
                state:action.data.data.state

            }
        case LOGIN_FAILED:
            return{
                ...state,
                isLoadingButton:false,
                isLoggedIn:action.data.isLoggedIn,
                error_type:action.data.error_type
            }
        case RESET_VALUE:
            return{
                ...state,
                isLoggedIn:false
            }
            default:
                return state;
    }
}