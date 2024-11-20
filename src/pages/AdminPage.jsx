import { useEffect, useState } from "react"
import axios from "axios"
import { Slide, ToastContainer, toast } from "react-toastify"

import NavBarComponent from "../components/NavBarComponent"

const apiHost = import.meta.env.VITE_SERVER_HOST
const apiPort = import.meta.env.VITE_SERVER_PORT

const AdminPage = () => {

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

    const getAllMusic = async () => {

        const response = await axios.get(`http://${apiHost}:${apiPort}/music/findAllMusic`)

        setMusic(response.data.music)

    }

    const deleteMusic = async (id) => {

        const token = localStorage.getItem('token')

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
            console.log('errr')
        }


    }

    const editMusic = async (id) => {
        const token = localStorage.getItem('token')
        const response = await axios.patch(`http://${apiHost}:${apiPort}/admin/editMusic/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            },
        })
    }


    const handleSubmit = async (e) => {

        e.preventDefault()
        if (dataChack()) {
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
                    'Content-Type': 'multipart/form-data'
                }
            })
            clearValue()
            if (response.status === 200) {
                getAllMusic()
                alert('Add music success')
            }
        }

    }

    useEffect(() => {
        getAllMusic()
    }, [])

    return (
        <div className="min-h-screen w-full bg-black-200/90 truncate">
            <NavBarComponent />
            <ToastContainer/>
            <section className="w-full h-screen lg:mt-0 mt-[150px] lg:mt-[90px]">
                <div className="text-white mt-20">
                    <h1 className="text-center text-4xl font-bold text-pink-600">Admin</h1>
                </div>
                <div className="w-full flex justify-center items-center">
                    <form className="text-white" onSubmit={handleSubmit}>
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
                        <div className="flex flex-col my-4">
                            <label htmlFor="artist" className="label-style">Artist</label>
                            <input
                                type="text"
                                placeholder="artist..."
                                id="artist"
                                className="input-style"
                                value={artist}
                                onFocus={() => { setArtistAlert(false) }}
                                onChange={(e) => { setArtist(e.target.value) }}
                            />
                            <p className={`text-red-700 ${artistAlert ? '' : 'hidden'}`}>Please enter this field!!!</p>
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
                        <div className="flex justify-center items-center mt-8">
                            <button className="bg-pink-600 p-3 rounded w-1/2 hover:bg-black-200 hover:text-pink-600 hover:border-2 border-pink-600 transition-all duration-[.5s]" type="submit" >Enter</button>
                        </div>
                    </form>
                </div>
            </section>
            <section className="w-full h-screen mt-36 flex justify-center items-center">
                <div className=" w-[70%] flex flex-col justify-center items-center">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-white">Manage <i className="fa-solid fa-gear text-pink-600"></i></h1>
                    </div>
                    <div className="w-full max-h-[526px] truncate" style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
                        <table className="w-full">
                            <thead className="text-xl sticky top-0 bg-pink-600  text-black-200">
                                <tr>
                                    <th className="w-[25%] p-4">title</th>
                                    <th className="w-[25%]">artist</th>
                                    <th className="w-[5%]">gerne</th>
                                    <th className="w-[10%]">Edit</th>
                                    <th className="w-[10%]">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="text-base bg-white">
                                {music.map((e, i) => {
                                    return <tr className="w-full border-b" key={e._id}>
                                        <td className="text-center border ">{e.title}</td>
                                        <td className="text-center border">{e.artist}</td>
                                        <td className="text-center border">{e.genre}</td>
                                        <td className="p-2 border place-items-center ">
                                            <button className="bg-blue-500 w-1/2 text-white py-2 px-8 rounded flex justify-center items-center hover:bg-blue-700" onClick={() => { setEditStatus(true) }}>edit</button>
                                        </td>
                                        <td className="text-center p-4 w-[10%] border">
                                            <button className="px-8 py-2 bg-red-600 rounded text-white hover:bg-red-800" onClick={() => { deleteMusic(e._id) }}>delete</button>
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
                            <div className="absolute"></div>
                            <div>
                                <h1 className="text-4xl text-white font-bold"><span className="text-pink-600">E</span>dit</h1>
                            </div>
                            <div>
                                <form>
                                    <div className="flex flex-col py-4">
                                        <label htmlFor="title-edit" className="text-white">Title</label>
                                        <input type="text" className="bg-black-300 rounded text-black p-2" placeholder="title..." />
                                    </div>
                                    <div className="flex flex-col py-4">
                                        <label htmlFor="title-edit" className="text-white">artist</label>
                                        <input type="text" className="bg-black-300 rounded text-black p-2" placeholder="title..." />
                                    </div>
                                    <div className="flex flex-col py-4">
                                        <label htmlFor="title-edit" className="text-white">genre</label>
                                        <input type="text" className="bg-black-300 rounded text-black p-2" placeholder="title..." />
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button type="submit" className="bg-pink-600 px-4 py-2 rounded">Enter</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminPage