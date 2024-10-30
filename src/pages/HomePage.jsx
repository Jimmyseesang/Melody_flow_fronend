import MusicBoxComponent from "../components/MusicBoxComponent"
import NavBarComponent from "../components/NavBarComponent"

const HomePage = () => {
    return (
        <div className="h-screen truncate">
            <NavBarComponent/>
            <section className="h-screen bg-pinky-200">
                <div></div>
                <div className="w-screen h-1/2 bg-black-100 relative">
                    <img src="/images/test-wallpaper.jpg" className="h-full w-full object-cover border-4 border-black-200" />
                    <div className="max-w-36 absolute bottom-4 right-1/2 flex gap-4 translate-x-1/2 p-4 rounded-full bg-pinky-200/50 justify-between">
                        <div className="min-w-4 h-4 bg-black-200/50 rounded-full"></div>
                        <div className="min-w-4 h-4 bg-black-200/90 rounded-full"></div>
                        <div className="min-w-4 h-4 bg-black-200/50 rounded-full"></div>
                        <div className="min-w-4 h-4 bg-black-200/50 rounded-full"></div>
                    </div>
                </div>
                <div className="h-1/2 w-full flex justify-center items-center gap-16">
                        <MusicBoxComponent/>
                        <MusicBoxComponent/>
                        <MusicBoxComponent/>
                        <MusicBoxComponent/>
                        <MusicBoxComponent/>
                </div>
            </section>
        </div>
    )
}

export default HomePage