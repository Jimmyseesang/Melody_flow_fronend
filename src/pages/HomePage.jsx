import MusicBoxComponent from "../components/MusicBoxComponent"
import NavBarComponent from "../components/NavBarComponent"
import CircleComponent from "../components/CircleComponent"
import { useRef } from "react"
import GenreBox from "../components/GenreBox"


const HomePage = () => {

    const data = [
        { id: 1, name: 'Just the two of us', image: `/images/song/just-the-two-of-us.jpg`, artist: 'Bill Withers' },
        { id: 2, name: 'maybe?', image: '/images/song/maybe.jpg', artist: 'RADi' },
        { id: 3, name: 'her', image: '/images/song/her.jpg', artist: 'JVKE' },
        { id: 4, name: 'this is what autumn feels like', image: '/images/song/this-is-what-autumn-feels-like.jpg', artist: 'JVKE' },
        { id: 5, name: 'drunk', image: '/images/song/drunk.jpg', artist: 'keshi' },
        { id: 6, name: 'drunk', image: '/images/song/drunk.jpg', artist: 'keshi' },
        { id: 7, name: 'drunk', image: '/images/song/drunk.jpg', artist: 'keshi' },
        { id: 8, name: 'drunk', image: '/images/song/drunk.jpg', artist: 'keshi' },
        { id: 9, name: 'drunk', image: '/images/song/drunk.jpg', artist: 'keshi' },
    ]

    const genreData = [
        {id: 1, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
        {id: 2, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
        {id: 3, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
        {id: 4, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
        {id: 5, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
        {id: 6, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
        {id: 7, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
        {id: 8, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
        {id: 8, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
        {id: 8, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
        {id: 8, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
        {id: 8, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
        {id: 8, genre: 'Pop', imageUrl: '/images/song/drunk.jpg'},
    ]

    const scrollContainerRef = useRef(null)

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({left: -1000, behavior: 'smooth'})
    }

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({left: 1000, behavior: 'smooth'})
    }

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    return (
        <div className="h-screen bg-gradient-to-tr from-pink-500 to-black-100 truncate relative" style={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
        <NavBarComponent />
            <div className="h-full w-full absolute blur-2xl bg-black-200/10 truncate">
                {bubble(20)}
            </div>
            <section className="h-screen lg:ml-[90px] lg:mt-0 mt-[90px]">
                <div className="h-[400px] bg-black-100 relative">
                    <div className="flex snap-x snap-mandatory w-full h-full scroll-smooth" style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
                        <img src="/images/test-wallpaper.jpg" alt="wallpaper1" className="object-cover snap-normal snap-start flex-2" />
                        <img src="/images/test-wallpaper2.jpg" alt="wallpaper2" className="object-cover snap-normal snap-start flex-2" />
                        <img src="/images/test-wallpaper3.jpg" alt="wallpaper3" className="object-cover snap-normal snap-start flex-2" />
                    </div>
                </div>
                <div className="h-[500px] w-full relative">
                    <div className="h-full w-full flex justify-start items-center gap-16 truncate px-16" style={{ overflowX: 'auto', scrollbarWidth: 'none' }} ref={scrollContainerRef}>
                        {data.map((e, i) => <MusicBoxComponent {...e} key={i} />)}
                    </div>
                    <div className="absolute h-36 w-16 bg-white/50 top-1/2 -translate-y-1/2 translate-x-8 rounded text-2xl flex justify-center items-center text-white/75 hover:text-black-200 hover:bg-white/75 hover:cursor-pointer" onClick={scrollLeft}>
                        <i className="fa-solid fa-angles-left"></i>
                    </div>
                    <div className="absolute h-36 w-16 bg-white/50 top-1/2 -translate-y-1/2 right-8 rounded text-2xl flex justify-center items-center text-white/75 hover:text-black-200 hover:bg-white/75 hover:cursor-pointer" onClick={scrollRight}>
                        <i className="fa-solid fa-angles-right"></i>
                    </div>
                </div>
                <div className="fixed w-[20%] h-full top-0 right-0 bg-black-200 flex flex-col px-4">
                    <div className="text-white w-full h-1/6 flex justify-start items-center py-8 px-4">
                        <h1 className="text-5xl font-bold font-supakan">Genre</h1>
                    </div>
                    <div className="w-full max-h-[770px] flex-1 bg-white/10 rounded truncate scroll-smooth" style={{overflowY: 'auto', scrollbarWidth: 'none', scrollbarColor: 'gray black'}}>
                        {genreData.map(e => <GenreBox {...e} />)}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage