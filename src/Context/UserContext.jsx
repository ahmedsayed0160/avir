import { createContext, useEffect, useState } from "react";
import { set } from "zod";

export let UserContext = createContext();

export default function UserContextProvider(props){
 
const [userLogin, setuserLogin] = useState(localStorage.getItem("userToken"));

  /* useEffect( ()=>{
    if(localStorage.getItem("userToken")){
        setuserLogin(localStorage.getItem("userToken"));
        
    }
   },[])*/

    return <UserContext.Provider value={{ userLogin , setuserLogin}}>
    {props.children}
    </UserContext.Provider>
}


  
    






