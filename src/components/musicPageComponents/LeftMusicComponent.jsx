import { useContext, useEffect, useRef, useState } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"
import { MusicContext } from "../../contexts/MusicContext"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

const LeftMusicComponent = (props) => {

    const navigate = useNavigate()

    const audio = useRef(null)
    const progressBar = useRef(null)
    const progressContainer = useRef(null)
    const soundProgress = useRef(null)
    const soundProgressContain = useRef(null)
    const plImgRef = useRef(null)

    // id
    const { musicId, playlistId, artistId } = useParams()
    const [path, setPath] = useState(location.pathname)

    // Props
    const { music, nextMusic, prevMusic, sendMessage } = props

    // Context
    const { apiHost, apiPort, profile, token, fetchProfile } = useContext(ProfileContext)
    const { getAllMusic } = useContext(MusicContext)

    // State
    const [isPlay, setIsPlay] = useState(false)
    const [musicDuration, setMusicDuration] = useState('0:00')
    const [progress, setProgress] = useState('0:00')
    const [isAddToPlaylist, setisAddToPlaylist] = useState(false)
    const [isAddPlaylist, setIsAddPlaylist] = useState(false)
    const [sound, setSound] = useState(100)
    const [isMute, setIsMute] = useState(false)

    // Form State
    const [plTitle, setPlTitle] = useState('')
    const [plImg, setPlImg] = useState('')
    const [imgPrev, setImgPrev] = useState('')

    const [plTitleAlert, setPlTitleAlert] = useState(false)
    const [plImgAlert, setPlImgAlert] = useState(false)

    // Like State
    const [like, setLike] = useState()

    const handlePrev = () => {
        setIsPlay(false)
        if (musicId && playlistId) {
            navigate(`/list/${playlistId}/${prevMusic._id}`)
        }
        else if (window.location.pathname.split('/')[1] === 'like') {
            navigate(`/like/${prevMusic._id}`)
        }
        else if (window.location.pathname.split('/')[1] === 'artistMusic') {
            navigate(`/artistMusic/${artistId}/${prevMusic._id}`)
        }
        else {
            navigate(`/music/${prevMusic._id}`)
        }

    }

    const handleNext = () => {
        setIsPlay(false)
        if (musicId && playlistId) {
            navigate(`/list/${playlistId}/${nextMusic._id}`)
        }
        else if (window.location.pathname.split('/')[1] === 'like') {
            navigate(`/like/${nextMusic._id}`)
        }
        else if (window.location.pathname.split('/')[1] === 'artistMusic') {
            navigate(`/artistMusic/${artistId}/${nextMusic._id}`)
        }
        else {
            navigate(`/music/${nextMusic._id}`)
        }
    }

    const handlePlay = () => {
        if (audio.current) {
            if (isPlay) {
                audio.current.pause();
            } else {
                audio.current
                    .play()
                    .then(() => {
                        console.log("Playback started");
                    })
                    .catch((err) => {
                        console.error("Playback error:", err);
                        alert("Please interact with the document to start playback.");
                    });
            }
            setIsPlay(!isPlay);
        }
    };

    const handleSpacebar = (key) => {

        if (key === 'Space') {
            setIsPlay(!isPlay)
            handlePlay()
        }

    }

    const handleMusicDuration = () => {

        const duration = audio.current.duration
        const minutes = Math.floor(duration / 60)
        const seconds = Math.floor(duration % 60)
        setMusicDuration(`${minutes}:${String(seconds).padStart(2, '0')}`)

    }

    const upDateProgressBar = () => {

        const progressPercent = (audio.current.currentTime / audio.current.duration) * 100
        progressBar.current.style.width = `${progressPercent}%`
        const minutes = Math.floor(audio.current.currentTime / 60)
        const seconds = Math.floor(audio.current.currentTime % 60)
        setProgress(`${minutes}:${String(seconds).padStart(2, '0')}`)

    }

    const handleProgressBar = (e) => {

        const rect = progressContainer.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left
        const width = rect.width
        const newTime = (clickX / width) * audio.current.duration
        audio.current.currentTime = newTime
        upDateProgressBar();

    }

    const handleVolume = (e) => {
        const element = soundProgressContain.current.getBoundingClientRect()
        const click = e.clientY - element.top
        const elementHeight = element.height

        const newVolume = Math.min(Math.max(1 - click / elementHeight, 0), 1)
        setSound(newVolume * 100)
        audio.current.volume = newVolume
        if (newVolume === 0) {
            setIsMute(true)
        } else {
            setIsMute(false)
        }

    }

    const handleMouseDown = (e) => {

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

        handleVolume(e)

    }

    const handleMouseMove = (e) => {
        handleVolume(e)
    }

    const handleMouseUp = (e) => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    const addPlaylist = async (data) => {

        const response = await axios.post(`http://${apiHost}:${apiPort}/playlist/addPlaylist`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

    }

    const clearForm = () => {

        setPlTitle('')
        setImgPrev('')
        setIsAddPlaylist(false)

    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (plTitle === '') {
            setPlTitleAlert(true)
        }

        if (plImg === '') {
            return setPlImgAlert(true)
        }

        const formData = new FormData()
        formData.append('title', plTitle)
        formData.append('image', plImg)

        await addPlaylist(formData)
        await fetchProfile()
        clearForm()

    }

    const handleAddToPlaylist = async (id) => {

        try {

            const data = { playlistId: id, musicId: music._id }

            await axios.post(`http://${apiHost}:${apiPort}/playlist/addToplaylist`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            sendMessage('good')

        }
        catch (err) {
            if (err.status === 409) {
                sendMessage('bad')
            }
            else {
                sendMessage('failed')
            }
        }
        finally {
            setisAddToPlaylist(false)
        }

    }

    const handleLike = async () => {

        const isLike = !like

        const updateLike = async (like) => {
            if (like) {
                console.log('like')

                const response = await axios.post(`http://${apiHost}:${apiPort}/music/likeMusic`, { musicId: music._id }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(response.data)

            } else {
                console.log('unlike')
                const response = await axios.post(`http://${apiHost}:${apiPort}/music/unlikeMusic`, { musicId: music._id }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(response.data)
            }
        }

        await updateLike(isLike)
        await fetchProfile()
        setLike(!like)


    }

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://${apiHost}:${apiPort}/playlist/deletePlaylist/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        console.log(response.data)
        await fetchProfile()

    }

    const handleMute = () => {
        if (!isMute) {
            audio.current.volume = 0
            setSound(0)
            setIsMute(true)
        } else {
            audio.current.volume = .5
            setSound(50)
            setIsMute(false)
        }
    }

    useEffect(() => {

        const handleKeyPress = (e) => {
            if (e.code === 'Space') {
                handlePlay();
            }
            else if (e.code === 'ArrowRight') {
                handleNext()
            }
            else if (e.code === 'ArrowLeft') {
                handlePrev()
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }

    }, [isPlay]);

    useEffect(() => {
        setIsPlay(true)
        audio.current.play()
        if (audio.current) {
            progressBar.current.style.width = '0%';
        }
        setisAddToPlaylist(false);
    }, [music]);


    useEffect(() => {
        return () => {
            if (imgPrev) {
                URL.revokeObjectURL(imgPrev); // ล้าง URL เมื่อ component ถูก unmount
            }
        };
    }, [imgPrev])

    useEffect(() => {

        const profileLike = profile.like

        setLike(profileLike && profileLike.some((music) => music._id === musicId))


    }, [musicId])

    return (
        <div className="lg:w-1/2 lg:h-full h-screen p-16 flex items-center justify-center mt-12 lg:mt-0">
            <div className="w-full max-w-[650px] min-w-[300px] h-full bg-white/25 backdrop-blur-2xl rounded-2xl border p-4" onKeyDown={(e) => { handleSpacebar(e.code) }}>
                {/* CD */}
                <div className="w-full h-2/3 flex items-center justify-center relative p-4">
                    <div className={`absolute bg-black-200 h-[500px] sm:w-[400px] w-[300px] top-0 rounded ${isAddToPlaylist ? 'block' : 'hidden'}  z-20`}>
                        <form className={`w-full h-full p-4 flex-col items-center justify-between gap-y-4 text-white ${isAddPlaylist ? 'flex' : 'hidden'} gap-y-4`} onSubmit={(e) => { handleSubmit(e) }}>
                            <div className="w-full h-14 relative">
                                <h1 className="sm:text-3xl text-2xl text-pink-600 font-bold w-full text-center h-full flex items-center justify-center">Create Playlist</h1>
                                <div className="absolute h-8 aspect-square hover:cursor-pointer top-1/2 -translate-y-1/2 left-0 P-2 hover:bg-pink-600 rounded-full transition-all duration-200 flex items-center justify-center" onClick={() => {
                                    setIsAddPlaylist(false)
                                    setPlImg('')
                                }}>
                                    <i className="fa-solid fa-arrow-left-long text-center"></i>
                                </div>
                            </div>
                            <div className="h-full flex flex-col justify-between w-full">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="pl-title" className="text-lg mb-4">Playlist name <span className={`${plTitleAlert ? 'inline-block' : 'hidden'} text-base text-red-600`}>Please Enter this files</span></label>
                                    <input type="text" className="rounded p-2 text-white outline-none focus:border-2 focus:border-pink-600 bg-black-100 border-transparent border-2 transition-all duration-200" id='pl-title' value={plTitle} onChange={(e) => { setPlTitle(e.target.value) }} onFocus={() => setPlTitleAlert(false)} />
                                </div>
                                <div className="flex flex-col items-center justify-center w-full h-full">
                                    <label htmlFor="pl-image" className="text-lg mb-4">Playlist image <span className={`${plImgAlert ? 'inline-block' : 'hidden'} text-base text-red-600`}>Please Enter this files</span></label>
                                    <input type="file" className="hidden" id="pl-image" ref={plImgRef}
                                        onClick={(e) => {
                                            setPlImgAlert(false)
                                            e.target.value = ''
                                        }}
                                        onChange={e => {
                                            setImgPrev(URL.createObjectURL(e.target.files[0]))
                                            setPlImg(e.target.files[0])
                                        }} />
                                    {imgPrev ?
                                        <div className="w-52 aspect-square relative border-2 rounded border-dashed hover:border-pink-600 transition-all duration-200">
                                            <div className="w-full h-full rounded bg-center bg-cover hover:opacity-60 hover:cursor-pointer flex items-center justify-center" style={{ backgroundImage: `url(${imgPrev})` }} onClick={() => { plImgRef.current.click() }}></div>
                                        </div>
                                        :
                                        <div className="w-52 aspect-square bg-black-200/20 rounded flex justify-center items-center flex-col border-white/50 border-2 border-dashed hover:border-pink-600 hover:cursor-pointer group hover:bg-black-100 transition-all duration-200" onClick={() => { plImgRef.current.click() }}>
                                            <i className="fa-solid fa-plus text-white/50 group-hover:text-pink-600 transition-all duration-200"></i>
                                        </div>
                                    }
                                </div>
                            </div>
                            <button className="bg-pink-600 px-4 py-2 rounded hover:bg-white hover:text-pink-600 transition-all duration-200" type="submit">Create</button>
                        </form>
                        <div className={`w-full h-full p-4 flex-col items-center justify-between gap-y-4 truncate relative ${isAddPlaylist ? 'hidden' : 'flex'}`}>
                            <div className="w-8 aspect-square absolute flex items-center justify-center right-6 top-6 hover:cursor-pointer z-10" onClick={() => { setisAddToPlaylist(false) }}>
                                <i className="fa-solid fa-xmark text-3xl text-white hover:text-red-600 transition-all duration-200"></i>
                            </div>
                            <h1 className="text-pink-600 font-bold sm:text-3xl text-2xl w-full h-14 flex items-center justify-center">Playlist</h1>
                            <ul className="flex h-full w-full flex-col truncate scrollbarCustom scroll-smooth" style={{ overflow: 'auto' }}>
                                <li className="min-h-[20%] bg-black-100 p-2 group hover:cursor-pointer rounded-t flex gap-2" key={0} onClick={() => { setIsAddPlaylist(true) }}>
                                    <div className="h-full scale-90 aspect-square bg-center bg-cover rounded group-hover:scale-100 transition-all duration-100 flex items-center justify-center bg-pink-600">
                                        <i className="fa-solid fa-plus text-2xl text-white"></i>
                                    </div>
                                    <div className="w-full h-full group-hover:bg-pink-600 rounded text-white flex items-center justify-center group-hover:text-black-100">Add playlist</div>
                                </li>
                                {profile.playlist.map((e, i) => {
                                    return (
                                        <li className="min-h-[20%] w-full bg-black-100 last:rounded-b p-2 flex gap-2" key={i}>
                                            <div className="w-full h-full flex gap-2 group hover:cursor-pointer flex-1" onClick={() => { handleAddToPlaylist(e._id) }}>
                                                <div className="h-full scale-90 aspect-square bg-center bg-cover rounded group-hover:scale-100 transition-all duration-100" style={{ backgroundImage: `url(http://${apiHost}:${apiPort}/playlistImg/${encodeURIComponent(e.image)})` }}></div>
                                                <div className="w-full h-full flex items-center justify-center text-base text-white rounded transition-all duration-200 group-hover:bg-pink-600/80">{e.title}</div>
                                            </div>
                                            <div className="h-full aspect-square text-red-600 flex items-center justify-center text-2xl hover:cursor-pointer hover:bg-red-600 hover:text-white rounded transition-all duration-200" onClick={() => { handleDelete(e._id) }}>
                                                <i className="fa-solid fa-trash-can"></i>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="w-[60%] md:min-w-[300px] min-w-[200px] aspect-square rounded-full bg-center bg-cover border-2 border-black-200 relative animate-spin1" style={{ backgroundImage: `url(http://${apiHost}:${apiPort}/musicImg/${music.coverUrl})` }}></div>
                    <div className="absolute top-0 left-0" onClick={() => { setisAddToPlaylist(!isAddToPlaylist) }}>
                        <i className="fa-solid fa-ellipsis-vertical text-white h-full aspect-square p-4 flex justify-center items-center text-2xl rounded-full hover:text-black-100 hover:cursor-pointer transition-all duration-200"></i>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center justify-center gap-8">
                        <div className={`text-black-200 hover:text-pink-600 ${like ? 'text-pink-600' : 'text-black-200'}`} onClick={() => { handleLike() }}>
                            <i className="fa-solid fa-heart h-full aspect-square p-4 flex justify-center items-center text-2xl rounded-full hover:cursor-pointer bg-white transition-all duration-200"></i>
                        </div>
                        <p className="text-xl font-bold text-white">{music.like && music.like.length}</p>
                    </div>
                    <div className="absolute bottom-40 right-8 hover:cursor-pointer" onClick={() => { handleMute() }}>
                        {isMute ? <i className="fa-solid fa-volume-xmark text-pink-100"></i> : <i className="fa-solid fa-volume-high text-pink-100"></i>}
                    </div>
                    <div className="h-[100px] w-5 bg-black-200 absolute bottom-10 right-8 rounded-full hover:cursor-pointer group hover:scale-x-150 transition-all duration-200 truncate" ref={soundProgressContain} onMouseDown={handleMouseDown}>
                        <div className="absolute w-full bg-pink-600 bottom-0 rounded-full" ref={soundProgress} style={{ height: `${sound}%` }}></div>
                    </div>
                </div>
                {/* content */}
                <div className="w-full h-1/3 bg-white/50 rounded-xl flex flex-col p-4 justify-between relative">
                    <div className="flex flex-col items-center w-full">
                        <h1 className="text-2xl font-bold">{music.title}</h1>
                        <p className="text-base">{music.artist}</p>
                    </div>
                    <div className="w-full flex justify-center items-end gap-4">
                        <div className="flex h-10 aspect-square bg-black-200 justify-center items-center text-white rounded-full text-base hover:text-pink-600 hover:cursor-pointer transition-all duration-all" onClick={() => { handlePrev() }}>
                            <i className="fa-solid fa-backward"></i>
                        </div>
                        <div className="flex h-16 aspect-square bg-black-200 justify-center items-center text-white rounded-full text-xl hover:text-pink-600 hover:cursor-pointer transition-all duration-all"
                            onClick={() => {
                                setIsPlay(!isPlay)
                                handlePlay()
                            }}>
                            <i className={`fa-solid ${isPlay ? 'fa-pause' : 'fa-play'}`}></i>
                        </div>
                        <div className="flex h-10 aspect-square bg-black-200 justify-center items-center text-white rounded-full text-base hover:text-pink-600 hover:cursor-pointer transition-all duration-all" onClick={() => { handleNext() }}>
                            <i className="fa-solid fa-forward"></i>
                        </div>
                    </div>
                    <div className="w-full h-2 bg-white rounded-full hover:cursor-pointer group" onClick={handleProgressBar} ref={progressContainer}>
                        <div className="h-full w-0 bg-pink-600 rounded-full relative" ref={progressBar}>
                            <div className="h-0 w-0 rounded-full bg-pink-600 absolute top-1/2 -translate-y-1/2 translate-x-1/2 right-0 transition-all duration-200 group-hover:h-4 group-hover:w-4"></div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between">
                        <p className="text-black-200">{progress}</p>
                        <p className="text-black-200">{musicDuration}</p>
                    </div>
                    <audio src={`http://${apiHost}:${apiPort}/musicFile/${music.audioUrl}`} ref={audio} preload="metadata" onLoadedMetadata={() => { handleMusicDuration() }} onTimeUpdate={upDateProgressBar} onEnded={handleNext}></audio>
                </div>
            </div>
        </div>
    )
}

export default LeftMusicComponent