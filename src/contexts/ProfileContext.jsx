import axios from 'axios'
import React, { createContext, useState } from 'react'

export const ProfileContext = createContext()

export const ProfileProvider = ({children}) => {

    const defaultProfile = {playlist: []}
    const [profile, setProfile] = useState(defaultProfile)
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
                const encodedProfileImg = encodeURIComponent(response.data.user.profile)
                setProfileImg(`http://${apiHost}:${apiPort}/profileImg/${encodedProfileImg }`)
            }
        } catch (error) {
            console.error('Error fetching profile:', error)
        }
    }

    const [token, setToken] = useState(localStorage.getItem('token'))

  return (
    <ProfileContext.Provider value={{profile, fetchProfile, apiHost, apiPort, token, setToken, profileImg}}>
        {children}
    </ProfileContext.Provider>
  )
}