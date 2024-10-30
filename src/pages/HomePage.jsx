import MusicBoxComponent from "../components/MusicBoxComponent"
import NavBarComponent from "../components/NavBarComponent"

const HomePage = () => {

    const data = [
        {name: 'Just the two of us', image: `/images/song/just-the-two-of-us.jpg`, artist: 'Bill Withers'},
        {name: 'maybe?', image: '/images/song/maybe.jpg', artist: 'RADi'},
        {name: 'her', image: '/images/song/her.jpg', artist: 'JVKE'},
        {name: 'drunk', image: '/images/song/drunk.jpg', artist: 'keshi'},
        {name: 'this is what autumn feels like', image: '/images/song/this-is-what-autumn-feels-like.jpg', artist: 'JVKE'},
    ]

    return (
        <div className="h-screen truncate" style={{overflowY: 'auto', scrollbarWidth: 'none'}}>
            <NavBarComponent/>
            <section className="h-screen bg-pinky-200">
                <div></div>
                <div className="w-screen h-[40%] bg-black-100 relative mt-20">
                    <div className="flex snap-x snap-mandatory w-full h-full scroll-smooth" style={{overflowX: 'auto', scrollbarWidth: 'none'}}>
                        <img src="/images/test-wallpaper.jpg" alt="wallpaper1" className="object-cover snap-normal snap-start flex-2" />
                        <img src="/images/test-wallpaper2.jpg" alt="wallpaper2" className="object-cover snap-normal snap-start flex-2" />
                        <img src="/images/test-wallpaper3.jpg" alt="wallpaper3" className="object-cover snap-normal snap-start flex-2" />
                    </div>
                </div>
                <div className="h-1/2 w-full flex justify-center items-center gap-16">
                        {data.map((e,i) => <MusicBoxComponent {...e} key={i} />)}
                </div>
            </section>
        </div>
    )
}

export default HomePage