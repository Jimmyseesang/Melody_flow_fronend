import NavBarComponent from "../components/NavBarComponent"
import CircleComponent from "../components/CircleComponent"
import MusicListComponent from "../components/MusicListComponent"

import { MusicContext } from "../contexts/MusicContext"
import { ProfileContext } from "../contexts/ProfileContext"

import axios from "axios"
import { useState, useRef, useEffect, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"


const HomePage = () => {

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    const imageContainer = useRef(null)

    const bubbles = useMemo(() => bubble(20), [])

    const navigate = useNavigate()

    // Context
    const { fetchProfile, token, apiHost, apiPort } = useContext(ProfileContext)
    const { musics, setMusics, getAllMusic } = useContext(MusicContext)

    // State
    const [genre, setGenre] = useState({})
    const [searchWord, setSearchWord] = useState()
    const [artistList, setArtistList] = useState([])

    const fetchGenre = async () => {

        const response = await axios.get(`http://${apiHost}:${apiPort}/music/findGenre`)

        setGenre(response.data.genre)

    }

    const searchMusic = async (e) => {
        if (e.key === 'Enter') {
            try {
                const response = await axios.post(`http://${apiHost}:${apiPort}/user/search`,
                    { word: searchWord },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                const musicArray = response.data.music

                let updateMusic = musics.filter(
                    item => !musicArray.some(music => music._id === item._id)
                )
                updateMusic.unshift(...musicArray)

                setMusics(updateMusic)

            } catch (error) {
                console.error("Error searching music:", error)
            }
        } else {
            return;
        }
    }

    const handleGenreClick = async (genre) => {
        console.log(genre)
        const response = await axios.post(`http://${apiHost}:${apiPort}/user/searchGenre`, { genre }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const musicGenre = response.data.filterMusics
        console.log(musicGenre)
        setMusics(musicGenre)
    }

    const fetchArtistRec = async () => {
        const response = await axios.get(`http://${apiHost}:${apiPort}/music/recomArtist`)
        setArtistList(response.data.artist)
    }

    const handleArtistClick = async (artist) => {
        navigate(`/artistMusic/${artist._id}/${artist.musics[0]}`)
    }

    const handleLeft = () => {
        const container = imageContainer.current
        container.scrollLeft -= 450
    }

    const handleRight = () => {
        const container = imageContainer.current
        container.scrollLeft += 450
    }

    const checkVisibleImage = () => {
        const container = imageContainer.current
    }

    useEffect(() => {
        fetchProfile()
        fetchGenre()
        fetchArtistRec()
    }, [token, musics])

    useEffect(() => {
        const container = imageContainer.current
        container.addEventListener('scroll', checkVisibleImage)
        checkVisibleImage()
    }, [])

    return (
        <div className="min-h-screen h-full bg-gradient-to-tr from-pink-500 to-black-100 relative truncate" style={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
            <NavBarComponent />
            <div className="h-full w-full absolute blur-2xl bg-black-200/10 truncate z-0">
                {bubbles}
            </div>
            <section className="min-h-screen h-full lg:ml-[90px] lg:mt-0 mt-[90px] relative">
                <div className="w-[99%] min-h-screen h-full absolute right-1/2 translate-x-1/2 rounded flex flex-col p-4">
                    <div className="w-full h-[100px] flex justify-center items-center my-4">
                        <input type="text" className="bg-white/30 placeholder:text-white p-2 rounded-full h-12 w-1/5 min-w-48 lg:focus:w-1/3 focus:w-1/2  outline-0 focus:outline focus:outline-2 outline-pink-500 transition-all duration-200 placeholder:text-center text-center text-white" placeholder="Search..." onKeyUp={searchMusic} onChange={(e) => { setSearchWord(e.target.value) }} />
                    </div>
                    <div className="md:h-[850px] rounded-lg flex justify-between flex-col-reverse md:flex-row">
                        {/* section one */}
                        <div className="bg-black-200/50 md:h-full md:w-[50%] md:min-w-[400px] min-w-[250px] w-full flex flex-col justify-between items-center rounded-lg h-[800px] mb-4 md:mb-0">
                            <h1 className="text-center text-4xl font-bold text-white p-4 w-full bg-black-200 rounded-t-lg relative flex items-center justify-center">
                                <span className="text-pink-500">M</span>usic
                                <div className="absolute top-1/2 -translate-y-1/2 right-8 text-pink-600 text-xl hover:bg-pink-600 aspect-square h-10 rounded-full flex items-center justify-center transition-all hover:text-black-200 cursor-pointer hover:scale-125" onClick={() => {getAllMusic()}}>
                                    <i className="fa-solid fa-rotate-right"></i>
                                </div>
                            </h1>
                            <div className="h-full w-full flex flex-col truncate scroll-smooth scrollbarCustom overflow-y-auto" style={{ overflowY: 'auto' }}>
                                {musics.length > 0 && (musics.map((e, i) => { return <MusicListComponent {...e} image={`http://${apiHost}:${apiPort}/musicImg/${e.coverUrl}`} id={e._id} index={i} key={i} option={true} /> }))}
                            </div>
                        </div>
                        {/* section two */}
                        <div className="md:w-[66%] w-full md:flex-1 rounded-lg md:px-4 md:mt-0 flex flex-col items-center gap-y-4 gap-4 truncate scrollbarCustom mb-4 md:mb-0" style={{ overflowY: 'auto' }}>
                            <div className="h-full w-full flex-1 flex flex-col-reverse items-center justify-between rounded-lg gap-4">
                                <div className="w-full bg-black-200/50 md:h-full rounded-lg flex flex-col h-[300px]">
                                    <h1 className="bg-black-200 text-center text-white first-letter:text-pink-600 rounded-t-lg text-4xl font-bold p-4">Genre</h1>
                                    <div className=" p-4 flex flex-row flex-wrap gap-2 overflow-y-auto scrollbarCustom">
                                        {genre.length > 0 && genre.map((e, i) => <div className="w-fit bg-pink-600/80 h-[30px] flex items-center justify-center p-4 rounded-full text-black-100 hover:text-pink-600 hover:cursor-pointer hover:bg-black-100 transition-all duration-200" key={i} onClick={() => { handleGenreClick(e) }}>{e}</div>)}
                                    </div>
                                </div>
                                <div className="w-full aspect-video relative">
                                    <div className="h-full aspect-video bg-black-100 rounded-lg flex truncate scroll-smooth snap-x snap-mandatory relative" style={{ overflowX: 'auto', scrollbarWidth: 'none' }} ref={imageContainer}>
                                        {artistList.map((e, i) => {
                                            return (
                                                <div className="bg-cover bg-center flex-2 object-cover snap-start flex justify-end items-end p-4 hover:cursor-pointer group" style={{ backgroundImage: `url(http://${apiHost}:${apiPort}/artistImage/${e.image})` }} key={i} onClick={() => { handleArtistClick(e) }} id={e._id}>
                                                    <h1 className="text-white sm:text-4xl font-bold sm:m-0 mb-12 text-2xl group-hover:" style={{ textShadow: '2px 2px 4px rgba(236, 72, 153, 1)' }}>{e.name}</h1>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="absolute bg-white/50 h-[30px] w-[150px] sm:bottom-4 sm:left-4 bottom-4 right-4 rounded-full flex items-center justify-around p-2">
                                        {artistList.map(e => <a className="h-3 aspect-square bg-white rounded-full" key={e._id} href={`#${e._id}`}></a>)}
                                    </div>
                                    <div className="h-full w-20 absolute flex items-center justify-center top-0">
                                        <i className="fa-solid fa-angle-left text-xl bg-white/20 w-12 aspect-square flex items-center justify-center rounded-full text-white hover:cursor-pointer hover:scale-125 transition-all duration-200 hover:text-pink-600 hover:bg-white" onClick={() => { handleLeft() }}></i>
                                    </div>
                                    <div className="h-full w-20 absolute right-0 flex items-center justify-center top-0">
                                        <i className="fa-solid fa-angle-right text-xl bg-white/20 w-12 aspect-square flex items-center justify-center rounded-full text-white hover:cursor-pointer hover:scale-125 transition-all duration-200 hover:text-pink-600 hover:bg-white" onClick={() => { handleRight() }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage