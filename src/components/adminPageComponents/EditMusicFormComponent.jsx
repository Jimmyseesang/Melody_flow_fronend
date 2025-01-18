import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"

const EditMusicForm = (props) => {

    const { isEditMusic, setIsEditMusic, music } = props

    const { apiHost, apiPort, token } = useContext(ProfileContext)
    const API_URL = apiHost + '/api'

    const [title, setTitle] = useState()
    const [genre, setGenre] = useState([])

    useEffect(() => {
        setTitle(music.title)
        if(Object.keys(music).length === 0) {
            
        }else {
            const genreList = music.genre.split(',')
            setGenre(genreList)
        }
    },[isEditMusic])

    return (
        <div className={`bg-black-100/50 backdrop-blur h-full w-full absolute z-10 items-center justify-center ${isEditMusic ? 'flex' : 'hidden'}`}>
            <div className="w-1/2 h-[700px] bg-black-200 rounded-lg relative flex items-center justify-center">
                <div className="w-12 aspect-square top-4 right-4 absolute flex items-center justify-center text-3xl text-white hover:cursor-pointer hover:scale-125 transition-all duration-200 hover:text-pink-600" onClick={() => { setIsEditMusic(false) }}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <form className="h-full w-1/2 flex flex-col items-center justify-center p-8 gap-y-8">
                    <h1 className="text-3xl font-bold text-pink-600">Music Info</h1>
                    <div className="text-white w-full flex justify-between gap-x-4">
                        <label className="text-lg font-bold flex items-center">Title</label>
                        <input type="text" className="grow rounded bg-black-100 p-2" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                    </div>
                    <div className="text-white w-full flex gap-x-4">
                        <h2>Genre</h2>
                        <div className="flex gap-2 w-full flex-wrap">
                            {genre.map(e => {
                                return <p className="bg-pink-600 px-3 rounded-full flex items-center justify-center gap-x-2">{e}<i className="fa-solid fa-xmark bg-pink-800 rounded-full hover:cursor-pointer"></i></p>
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="w-64 aspect-square bg-cover bg-center rounded-lg" style={{backgroundImage: `url(${API_URL}/musicImg/${music.coverUrl})`}}></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditMusicForm