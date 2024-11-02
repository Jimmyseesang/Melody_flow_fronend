import CircleComponent from "../components/CircleComponent"
import LeftMusicComponent from "../components/LeftMusicComponent"
import NavBarTestComponent from "../components/NavBarTestComponent"
import RightMusicComponent from "../components/RightMusicComponent"

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
        <div className="bg-gradient-to-tr from-pink-500 to-black-100 h-screen w-full flex flex-row truncate relative">
            <NavBarTestComponent />
            <div className="h-full w-full absolute blur-2xl bg-black-200/10">
                {bubble(20)}
            </div>
            <LeftMusicComponent/>
            <RightMusicComponent/>
        </div>
    )

}

export default MusicPage