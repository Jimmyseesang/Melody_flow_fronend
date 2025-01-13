import { useContext, useState } from "react"
import { ProfileContext } from "../contexts/ProfileContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const PlaylistBoxComponent = (props) => {

    const navigate = useNavigate()

    const {_id ,title, image} = props

    const {apiHost, apiPort, token} = useContext(ProfileContext)

    const fetchPlaylist = async () => {
        const response = await axios.get(`http://${apiHost}:${apiPort}/playlist/getPlaylist/${_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const playlist = response.data.playlist
        if(playlist.musics.length === 0) {
            console.log("This playlist don't have music")
            return {playlistId: playlist._id, musicId: null}
        }
        return {playlistId: playlist._id, musicId: playlist.musics[0]._id}
        
    }

    const color = `bg-black-100`

    const handleClick = async () => {

        const result = await fetchPlaylist()
        const {playlistId, musicId} = result

        navigate(`${playlistId}/${musicId}`)
       
    }
    
    return (
        <div className="min-w-60 w-60 h-80 min-h-80 relative group hover:cursor-pointer" onClick={() => {handleClick()}}>
            <div className={`absolute w-full h-full rounded z-30 shadow-md p-2 flex flex-col transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 border-2 border-zinc-700 ${color}`}>
                <div className="w-full h-[150px] bg-white rounded bg-cover bg-center" style={{backgroundImage: `url(http://${apiHost}:${apiPort}/playlistImg/${encodeURIComponent(image)})`}}></div>
                <div className="flex-1 flex justify-center items-center truncate">
                    <h2 className="text-white font-bold text-xl group-hover:text-pink-600 transition-all duration-200">{title}</h2>
                </div>
            </div>
            <div className={`absolute w-full h-full rounded z-20 translate-x-2 shadow-md translate-y-2 transition-all group-hover:translate-x-3 group-hover:translate-y-3 border-2 border-zinc-700 ${color}`}></div>
            <div className={`absolute w-full h-full rounded z-10 translate-x-4 shadow-md translate-y-4 transition-all group-hover:translate-x-7 group-hover:translate-y-7 border-2 border-zinc-700 ${color}`}></div>
        </div>
    )
}

export default PlaylistBoxComponent