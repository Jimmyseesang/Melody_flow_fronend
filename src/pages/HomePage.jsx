import MusicBoxComponent from "../components/MusicBoxComponent"
import NavBarComponent from "../components/NavBarComponent"
import CircleComponent from "../components/CircleComponent"


const HomePage = () => {

    const data = [
        {id: 1, name: 'Just the two of us', image: `/images/song/just-the-two-of-us.jpg`, artist: 'Bill Withers'},
        {id: 2, name: 'maybe?', image: '/images/song/maybe.jpg', artist: 'RADi'},
        {id: 3, name: 'her', image: '/images/song/her.jpg', artist: 'JVKE'},
        {id: 4, name: 'this is what autumn feels like', image: '/images/song/this-is-what-autumn-feels-like.jpg', artist: 'JVKE'},
        {id: 5, name: 'drunk', image: '/images/song/drunk.jpg', artist: 'keshi'},
    ]

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    return (
        <div className="h-screen bg-gradient-to-tr from-pink-500 to-black-100 truncate relative" style={{overflowY: 'auto', scrollbarWidth: 'none'}}>
            <NavBarComponent/>
            <div className="h-full w-full absolute blur-2xl bg-black-200/10 truncate">
                {bubble(20)}
            </div>
            <section className="h-screen lg:ml-[90px] lg:mt-0 mt-[90px]">
                <div></div>
                <div className="h-[500px] bg-black-100 relative">
                    <div className="flex snap-x snap-mandatory w-full h-full scroll-smooth" style={{overflowX: 'auto', scrollbarWidth: 'none'}}>
                        <img src="/images/test-wallpaper.jpg" alt="wallpaper1" className="object-cover snap-normal snap-start flex-2" />
                        <img src="/images/test-wallpaper2.jpg" alt="wallpaper2" className="object-cover snap-normal snap-start flex-2" />
                        <img src="/images/test-wallpaper3.jpg" alt="wallpaper3" className="object-cover snap-normal snap-start flex-2" />
                    </div>
                </div>
                <div className="h-[500px] w-full flex justify-center items-center gap-16">
                        {data.map((e,i) => <MusicBoxComponent {...e} key={i} />)}
                </div>
            </section>
        </div>
    )
}

export default HomePage