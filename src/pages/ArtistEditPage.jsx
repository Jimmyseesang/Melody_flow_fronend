import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import { Slide, ToastContainer, toast } from "react-toastify"

import { ProfileContext } from "../contexts/ProfileContext"
import EditMusicForm from "../components/adminPageComponents/EditMusicFormComponent"
import NavBarComponent from "../components/NavBarComponent"

const ArtistEditPage = () => {

    const { artistId } = useParams()

    const navigate = useNavigate()

    const { apiHost, apiPort, token } = useContext(ProfileContext)

    const [artist, setArtist] = useState([])
    const [musics, setMusic] = useState([])
    const [isAddMusic, setIsAddMusic] = useState(false)
    const [isEditMusic, setIsEditMusic] = useState(false)
    const [musicEdit, setMusicEdit] = useState({})

    const imageInput = useRef(null)

    // Data Form
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [image, setImage] = useState()
    const [file, setfile] = useState()

    // alert Form
    const [titleAlert, setTitleAlert] = useState(false)
    const [genreAlert, setGenreAlert] = useState(false)
    const [imageAlert, setImageAlert] = useState(false)
    const [fileAlert, setFileAlert] = useState(false)

    const fetchArtist = async () => {
        const response = await axios.get(`http://${apiHost}:${apiPort}/admin/getArtistId/${artistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const artist = response.data.artist
        setArtist(artist)
        setMusic(artist.musics)
    }

    const uploadFile = async (image) => {
        const response = await axios.post(`http://${apiHost}:${apiPort}/admin/changeArtistImage/${artistId}`, image, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response.data)
        fetchArtist()
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

    // toast
    const alert = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }

    const alertFail = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        })
    }

    const chackData = () => {

        let status = true

        if (!title) {
            setTitleAlert(true)
            status = false
        }
        if (!genre) {
            setGenreAlert(true)
            status = false
        }
        if (!file) {
            setImageAlert(true)
            status = false
        }
        if (!image) {
            setFileAlert(true)
            status = false
        }


        return status
    }

    const clearValue = () => {

        setTitle('')
        setGenre('')

    }

    const addMusic = async (e) => {

        e.preventDefault()

        if (chackData()) {

            try {
                const formData = new FormData()
                formData.append('title', title)
                formData.append('artist', artist.name)
                formData.append('genre', genre)
                formData.append('image', image)
                formData.append('audio', file)

                const response = await axios.post(`http://${apiHost}:${apiPort}/admin/addMusic`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                console.log(response.data)
                await fetchArtist()
                clearValue()
                alert("Add music success")
                setIsAddMusic(false)

            } catch (err) {
                console.log(err)
                if (err.status === 404) {
                    alertFail("This artist doesn't exist yet.")
                }
                else {
                    alertFail("Error adding music.")
                }
            }

        }

    }

    const deleteMusic = async (music) => {
        try {
            await axios.delete(`http://${apiHost}:${apiPort}/admin/deleteMusic/${music._id}`, {
                headers: {
                    'authorization': `Bearer ${token}`,
                }
            })
            await fetchArtist()
            alert('Delete music success')
        }
        catch (err) {
            console.log(err)
            alertFail('Delete music fail')
        }
    }

    const deleteArtist = async () => {
        if (confirm('Do you want to delete this artist?')) {
            if (confirm('really!!!')) {

                try {
                    await axios.delete(`http://${apiHost}:${apiPort}/admin/deleteArtist/${artist._id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    navigate('/admin')
                }
                catch (err) {
                    console.log()
                }

            }
        }
    }

    const handleEdit = (music) => {
        setIsEditMusic(true)
        setMusicEdit(music)
    }

    useEffect(() => {
        fetchArtist()
    }, [])

    return (
        <section className="h-screen w-full bg-gradient-to-tr from-black-200 via-pink-600 to-pink-200 truncate relative ">
            <NavBarComponent />
            <ToastContainer />
            <EditMusicForm isEditMusic={isEditMusic} setIsEditMusic={setIsEditMusic} music={musicEdit} />
            <div className="w-[60%] h-[600px] min-w-[340px] bg-black-200 absolute lg:bottom-[40%] bottom-[35%] right-1/2 translate-x-1/2 translate-y-1/2 rounded-lg flex items-end p-8">
                <div className="sm:w-[35%] sm:min-w-[350px] min-w-[200px] aspect-square rounded-full bg-white bg-cover bg-center absolute right-1/2 sm:-top-16 -top-8 -translate-y-1/2 translate-x-1/2 hover:cursor-pointer hover:rounded-lg transition-all duration-1000 hover:w-1/2 hover:aspect-video truncate group" style={{ backgroundImage: `url(http://${apiHost}:${apiPort}/artistImage/${encodeURIComponent(artist.image)})` }} onClick={() => { imageInput.current.click() }}></div>
                <input type="file" className="hidden" ref={imageInput} onChange={onSelectFile} />
                <h1 className="absolute top-[25%] right-1/2 translate-x-1/2 text-4xl font-bold text-pink-600">{artist.name}</h1>
                <button className="absolute top-28 lg:left-40 left-24 -translate-x-1/2 -translate-y-1/2 hover:scale-110 w-[20%] max-w-[180px] lg:aspect-video aspect-square bg-green-600 flex items-center justify-center text-white text-3xl font-bold rounded-xl transition-all duration-200 hover:bg-white hover:text-green-500" onClick={() => { setIsAddMusic(true) }}>
                    <i className="fa-solid fa-plus"></i>
                </button>
                <button className="absolute top-28 lg:right-40 right-24 translate-x-1/2 -translate-y-1/2 hover:scale-110 w-[20%] max-w-[180px] lg:aspect-video aspect-square bg-red-600 flex items-center justify-center text-white text-3xl font-bold rounded-xl transition-all duration-200 hover:bg-white hover:text-red-500" onClick={() => { deleteArtist() }}>
                    <i className="fa-solid fa-trash"></i>
                </button>
                <div className="w-full h-[350px] rounded-lg truncate overflow-auto scroll-smooth" style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
                    {musics && musics.length > 0 ? musics.map((e, i) => {
                        return (
                            <div className="w-full h-[25%] flex bg-white/10 hover:bg-black-100/40 transition-all duration-200 last:rounded-b-lg" key={i}>
                                <div className="h-full aspect-square p-2">
                                    <div className="bg-cover bg-center w-full h-full rounded-md" style={{ backgroundImage: `url(http://${apiHost}:${apiPort}/musicImg/${encodeURIComponent(e.coverUrl)})` }}></div>
                                </div>
                                <h3 className="w-full h-full flex items-center justify-center text-lg text-white">{e.title}</h3>
                                {/* <div className="h-full aspect-square p-4" onClick={() => handleEdit(e)}>
                                    <button className="w-full h-full flex items-center justify-center bg-blue-600 rounded-md text-white hover:text-blue-600 hover:bg-white transition-colors duration-200">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div> */}
                                <div className="h-full aspect-square p-4" onClick={() => { deleteMusic(e) }}>
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
            <div className={`bg-black-100/50 backdrop-blur h-full w-full absolute z-10 items-center justify-center ${isAddMusic ? 'flex' : 'hidden'}`}>
                <div className="w-1/2 h-[700px] bg-black-200 rounded-lg relative">
                    <div className="w-12 aspect-square top-4 right-4 absolute flex items-center justify-center text-3xl text-white hover:cursor-pointer hover:scale-125 transition-all duration-200 hover:text-pink-600" onClick={() => { setIsAddMusic(false) }}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <form className="w-full h-full flex items-center justify-center flex-col gap-y-8" onSubmit={(e) => { addMusic(e) }}>
                        <h1 className="text-3xl font-bold text-white">Add Album</h1>
                        <div className="flex flex-col w-1/3">
                            <label htmlFor="title" className="text-white text-lg mb-2 font-bold">Title <span className={`text-red-600 font-normal text-base ${titleAlert ? 'inline-block' : 'hidden'}`}>please enter this field</span></label>
                            <input type="text" id="title" className="p-2 rounded" placeholder="title..." value={title} onChange={(e) => { setTitle(e.target.value) }} onFocus={() => { setTitleAlert(false) }} />
                        </div>
                        <div className="flex flex-col w-1/3">
                            <label htmlFor="genre" className="text-white text-lg mb-2 font-bold">Genre <span className={`text-red-600 font-normal text-base ${genreAlert ? 'inline-block' : 'hidden'}`}>please enter this field</span></label>
                            <input type="text" id="genre" className="p-2 rounded" placeholder="genre..." value={genre} onChange={(e) => { setGenre(e.target.value) }} onFocus={() => setGenreAlert(false)} />
                        </div>
                        <div className="flex flex-col w-1/3">
                            <label htmlFor="image" className="text-white text-lg mb-2 font-bold">Cover file <span className={`text-red-600 font-normal text-base ${imageAlert ? 'inline-block' : 'hidden'}`}>please enter this field</span></label>
                            <input type="file" id="image" className="bg-white p-2 rounded" onChange={(e) => { setImage(e.target.files[0]) }} onFocus={() => setImageAlert(false)} />
                        </div>
                        <div className="flex flex-col w-1/3">
                            <label htmlFor="music" className="text-white text-lg mb-2 font-bold">Music file <span className={`text-red-600 font-normal text-base ${fileAlert ? 'inline-block' : 'hidden'}`}>please enter this field</span></label>
                            <input type="file" id="music" className="bg-white p-2 rounded" onChange={(e) => { setfile(e.target.files[0]) }} onFocus={() => setFileAlert(false)} />
                        </div>
                        <button type="submit" className="py-2 px-8 bg-pink-600 text-white hover:text-pink-600 hover:bg-white transition-all duration-200 rounded hover:scale-125">ADD</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ArtistEditPage