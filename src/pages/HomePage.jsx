import NavBarComponent from "../components/NavBarComponent"
import CircleComponent from "../components/CircleComponent"
import MusicListComponent from "../components/MusicListComponent"
import PlaylistBoxComponent from "../components/PlaylistBoxComponent"
import { useState, useRef, useEffect } from "react"
import MusicBoxComponent from "../components/ArtistBoxComponent"
import ArtistBoxComponent from "../components/ArtistBoxComponent"
import axios from "axios"


const HomePage = () => {

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    const musicList = [
        { title: 'Just the two of us', artist: 'Bill Withers', image: '../public/images/test-wallpaper.jpg' },
        { title: 'maybe?', artist: 'RADi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'her', artist: 'JVKE', image: '../public/images/test-wallpaper.jpg' },
        { title: 'this is what autumn feels like', artist: 'JVKE', image: '../public/images/test-wallpaper3.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper3.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },

    ]

    const artistList = [
        { imgUrl: '../public/images/three-man-down-group.jpg', artistName: 'Three Man Down' },
        { imgUrl: '../public/images/Atom-2.jpeg', artistName: 'Atom ชนกันต์' },
        { imgUrl: "../public/images/aylas.jpg", artistName: "Ayla's" },
        { imgUrl: "../public/images/aylas.jpg", artistName: "Ayla's" },
    ]

    const genre = [
        'Pop',
        'Jazz',
        'Hip hop',
        'R&B',
        'Art Music',
        'Rock',
        'Country',
        'Electronic',
        'Blues',
        'Classical music',
        'Folk music',
        'Reggae',
        'Soul',
        'Latin rock',
        'Meral',
        'New-age music',
        'Disco', 'Funk',
        'Gospel music',
        'Indian classical music',
        'Latin music'
    ]

    const largeList = (list, index) => {
        const sliceList = list.slice(0, index)
        return sliceList
    }

    return (
        <div className="min-h-screen h-full bg-gradient-to-tr from-pink-500 to-black-100 relative truncate" style={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
            <NavBarComponent />
            <div className="h-full w-full absolute blur-2xl bg-black-200/10 truncate z-0">
                {bubble(20)}
            </div>
            <section className="min-h-screen h-full lg:ml-[90px] lg:mt-0 mt-[90px] relative">
                <div className="w-[99%] min-h-screen h-full absolute right-1/2 translate-x-1/2 rounded flex flex-col p-4">
                    <div className="w-full h-[100px] flex justify-center items-center my-4">
                        <input type="text" className="bg-white/30 placeholder:text-white p-2 rounded-full h-12 w-1/5 min-w-48 lg:focus:w-1/3 focus:w-1/2  outline-0 focus:outline focus:outline-2 outline-pink-500 transition-all duration-200 placeholder:text-center text-center text-white" placeholder="Search..." />
                    </div>
                    <div className="md:h-[850px] rounded-lg flex justify-between flex-col md:flex-row">
                        {/* section one */}
                        <div className="bg-black-200/50 md:h-full md:w-1/3 md:min-w-[400px] min-w-[250px] w-full flex flex-col justify-between items-center rounded-lg">
                            <h1 className="text-center text-4xl font-bold text-white p-4 w-full bg-black-200 rounded-t-lg"><span className="text-pink-500">M</span>usic</h1>
                            <div className="h-full w-full flex flex-col truncate scroll-smooth scrollbarCustom overflow-y-auto" style={{ overflowY: 'auto' }}>
                                {musicList.map((e, i) => {
                                    return <MusicListComponent {...e} index={i} key={i} option={false} />
                                })}
                            </div>
                        </div>
                        {/* section two */}
                        <div className="md:w-[66%] w-full flex-1 rounded-lg md:px-4 my-4 md:mt-0 flex flex-col items-center gap-y-4 gap-4 truncate scrollbarCustom" style={{ overflowY: 'auto' }}>
                            <div className="h-full w-full flex-1 flex 2xl:flex-row flex-col items-center justify-between rounded-lg gap-4">
                                <div className="bg-black-200/50 h-full rounded-lg flex flex-col">
                                    <h1 className="bg-black-200 text-center text-white first-letter:text-pink-600 rounded-t-lg text-4xl font-bold p-4">Genre</h1>
                                    <div className="flex-1 p-4 flex flex-row flex-wrap gap-2 overflow-y-auto scrollbarCustom">
                                        {genre.map((e, i) => <div className="w-fit bg-pink-600/80 h-[30px] flex items-center justify-center p-4 rounded-full text-black-100 hover:text-pink-600 hover:cursor-pointer hover:bg-black-100 transition-all duration-200" key={i}>{e}</div>)}
                                    </div>
                                </div>
                                <div className="2xl:w-2/3 w-full aspect-video relative">
                                    <div className="h-full aspect-video bg-black-100 rounded-lg flex truncate scroll-smooth snap-x snap-mandatory relative" style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
                                        {artistList.map((e, i) => {
                                            return (
                                                <div className="bg-cover bg-center flex-2 object-cover snap-start flex justify-end items-end p-4" style={{ backgroundImage: `url(${e.imgUrl})` }} key={i}>
                                                    <h1 className="text-white sm:text-4xl font-bold sm:m-0 mb-12 text-2xl" style={{ textShadow: '2px 2px 4px rgba(236, 72, 153, 1)' }}>{e.artistName}</h1>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="absolute bg-white/75 h-[30px] w-[150px] sm:bottom-4 sm:left-4 bottom-4 right-4 rounded-full flex items-center justify-around p-2">
                                        {artistList.map((e, i) => <div className="h-3 aspect-square bg-pink-600/50 rounded-full" key={i}></div>)}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:h-1/2 h-[470px] bg-black-200/50 rounded-lg flex sm:flex-row flex-col sm:m-0 mb-8">
                                <div className="sm:h-full sm:w-24 w-full h-24 bg-black-200 flex justify-center items-center sm:rounded-l-lg rounded-t-lg">
                                    <h1 className="text-pink-500 sm:-rotate-90 text-4xl font-bold">Artist</h1>
                                </div>
                                <div className="flex-1 max-h-full flex justify-around items-center p-4 truncate flex-wrap gap-y-16 scrollbarCustom" style={{ overflowY: 'auto' }}>
                                    {largeList(artistList, 3).map((e, i) => <PlaylistBoxComponent title={e.artistName} image={e.imgUrl} key={i} />)}
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