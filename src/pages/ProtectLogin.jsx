import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

const apiHost = import.meta.env.VITE_SERVER_HOST
const apiPORT = import.meta.env.VITE_SERVER_PORT

const ProtectLogin = () => {

    const [permission, setPermission] = useState(null)

    useEffect(() => {
        const checkPermisstion = async () => {
            const token = localStorage.getItem('token')
            if(!token) return setPermission(false)

            try {
                const response = await axios.get(`https://melody-flow.online/auth/userPage`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setPermission(response.data.isLogin)
            }
            catch(err) {
                console.log('Failed to fetch permission')
                setPermission(false)
            }
        }

        checkPermisstion()

    },[])

    if(permission === null) {
        return <></>
    }

    return permission ? <Outlet/> : <Navigate to={'/register'}/>

}

export default ProtectLogin