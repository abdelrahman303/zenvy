import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()
export default function UserContextProvider(props) {
    // ana m7tag el token fel navbar w el login w el register 34an lw m4 3aml login mzhrlo4
    // el ui bta3t el home w el product w kdaa azhrlo bs el login w el register 

    const [token, setToken] = useState(localStorage.getItem('accessToken'))
    // const [userId, setUserId] = useState(null)
    // const [userRole, setUserRole] = useState(null)

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (token) {
            localStorage.setItem('accessToken', token)
            convertToken()
        } else {
            localStorage.removeItem('accessToken')
        }
        // token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
    }, [token])

    function convertToken() {
        const decoded = jwtDecode(localStorage.getItem('accessToken'))
        // const id = decoded?.id
        // const role = decoded?.role
        setUser(decoded)
        console.log(decoded);
        // setUserId(id)
        // setUserRole(role)
    }
    return <UserContext.Provider value={{ token, setToken, user, convertToken }} >
        {props.children}
    </UserContext.Provider>
}
