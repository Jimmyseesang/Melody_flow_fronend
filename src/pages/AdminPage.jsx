import { useState } from "react"
import NavBarComponent from "../components/NavBarComponent"

const AdminPage = () => {

    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [file, setFile] = useState('')
    const [titleAlert, setTitleAlert] = useState(false)
    const [artistAlert, setArtistAlert] = useState(false)
    const [fileAlert, setFileAlert] = useState(false)
    const formdata = new FormData()

    const dataChack = () => {

        setTitleAlert(() => {title === '' || null ? true : false})
        setArtistAlert(() => {artist === '' || null ? true : false})
        setFileAlert(() => {file === '' || null ? true : false})

    }

    const handleSubmit = (e) => {

        e.preventDefault()
        dataChack()
        console.log(title, artist, typeof(file), file)

    }

    return(
        <div className="min-h-screen w-full bg-black-200/90 truncate">
            <NavBarComponent/>
            <section className="w-full lg:mt-0 mt-[90px] md:mt-[150px]">
                <div className="text-white mt-20">
                    <h1 className="text-center text-4xl font-bold text-pink-600">Admin</h1>
                </div>
                <div className="w-full flex justify-center items-center">
                    <form className="text-white" onSubmit={handleSubmit}>
                        <div className="flex flex-col my-4">
                            <label htmlFor="music-title" className="label-style">Title <span className={`${titleAlert ? 'hidden' : ''}`}>alert  </span></label>
                            <input 
                                type="text" 
                                placeholder="title..."
                                id="music-title"
                                className="input-style"
                                onChange={(e) => {setTitle(e.target.value)}}
                            />
                        </div>
                        <div className="flex flex-col my-4">
                            <label htmlFor="artist" className="label-style">Artist <span className={`${artistAlert ? 'hidden' : ''}`}>alert</span></label>
                            <input  
                                type="text" 
                                placeholder="artist..."
                                id="artist"
                                className="input-style"
                                onChange={(e) => {setArtist(e.target.value)}}
                            />
                        </div>
                        <div className="flex flex-col my-4">
                            <label htmlFor="music-file" className="label-style">File <span className={`${fileAlert ? 'hidden' : ''}`}>alert</span></label>
                            <input 
                                type="file" 
                                id="music-file"
                                className="bg-white p-2 rounded text-pink-500"
                                onChange={(e) => {setFile(e.target.files[0])}}
                            />
                        </div>
                        <div className="flex justify-center items-center mt-8">
                            <button className="bg-pink-600 p-3 rounded w-1/2 hover:bg-black-200 hover:text-pink-600 hover:border-2 border-pink-600" type="submit">Enter</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default AdminPage