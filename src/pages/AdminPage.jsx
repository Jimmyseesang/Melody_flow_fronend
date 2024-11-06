import { useState } from "react"
import NavBarComponent from "../components/NavBarComponent"

const AdminPage = () => {

    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [genre, setGenre] = useState('')
    const [audio, setAudio] = useState('')
    const [cover, setCover] = useState('')

    const [titleAlert, setTitleAlert] = useState(false)
    const [artistAlert, setArtistAlert] = useState(false)
    const [genreAlert, setGenreAlert] = useState(false)
    const [audioAlert, setAudioAlert] = useState(false)
    const [coverAlert, setCoverAlert] = useState(false)

    const dataChack = () => {

        let status = true

        if(title === '' || null) {
            setTitleAlert(true)
            status = false
            
        }
        if(artist === '' || null) {
            setArtistAlert(true)
            status = false
        }
        if(genre === '' || null) {
            setGenreAlert(true)
            status = false
        }
        if(audio === '' || null) {
            setAudioAlert(true)
            status = false
        }
        if(cover === '' || null) {
            setCoverAlert(true)
            status = false
        }


        return status

    }

    const handleSubmit = (e) => {

        e.preventDefault()
        if(dataChack()) {
            const formdata = {title, artist, audio}
            console.log(formdata)
        }

    }

    return(
        <div className="min-h-screen w-full bg-black-200/90 truncate">
            <NavBarComponent/>
            <section className="w-full lg:mt-0 mt-[150px] lg:mt-[90px]">
                <div className="text-white mt-20">
                    <h1 className="text-center text-4xl font-bold text-pink-600">Admin</h1>
                </div>
                <div className="w-full flex justify-center items-center">
                    <form className="text-white" onSubmit={handleSubmit}>
                        <div className="flex flex-col my-4">
                            <label htmlFor="music-title" className="label-style">Title</label>
                            <input 
                                type="text" 
                                placeholder="title..."
                                id="music-title"
                                className="input-style"
                                onChange={(e) => {setTitle(e.target.value)}}
                            />
                            <p className={`text-red-700 ${titleAlert ? '' : 'hidden'}`}>Please enter this field!!!</p>
                        </div>
                        <div className="flex flex-col my-4">
                            <label htmlFor="artist" className="label-style">Artist</label>
                            <input  
                                type="text" 
                                placeholder="artist..."
                                id="artist"
                                className="input-style"
                                onChange={(e) => {setArtist(e.target.value)}}
                            />
                            <p className={`text-red-700 ${artistAlert ? '' : 'hidden'}`}>Please enter this field!!!</p>
                        </div>
                        <div className="flex flex-col my-4">
                            <label htmlFor="genre" className="label-style">Genre</label>
                            <input  
                                type="text" 
                                placeholder="genre..."
                                id="genre"
                                className="input-style"
                                onChange={(e) => {setGenre(e.target.value)}}
                            />
                            <p className={`text-red-700 ${genreAlert ? '' : 'hidden'}`}>Please enter this field!!!</p>
                        </div>
                        <div className="flex flex-col my-4">
                            <label htmlFor="music-file" className="label-style">File</label>
                            <input 
                                type="file" 
                                id="music-file"
                                className="bg-white p-2 rounded text-pink-500 hover:cursor-pointer"
                                onChange={(e) => {setAudio(e.target.files[0])}}
                            />
                            <p className={`text-red-700 ${audioAlert ? '' : 'hidden'}`}>Please enter input file!!!</p>
                        </div>
                        <div className="flex flex-col my-4">
                            <label htmlFor="cover-file" className="label-style">Cover file</label>
                            <input 
                                type="file" 
                                id="cover-file"
                                className="bg-white p-2 rounded text-pink-500 hover:cursor-pointer"
                                onChange={(e) => {setCover(e.target.files[0])}}
                            />
                            <p className={`text-red-700 ${coverAlert ? '' : 'hidden'}`}>Please enter input file!!!</p>
                        </div>
                        <div className="flex justify-center items-center mt-8">
                            <button className="bg-pink-600 p-3 rounded w-1/2 hover:bg-black-200 hover:text-pink-600 hover:border-2 border-pink-600 transition-all duration-[.5s]" type="submit">Enter</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default AdminPage