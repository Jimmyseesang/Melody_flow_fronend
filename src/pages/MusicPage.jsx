import CircleComponent from "../components/CircleComponent"
import LeftMusicComponent from "../components/musicPageComponents/LeftMusicComponent"
import NavBarComponent from "../components/NavBarComponent"
import RightMusicComponent from "../components/musicPageComponents/RightMusicComponent"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../contexts/ProfileContext"
import { useParams } from "react-router-dom"

const MusicPage = (props) => {

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    const {id} = useParams()

    const {apiHost, apiPort} = useContext(ProfileContext)
    const [music, setMusic] = useState({})

    const fetchMusic = async () => {
        const response = await axios.get(`http://${apiHost}:${apiPort}/music/findOne/${id}`)
        setMusic(response.data.music)
    }

    useEffect(() => {
        fetchMusic()
    },[])

    return (
        <div className="bg-gradient-to-tr from-pink-500 to-black-100 min-h-screen h-full w-full flex flex-row justify-end truncate relative">
            <NavBarComponent />
            <div className="h-full w-full absolute blur-2xl bg-black-200/10">
                {bubble(20)}
            </div>
            <div className="lg:h-screen h-full lg:w-[95.37%] w-full z-10 flex lg:flex-row flex-col">
                {music && <LeftMusicComponent music={music} />}
                <RightMusicComponent />
            </div>
        </div>
    )

}

export default MusicPage