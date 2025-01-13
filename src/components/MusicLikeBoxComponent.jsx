import { useContext } from "react"
import { ProfileContext } from "../contexts/ProfileContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const MusicLikeBoxComponent = (props) => {

    const navigate = useNavigate()

    const { _id, title, artist, coverUrl } = props

    const { apiHost, apiPort, token, fetchProfile } = useContext(ProfileContext)

    const unLike = async () => {
        const response = await axios.post(`http://${apiHost}:${apiPort}/music/unlikeMusic`, { musicId: _id }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        fetchProfile()
        console.log(response.data)
    }

    return (
        <div className="bg-black-200/50 w-full h-1/5 flex border border-black-200">
            <div className="flex w-full p-2 items-center hover:bg-white/10 hover:cursor-pointer group" onClick={() => {navigate(`/like/${_id}`)}}>
                <div style={{ backgroundImage: `url(http://${apiHost}:${apiPort}/musicImg/${coverUrl})` }} className="h-full aspect-square bg-cover bg-center rounded"></div>
                <div className="flex flex-col justify-center w-full items-center text-white/90 group-hover:text-pink-600">
                    <div className="text-base">{title}</div>
                    <div className="text-sm">{artist}</div>
                </div>
            </div>
            <div className="h-full aspect-square bg-black-200 flex items-center justify-center text-pink-600 text-xl hover:text-white hover:cursor-pointer" onClick={() => unLike()}>
                <i className="fa-solid fa-heart"></i>
            </div>
        </div>
    )
}

export default MusicLikeBoxComponent