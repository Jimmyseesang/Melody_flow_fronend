import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileContext"

export const MusicContext = createContext()

export const MusicProvider = ({ children }) => {

    const { apiHost, apiPort } = useContext(ProfileContext)

    const [musics, setMusics] = useState([])

    const getAllMusic = async () => {

        try {
            const response = await axios.get(`http://${apiHost}:${apiPort}/music/findAllMusic`);
            setMusics(response.data.music);
        } catch (error) {
            console.error("Failed to fetch music:", error);
        }

    }

    useEffect(() => {
        getAllMusic()
    }, [])

    return (
        <MusicContext.Provider value={{ musics }}>
            {children}
        </MusicContext.Provider>
    )

}