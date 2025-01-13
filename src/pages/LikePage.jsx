import { useContext, useEffect, useMemo, useState } from "react"

import CircleComponent from "../components/CircleComponent"
import NavBarComponent from "../components/NavBarComponent"
import MusicListComponent from "../components/MusicListComponent"
import { ProfileContext } from "../contexts/ProfileContext"
import axios from "axios"
import MusicLikeBoxComponent from "../components/MusicLikeBoxComponent"

const LikePage = () => {

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    const bubbles = useMemo(() => bubble(20), [])

    const { profile } = useContext(ProfileContext)
    const [likeMusic, setLikeMusic] = useState(profile.like)

    useEffect(() => {
        setLikeMusic(profile.like)
    }, [profile])

    return (
        <div className="h-screen w-full truncate bg-gradient-to-br from-black-200 via-pink-600 to-pink-200">
            <NavBarComponent />
            <div className="absolute h-full w-full background-black-200 blur-xl truncate z-10">
                {bubbles}
            </div>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="h-[70%] w-[60%] min-w-[400px] md:min-w-[500px] bg-black-200/50 z-20 rounded translate-y-12 relative backdrop-blur-3xl border border-black-200/30 p-8 flex md:items-end items-center flex-col">
                    <div className="w-full h-[230px] flex items-center justify-center">
                        <h1 className="text-7xl font-bold text-white"><span className="text-red-500">L</span>ike</h1>
                    </div>
                    <div className="bg-black-200/80 w-full h-[60%] rounded truncate" style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
                        {
                            likeMusic && likeMusic.length > 0 ?
                                likeMusic.map((e) => <MusicLikeBoxComponent {...e} key={e._id}/>)
                                :
                                <div className="w-full h-full flex items-center justify-center text-white text-lg">You don't have like music</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LikePage