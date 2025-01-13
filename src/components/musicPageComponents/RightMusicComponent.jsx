import { useContext } from "react"
import MusicListComponent from "../MusicListComponent"
import { MusicContext } from "../../contexts/MusicContext"
import { ProfileContext } from "../../contexts/ProfileContext"

const RightMusicComponent = (props) => {

    const {apiHost, apiPort} = useContext(ProfileContext)

    const {musics} = props

    return (
        <div className="lg:h-full h-screen w-full lg:w-1/2 p-16 flex justify-center items-center">
            <div className="w-full max-w-[650px] md:min-w-[480px] min-w-[300px] h-full bg-black-200/50 backdrop-blur-2xl rounded-2xl border border-black-100 flex flex-col rounded-br-none">
                <h1 className="w-full h-fit p-6 text-center text-3xl font-bold text-pink-600 bg-black-100 rounded-t-2xl">Music</h1>
                <div className="h-full w-full rounded-bl-2xl truncate scrollbarCustom" style={{overflow: 'auto'}}>
                    {musics.length > 0 && (musics.map((e, i) => <MusicListComponent {...e} key={i} image={`http://${apiHost}:${apiPort}/musicImg/${e.coverUrl}`} id={e._id} />))}
                    {musics.length === 0 && <div className="flex items-center justify-center h-full text-lg text-white"><h1>This playlist is empty</h1></div>}
                </div>
            </div>
        </div>
    )
}

export default RightMusicComponent