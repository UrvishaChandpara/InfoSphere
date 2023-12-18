import axios from "axios";

export const postApi=async({url,body,method}) =>{
    try {
        console.log("url",url,"body",body,"method",method)
        const response = await axios(url, {
            method,
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            data:body
        })
        .then(res=>{
            // console.log("Axois ===>",res)
           return res.data
        })
        .catch((error)=>{
            if (error.response) {
                // console.log("Axios Error ==>", error.response.data);
                return error.response.data
                // Handle the error message here, display it to the user or perform any other action
              } else {
                // console.log("Axios Error ==>", error);
                return error
              }
        })
            return response
        
    }
    catch(error){
        console.log("Error=>",error)
    }
}

export const getApi=async({url,method}) =>{
    try {
        console.log("url",url,"method",method)
        const response = await axios(url, {
            method,
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            // console.log("Axois ===>",res)
           return res.data
        })
        .catch((error)=>{
            if (error.response) {
                //console.log("Axios Error ==>", error.response.data);
                return error.response.data
                // Handle the error message here, display it to the user or perform any other action
              } else {
                //console.log("Axios Error ==>", error);
                return error
              }
        })
            return response
        
    }
    catch(error){
        console.log("Error=>",error)
    }
}

export const postApiToken=async({url,body,method,token}) =>{
    try {
        console.log("url",url,"method",method,"body",body,"token",token)
        const response = await axios(url, {
            method,
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`
            },
            data:body
        })
        .then(res=>{
            // console.log("Axois ===>",res)
           return res.data
        })
        .catch((error)=>{
            if (error.response) {
                // console.log("Axios Error ==>", error.response.data);
                return error.response.data
                // Handle the error message here, display it to the user or perform any other action
              } else {
                // console.log("Axios Error Response ==>", error);
                return error
              }
        })
            return response
        
    }
    catch(error){
        console.log("Error=>",error)
    }
}

export const apiToken=async({url,method,token}) =>{
    try {
        console.log("Details ==>","url",url,"method",method,"token",token)
        const response = await axios(url, {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`,
            }
        })
        .then(res=>{
            // console.log("Axois ===>",res)
           return res.data
        })
        .catch((error)=>{
            // console.log("Axois Error==>",error.response.data)
            if (error.response) {
                // console.log("Axios Error Response ==>", error.response.data);
                return error.response.data
                // Handle the error message here, display it to the user or perform any other action
              } else {
                return error
                // console.log("Axios Error ==>", error);
              }
        })
            return response
        
    }
    catch(error){
        console.log("Error=>",error)
    }
}


export const putApi=async({url,body,method,token}) =>{
    try {
        // console.log("Details ==>","url",url,"method",method,"token",token,"body",body)
        const response = await axios(url, {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`
            },
            data:body
        })
        .then(res=>{
            // console.log("Axois ===>",res)
           return res.data
        })
        .catch((error)=>{
            // console.log("Axois Error==>",error.response.data)
            if (error.response) {
                // console.log("Axios Error Response ==>", error.response.data);
                return error.response.data
                // Handle the error message here, display it to the user or perform any other action
              } else {
                // console.log("Axios Error ==>", error);
                return error
              }
        })
            return response
        
    }
    catch(error){
        console.log("Error=>",error)
    }
}
