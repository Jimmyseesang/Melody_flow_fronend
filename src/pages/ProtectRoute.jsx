import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectRoute = () => {
    
    const [permission, setPermission] = useState(null)

    const checkIsAdmin = async (token) => {
        
        try{
            const response = await axios.get('http://localhost:4700/auth/page',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setPermission(response.data.isAdmin)
        }catch(err) {
            console.log('Failed to fetch permission')
            setPermission(false)
        }
        
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            checkIsAdmin(token)
        }else {
            setPermission(false)
        }

    })

    if(permission === null) {
        return <></>
    }

    return permission ? <Outlet/> : <Navigate to={'/'}/>

}

export default ProtectRoute;
