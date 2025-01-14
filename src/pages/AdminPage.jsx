import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Slide, ToastContainer, toast } from "react-toastify"

import NavBarComponent from "../components/NavBarComponent"
import ArtistFormComponent from "../components/adminPageComponents/ArtistFormComponent"
import ArtistListComponent from "../components/adminPageComponents/ArtistListComponent"
import { ProfileContext } from "../contexts/ProfileContext"
import { MusicContext } from "../contexts/MusicContext"

const AdminPage = () => {

    const { apiHost, apiPort, token } = useContext(ProfileContext)
    const { musics, getAllMusic } = useContext(MusicContext)

    // data variable
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [genre, setGenre] = useState('')
    const [audio, setAudio] = useState('')
    const [cover, setCover] = useState('')

    // alert variable
    const [titleAlert, setTitleAlert] = useState(false)
    const [artistAlert, setArtistAlert] = useState(false)
    const [genreAlert, setGenreAlert] = useState(false)
    const [audioAlert, setAudioAlert] = useState(false)
    const [coverAlert, setCoverAlert] = useState(false)

    const [editStatus, setEditStatus] = useState(false)
    const [artists, setArtists] = useState()
    const [selectArtist, setSelectArtist] = useState(false)

    const getArtist = async () => {
        const response = await axios.get(`http://${apiHost}:${apiPort}/admin/getArtistAll`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setArtists(response.data.artists)
    }

    // music data
    const [music, setMusic] = useState([])

    const clearValue = () => {

        setTitle('')
        setArtist('')
        setGenre('')

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

    const dataChack = () => {

        let status = true

        if (!title) {
            setTitleAlert(true)
            status = false
        }
        if (!artist) {
            setArtistAlert(true)
            status = false
        }
        if (!genre) {
            setGenreAlert(true)
            status = false
        }
        if (!audio) {
            setAudioAlert(true)
            status = false
        }
        if (!cover) {
            setCoverAlert(true)
            status = false
        }


        return status

    }

    const deleteMusic = async (id) => {

        if (confirm("Do you want to delete music?")) {
            const response = await axios.delete(`http://${apiHost}:${apiPort}/admin/deleteMusic/${id}`, {
                headers: {
                    'authorization': `Bearer ${token}`,
                }
            })

            if (response.status === 200) {
                getAllMusic()
                alert('Delete music success')
            }
            else {
                console.log('error')
            }
        }

    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        if (dataChack()) {
            try {
                const formData = new FormData()
                formData.append('title', title)
                formData.append('artist', artist)
                formData.append('genre', genre)
                formData.append('audio', audio)
                formData.append('image', cover)

                const token = localStorage.getItem('token')

                const response = await axios.post(`http://${apiHost}:${apiPort}/admin/addMusic`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                console.log(response.data)
                clearValue()
                getAllMusic()
                alert('Add music success')
            }
            catch (err) {
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

    const onArtistSelect = (artist) => {
        setArtist(artist.name)
        setSelectArtist(false)
    }

    useEffect(() => {
        getAllMusic()
        getArtist()
    }, [])

    return (
        <div className="min-h-screen w-full bg-black-200/90 truncate">
            <NavBarComponent />
            <ToastContainer />
            <ArtistFormComponent alert={alert} alertFail={alertFail} getArtist={getArtist} />
            <section className="w-full h-screen flex flex-col items-center justify-center">
                <div className="text-white">
                    <h1 className="text-center sm:text-4xl font-bold text-pink-600 text-xl">Add Music</h1>
                </div>
                <div className="flex flex-col items-center gap-y-4">
                    <form className="text-white w-4/6 sm:w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-col my-4">
                            {/* title */}
                            <label htmlFor="music-title" className="label-style">Title</label>
                            <input
                                type="text"
                                placeholder="title..."
                                id="music-title"
                                className="input-style"
                                value={title}
                                onFocus={() => { setTitleAlert(false) }}
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                            <p className={`text-red-700 ${titleAlert ? '' : 'hidden'}`}>Please enter this field!!!</p>
                        </div>
                        {/* artist */}
                        <div className="flex flex-col my-4 relative">
                            <label htmlFor="artist" className="text-lg font-bold">Artist</label>
                            <h2 className="bg-white w-full h-10 rounded text-black-100 flex items-center justify-between p-2 hover:cursor-pointer" onClick={() => { setSelectArtist(!selectArtist) }}>{artist ? artist : 'Select an artists'}<span><i className="fa-solid fa-angle-down"></i></span></h2>
                            <ul className={`bg-white w-full h-[260px] rounded absolute ${selectArtist ? 'flex' : 'hidden'} top-20 truncate flex-col items-center scroll-smooth`} style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
                                {artists && artists.map(artist => {
                                    return (
                                        <li className="min-h-[25%] w-full text-black-200 flex items-center justify-center hover:bg-black-200 hover:cursor-pointer hover:text-pink-600" onClick={() => onArtistSelect(artist)} key={artist._id}>{artist.name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        {/* genre */}
                        <div className="flex flex-col my-4">
                            <label htmlFor="genre" className="label-style">Genre</label>
                            <input
                                type="text"
                                placeholder="genre..."
                                id="genre"
                                className="input-style"
                                value={genre}
                                onFocus={() => { setGenreAlert(false) }}
                                onChange={(e) => { setGenre(e.target.value) }}
                            />
                            <p className={`text-red-700 ${genreAlert ? '' : 'hidden'}`}>Please enter this field!!!</p>
                        </div>
                        {/* cover music */}
                        <div className="flex flex-col my-4">
                            <label htmlFor="cover-file" className="label-style">Cover file</label>
                            <input
                                type="file"
                                id="cover-file"
                                className="bg-white p-2 rounded text-pink-500 hover:cursor-pointer"
                                onFocus={() => { setCoverAlert(false) }}
                                onChange={(e) => { setCover(e.target.files[0]) }}
                            />
                            <p className={`text-red-700 ${coverAlert ? '' : 'hidden'}`}>Please enter input file!!!</p>
                        </div>
                        {/* music file */}
                        <div className="flex flex-col my-4">
                            <label htmlFor="music-file" className="label-style">File</label>
                            <input
                                type="file"
                                id="music-file"
                                className="bg-white p-2 rounded text-pink-500 hover:cursor-pointer"
                                onFocus={() => { setAudioAlert(false) }}
                                onChange={(e) => { setAudio(e.target.files[0]) }}
                            />
                            <p className={`text-red-700 ${audioAlert ? '' : 'hidden'}`}>Please enter input file!!!</p>
                        </div>
                        <div className="flex justify-center items-center mt-8">
                            <button className="bg-pink-600 p-3 rounded w-1/2 hover:bg-black-200 hover:text-pink-600 hover:border-2 border-pink-600 transition-all duration-[.5s]" type="submit" >Enter</button>
                        </div>
                    </form>
                </div>
            </section>
            <section className="w-full h-screen flex justify-center items-center">
                <div className="w-[70%] flex flex-col justify-center items-center">
                    <div className="mb-12">
                        <h1 className="sm:text-4xl font-bold text-white text-xl">Manage Music <i className="fa-solid fa-gear text-pink-600"></i></h1>
                    </div>
                    <div className="w-full max-h-[526px] truncate min-w-[250px]" style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
                        <table className="w-full">
                            <thead className="sm:text-xl text-base sticky top-0 bg-pink-600 text-black-200">
                                <tr>
                                    <th className="w-[25%] p-4 truncate">title</th>
                                    <th className="w-[25%]">artist</th>
                                    <th className="w-[5%] sm:table-cell hidden">gerne</th>
                                    <th className="w-[10%]">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="sm:text-base text-sm bg-white">
                                {musics.map((e, i) => {
                                    return <tr className="w-full border-b" key={e._id}>
                                        <td className="text-center border truncate">{e.title}</td>
                                        <td className="text-center border">{e.artist}</td>
                                        <td className="text-center border sm:table-cell hidden">{e.genre}</td>
                                        <td className="text-center p-4 w-[10%] border">
                                            <button className="sm:px-8 px-2 py-2 bg-red-600 rounded text-white hover:bg-red-800" onClick={() => { deleteMusic(e._id) }}>delete</button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={`fixed w-full h-full bg-black-200/40 top-0 left-0 z-30 backdrop-blur transition-all duration-200 ${editStatus ? 'block' : 'hidden'}`}>
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-1/2 h-[70%] bg-black-200 roundedz-30 flex flex-col justify-center items-center rounded relative">
                            <div className="absolute h-10 aspect-square top-4 right-4 flex items-center justify-center hover:cursor-pointer rounded-full group" onClick={() => setEditStatus(false)}>
                                <i className="fa-solid fa-xmark text-3xl text-pink-600 group-hover:text-white transition-all duration-100"></i>
                            </div>
                            <div className="absolute"></div>
                            <div>
                                <h1 className="text-4xl text-white font-bold"><span className="text-pink-600">E</span>dit</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ArtistListComponent alert={alert} alertFail={alertFail} artists={artists} getArtist={getArtist} />
        </div>
    )
}

export default AdminPage