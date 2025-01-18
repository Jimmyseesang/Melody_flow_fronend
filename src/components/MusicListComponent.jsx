import axios from "axios";
import { ProfileContext } from "../contexts/ProfileContext";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const MusicListComponent = (props) => {

    const navigate = useNavigate()

    const { title, artist, image, option, id } = props

    const { profile, fetchProfile, apiHost, apiPort, token } = useContext(ProfileContext)

    const [isHovered, setIsHovered] = useState(false);
    const [isLike, setIsLike] = useState()

    const { playlistId, musicId, artistId } = useParams()

    const isActive = () => {
        return musicId === id && 'bg-white/20'
    }

    const handleOnClike = () => {


        if (playlistId) {
            navigate(`/list/${playlistId}/${id}`)
        }
        else if (window.location.pathname.split('/')[1] === 'like') {
            navigate(`/like/${id}`)
        } 
        else if (window.location.pathname.split('/')[1] === 'artistMusic') {
            navigate(`/artistMusic/${artistId}/${id}`)
        }
        else {
            navigate(`/music/${id}`)
        }


    }

    const handleLike = async () => {

        const like = isLike

        const updateLike = async () => {
            if (!like) {
                const response = await axios.post(`https://melody-flow.online/music/likeMusic`, { musicId: id }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                console.log("like")
            }
            else {
                const response = await axios.post(`https://melody-flow.online/music/unlikeMusic`, { musicId: id }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log("unlike")
            }
        }
        await updateLike()
        await fetchProfile()
        setIsLike(!like)

    }

    const updateLike = async () => {
        await fetchProfile()
        setIsLike(profile.like.some((music) => music._id === id))
    }

    useEffect(() => {
        updateLike()
    }, [])

    return (
        <div className={`w-full md:min-h-[76px] md:h-[76px] min-h-[65px] h-[65px] flex text-white hover:cursor-pointer justify-between ${isHovered && 'bg-white/20'} ${isActive()}`}>
            <div className="h-full aspect-square flex justify-center items-center p-2" onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => { setIsHovered(false) }} onClick={() => { handleOnClike() }}>
                <div className="h-full aspect-square bg-cover bg-center rounded bg-white" style={{ backgroundImage: `url(${image})` }}></div>
            </div>
            <div className="w-full flex " onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => { setIsHovered(false) }} onClick={() => { handleOnClike() }}>
                <p className="w-1/2 h-full flex justify-center items-center text-start md:text-base text-sm truncate">{title}</p>
                <p className="w-1/2 h-full flex lg:justify-center justify-start items-center md:text-base text-sm">{artist}</p>
            </div>
            <div className={`h-full aspect-square justify-center items-center group hover:bg-white/20 transition-all duration-200 max-h-full ${option ? 'flex' : 'hidden'}`} onClick={() => handleLike()}>
                <i className={`fa-solid fa-heart text-xl ${isLike ? 'text-red-500' : 'text-white'} group-hover:text-white transition-all duration-200`}></i>
            </div>
        </div>
    )
}

export default MusicListComponent