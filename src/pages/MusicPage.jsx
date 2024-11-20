import CircleComponent from "../components/CircleComponent"
import LeftMusicComponent from "../components/musicPageComponents/LeftMusicComponent"
import NavBarComponent from "../components/NavBarComponent"
import RightMusicComponent from "../components/musicPageComponents/RightMusicComponent"

const MusicPage = (props) => {

    // const {id, name, image, artist} = props

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    return (
        <div className="bg-gradient-to-tr from-pink-500 to-black-100 min-h-screen h-full w-full flex flex-row justify-end truncate relative">
            <NavBarComponent />
            <div className="h-full w-full absolute blur-2xl bg-black-200/10">
                {bubble(20)}
            </div>
            <div className="lg:h-screen h-full lg:w-[95.37%] w-full z-10 flex lg:flex-row flex-col">
                <LeftMusicComponent />
                <RightMusicComponent />
            </div>
        </div>
    )

}

export default MusicPage