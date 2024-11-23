import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const ProfileContext = createContext()

export const ProfileProvider = ({children}) => {

    const [profile, setProfile] = useState(null)
    const [profileImg, setProfileImg] = useState('../public/images/user-image.png')

    const apiHost = import.meta.env.VITE_SERVER_HOST
    const apiPort = import.meta.env.VITE_SERVER_PORT

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`http://${apiHost}:${apiPort}/user/getProfile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
    
            setProfile(response.data.user)
            if (response.data.user.profile) {
                setProfileImg(`http://${apiHost}:${apiPort}/profileImg/${response.data.user.profile}`)
            }
        } catch (error) {
            console.error('Error fetching profile:', error)
        }
    }

    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        
        if(token) {
            fetchProfile()
        }

    },[])

  return (
    <ProfileContext.Provider value={{profile, fetchProfile, apiHost, apiPort, token, setToken, profileImg}}>
        {children}
    </ProfileContext.Provider>
  )
}