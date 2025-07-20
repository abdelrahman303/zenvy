import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()
export default function UserContextProvider(props) {
    // ana m7tag el token fel navbar w el login w el register 34an lw m4 3aml login mzhrlo4
    // el ul bta3t el home w el product w kdaa azhrlo bs el login w el register 

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [userId, setUserId] = useState(null)

    function convertToken() {
        const data = jwtDecode(localStorage.getItem('token'))
        setUserId(data.id)
        console.log({ userId });
    }

    useEffect(() => {

        if (token) {
            localStorage.setItem('token', token)
            convertToken()

        } else {
            localStorage.removeItem('token')
        }
        // token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
    }, [token])

    return <UserContext.Provider value={{ token, setToken, userId, convertToken }} >
        {props.children}
    </UserContext.Provider>
}
