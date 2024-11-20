import { useEffect, useMemo, useState } from "react"

import NavBarComponent from "../components/NavBarComponent"
import CircleComponent from "../components/CircleComponent"
import PlaylistBoxComponent from "../components/PlaylistBoxComponent"

const PlaylistPage = () => {

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    const [number, setNumber] = useState(0)

    const bubbles = useMemo(() => bubble(20), [])

    const listData = [
        {title: 'List1', image: '../public/images/test-wallpaper.jpg'},
        {title: 'List2', image: '../public/images/test-wallpaper2.jpg'},
        {title: 'List3', image: '../public/images/test-wallpaper3.jpg'},
        {title: 'List4', image: '../public/images/test-wallpaper2.jpg'},
        {title: 'List5', image: '../public/images/test-wallpaper3.jpg'},
        {title: 'List6', image: '../public/images/test-wallpaper.jpg'},
        {title: 'List7', image: '../public/images/test-wallpaper2.jpg'},
        {title: 'List8', image: '../public/images/test-wallpaper3.jpg'},
        {title: 'List9', image: '../public/images/test-wallpaper2.jpg'},
        {title: 'List10', image: '../public/images/test-wallpaper.jpg'},
        {title: 'List11', image: '../public/images/test-wallpaper3.jpg'},
        {title: 'List12', image: '../public/images/test-wallpaper.jpg'},
    ]

    useEffect(() => {
        console.log(number)
    },[number])

    return (
        <div className="truncate w-full h-screen bg-gradient-to-br from-black-200 via-pink-600 to-pink-200">
            <NavBarComponent />
            <div className="absolute h-full w-full background-black-200 blur-xl truncate z-10">
                {bubbles}
            </div>
            <section className="h-screen w-full flex justify-center items-center mt-10 lg:mt-0">
                <div className="w-[60%] lg:h-[90%] h-[80%] bg-white/50 rounded-2xl min-w-[300px] z-20 truncate">
                    <div className="w-full h-[10%] flex justify-center items-center bg-black-200">
                        <h1 className="text-4xl font-bold text-white text-center">PlayList&nbsp;&nbsp;<i className="fa-regular fa-bookmark text-pink-600"></i></h1>
                    </div>
                    <div className="w-full h-full flex flex-wrap justify-around truncate gap-y-20 pb-32 pt-8 scrollbarCustom" style={{ overflowY: 'auto' }}>
                        {listData.map((e,i) => {
                            return <PlaylistBoxComponent key={i} {...e}/>
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PlaylistPage 