import { useState } from "react";
import { useUserContext } from "./useAuthContext";

export const useLogin = ()=>{
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(null);
    const {dispatch} = useUserContext()
    const login = async(email,password)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const json=await response.json();

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save the user to localstorage
            localStorage.setItem('user',JSON.stringify(json))

            //update the auth context
            dispatch({type:'LOGIN',payload:json})

            setIsLoading(false)
        }
    }
    return({login,isLoading,error})
}