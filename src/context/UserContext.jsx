/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export let UserContext = createContext()

export default function UserContextProvider(props){

    const [userLogin, setuserLogin] = useState(
        localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
    )

return  <UserContext.Provider value={{setuserLogin,userLogin}}>

    {props.children}
</UserContext.Provider>

}