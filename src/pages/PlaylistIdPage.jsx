import React, { useContext, useEffect, useRef, useState } from 'react'
import NavBarComponent from '../components/NavBarComponent'
import { ProfileContext } from '../contexts/ProfileContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const PlaylistIdPage = () => {

    const { apiHost, apiPort, token } = useContext(ProfileContext)
    const imageInput = useRef(null)
    const { playlistId } = useParams()
    const navigate = useNavigate()

    const [playlist, setPlaylist] = useState({})
    const [musics, setMusics] = useState([])

    const uploadFile = async (image) => {
        await axios.post(`https://melody-flow.online/playlist/changePlaylistImage/${playlistId}`, image, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        await getPlaylist()
    }

    const onSelectFile = (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (/image\/(jpeg|png)/.test(file.type)) {

            const data = new FormData()
            data.append('image', file)
            uploadFile(data)

        }
        e.target.value = null

    }

    const getPlaylist = async () => {
        const response = await axios.get(`https://melody-flow.online/playlist/getPlaylist/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setPlaylist(response.data.playlist)
        setMusics(response.data.playlist.musics)
    }

    const deleteFromPlaylist = async (music) => {
        if(confirm(`Do you to delete ${music.title} from ${playlist.title}`)) {
            const resposne = await axios.delete(`https://melody-flow.online/playlist/deleteFromPlaylist/${playlistId}/${music._id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            console.log(resposne.data)
            await getPlaylist()
        }
        
    }

    const deletePlaylist = async () => {
        if(confirm(`Do you want to delete this playlist?`)) {
            await axios.delete(`https://melody-flow.online/playlist/deletePlaylist/${playlistId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            navigate('/')
            
        }
    }

    useEffect(() => {
        getPlaylist()
    },[])

    return (
        <div className='h-screen w-full bg-gradient-to-tr from-black-200 via-pink-600 to-white truncate'>
            <NavBarComponent />
            <div className='w-full h-full flex items-center justify-center'>
                <div className="w-[60%] h-[600px] min-w-[340px] bg-black-200 absolute lg:bottom-[40%] bottom-[35%] right-1/2 translate-x-1/2 translate-y-1/2 rounded-lg flex items-end p-8">
                    <div className="sm:w-[35%] sm:min-w-[350px] min-w-[200px] aspect-square rounded-full bg-white bg-cover bg-center absolute right-1/2 sm:-top-16 -top-8 -translate-y-1/2 translate-x-1/2 hover:cursor-pointer hover:rounded-lg transition-all duration-1000 hover:w-1/2 hover:aspect-video truncate group" style={{ backgroundImage: `url(https://melody-flow.online/playlistImg/${playlist.image})` }} onClick={() => { imageInput.current.click() }}></div>
                    <input type="file" className="hidden" ref={imageInput} onChange={onSelectFile} />
                    <h1 className="absolute top-[25%] right-1/2 translate-x-1/2 text-4xl font-bold text-pink-600">Name</h1>
                    <button className="absolute top-28 lg:right-40 right-24 translate-x-1/2 -translate-y-1/2 hover:scale-110 w-[20%] max-w-[180px] lg:aspect-video aspect-square bg-red-600 flex items-center justify-center text-white text-3xl font-bold rounded-xl transition-all duration-200 hover:bg-white hover:text-red-500" onClick={() => { deletePlaylist() }}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <div className="w-full h-[350px] rounded-lg truncate overflow-auto scroll-smooth" style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
                        {musics && musics.length > 0 ? musics.map((e, i) => {
                            return (
                                <div className="w-full h-[25%] flex bg-white/10 hover:bg-black-100/40 transition-all duration-200 last:rounded-b-lg" key={i}>
                                    <div className="h-full aspect-square p-2">
                                        <div className="bg-cover bg-center w-full h-full rounded-md" style={{ backgroundImage: `url(https://melody-flow.online/musicImg/${e.coverUrl})` }}></div>
                                    </div>
                                    <h3 className="w-full h-full flex items-center justify-center text-lg text-white">{e.title}</h3>
                                    <div className="h-full aspect-square p-4" onClick={() => { deleteFromPlaylist(e) }}>
                                        <button className="w-full h-full flex items-center justify-center bg-red-600 rounded-md text-white hover:text-red-600 hover:bg-white transition-colors duration-200">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        }) :
                            <div className="flex items-center justify-center w-full h-full text-white/50 text-base flex-col gap-8 bg-black-100">
                                <i className="fa-solid fa-face-dizzy text-9xl"></i>
                                <p>This artist don't have album</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistIdPage