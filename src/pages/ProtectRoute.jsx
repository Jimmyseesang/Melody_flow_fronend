import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const apiHost = import.meta.env.VITE_SERVER_HOST
const apiPORT = import.meta.env.VITE_SERVER_PORT

const ProtectRoute = () => {
    
    const [permission, setPermission] = useState(null)

    const checkIsAdmin = async (token) => {
        
        try{
            const response = await axios.get(`https://melody-flow.online/auth/page`,{
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

    },[])

    if(permission === null) {
        return <></>
    }

    return permission ? <Outlet/> : <Navigate to={'/*'}/>

}

export default ProtectRoute;
