import { useState } from "react"
import NavBarComponent from "../components/NavBarComponent"
import axios from "axios"
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
    
    // alert box variable
    const [saveDataAlert, setSaveDataAlert] = useState(false)

    const clearValue = () => {

        setTitle('')
        setArtist('')
        setGenre('')

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
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            clearValue()
            if(response.status === 200) {
                setSaveDataAlert(true)
                setTimeout(() => {
                    setSaveDataAlert(false)     
                },[1500])
            }
        }

    }


    return (
        <div className="min-h-screen w-full bg-black-200/90 truncate">
            <div className={`w-[350px] h-[100px] bg-black-200 top-8 -right-96 fixed rounded border-l-8 border-green-500 transition-all ${saveDataAlert ? 'animate-alertBox' : 'animate-alertBlack'}`}>
                <div className="text-green-500 flex justify-evenly items-center w-full h-full">
                    <i className="fa-regular fa-circle-check text-4xl"></i>
                    <div className="text-lg font-bold">Upload music success</div>
                </div>
            </div>
            <NavBarComponent />
            <section className="w-full lg:mt-0 mt-[150px] lg:mt-[90px]">
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
                                onFocus={() => {setTitleAlert(false)}}
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
                                onFocus={() => {setArtistAlert(false)}}
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
                                onFocus={() => {setGenreAlert(false)}}
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
                                onFocus={() => {setAudioAlert(false)}}
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
                                onFocus={() => {setCoverAlert(false)}}
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
        </div>
    )
}

export default AdminPage