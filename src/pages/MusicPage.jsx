import CircleComponent from "../components/CircleComponent"
import LeftMusicComponent from "../components/musicPageComponents/LeftMusicComponent"
import NavBarComponent from "../components/NavBarComponent"
import RightMusicComponent from "../components/musicPageComponents/RightMusicComponent"
import axios from "axios"
import { useContext, useEffect, useState, useMemo } from "react"
import { ProfileContext } from "../contexts/ProfileContext"
import { useNavigate, useParams } from "react-router-dom"
import { MusicContext } from "../contexts/MusicContext"
import { Slide, ToastContainer, toast } from "react-toastify"


const MusicPage = () => {

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    const bubbles = useMemo(() => bubble(20), [])

    const navigate = useNavigate()
    const { musicId, playlistId, artistId } = useParams()

    // Context
    const { profile, apiHost, apiPort, token } = useContext(ProfileContext)
    const { musics } = useContext(MusicContext)
    const API_URL = apiHost+'/api'

    // State
    const [music, setMusic] = useState({})
    const [nextMusic, setNextMusic] = useState({})
    const [prevMusic, setPrevMusic] = useState({})
    const [musicList, setMusicList] = useState([])

    // Toast
    const alert = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        })
    }

    const badAlert = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        })
    }

    const handleAlert = (message) => {
        if (message === 'good') {
            alert('Add to list success')
        }
        else if (message === 'bad') {
            badAlert('This music already in list')
        }
        else {
            badAlert('Failed adding to list')
        }
    }

    const fetchArtist = async (artistId, musicId) => {
        try {

            const response = await axios.get(`${API_URL}/music/artistById/${artistId}`)

            const musics = response.data.musics

            console.log(musics)

            const musicIndex = musics.findIndex((music) => music._id === musicId)

            setMusic(musics[musicIndex])
            setNextMusic(musics[musicIndex + 1] || null)
            setPrevMusic(musics[musicIndex - 1] || null)
            setMusicList(musics)

        } catch (err) {
            console.log(err)
            navigate('/*')
        }

    }

    useEffect(() => {

        const fetchPlaylist = async (_id, musicId) => {
            try {
                const response = await axios.get(`${API_URL}/playlist/getPlaylist/${_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                const playlist = response.data.playlist

                const musicIndex = playlist.musics.findIndex((music) => music._id === musicId)

                setMusic(playlist.musics[musicIndex])
                setNextMusic(playlist.musics[musicIndex + 1] || null)
                setPrevMusic(playlist.musics[musicIndex - 1] || null)
                setMusicList(playlist.musics)
            } catch (err) {
                console.log(err)
                navigate('/*')
            }
        }

        if (musicId && playlistId) {

            if (musicId === null || playlistId === null) {
                setMusic(null)
                setNextMusic(null)
                setPrevMusic(null)
                setMusic(null)
            }
            fetchPlaylist(playlistId, musicId)

        }
        else if (musicId && artistId) {
            fetchArtist(artistId, musicId)
        }
        else {

            if (window.location.pathname.split('/')[1] === 'like') {

                const musics = profile.like

                const musicIndex = musics.findIndex((music) => music._id === musicId)

                setMusic(musics[musicIndex])
                setNextMusic(musics[musicIndex + 1] || null)
                setPrevMusic(musics[musicIndex - 1] || null)
                setMusicList(musics)

                console.log(musicIndex)

            }
            else {

                const musicIndex = musics.findIndex((music) => music._id === musicId)

                if (musicIndex === -1) {
                    navigate('/*')
                    return
                }
                setMusic(musics[musicIndex]);
                setNextMusic(musics[musicIndex + 1] || null);
                setPrevMusic(musics[musicIndex - 1] || null);
                setMusicList(musics)
            }

        }

    }, [musicId, playlistId, musics, artistId]);


    return (
        <div className="bg-gradient-to-tr from-pink-500 to-black-100 min-h-screen h-full w-full flex flex-row justify-end truncate relative">
            <NavBarComponent />
            <ToastContainer />
            <div className="h-full w-full absolute blur-2xl bg-black-200/10">
                {bubbles}
            </div>
            <div className="lg:h-screen h-full lg:w-[95.37%] w-full z-10 flex lg:flex-row flex-col">
                {music ?
                    <LeftMusicComponent music={music} nextMusic={nextMusic} prevMusic={prevMusic} sendMessage={handleAlert} />
                    :
                    <div className="lg:w-1/2 lg:h-full h-screen p-16 flex items-center justify-center mt-12 lg:mt-0">
                        <div className="w-full max-w-[650px] min-w-[300px] h-full bg-white/25 backdrop-blur-2xl rounded-2xl border p-4 flex items-center justify-center">
                            <h1 className="text-white text-lg">This Playlist is Empty</h1>
                        </div>
                    </div>
                }
                <RightMusicComponent musics={musicList} />
            </div>
        </div>
    )

}

export default MusicPage