import { useMemo } from "react"

import CircleComponent from "../components/CircleComponent"
import NavBarComponent from "../components/NavBarComponent"
import MusicListComponent from "../components/MusicListComponent"

const LikePage = () => {

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    const bubbles = useMemo(() => bubble(20), [])

    const musicList = [
        {title: 'Just the two of us', artist: 'Bill Withers', image: '../public/images/test-wallpaper.jpg' },
        {title: 'maybe?', artist: 'RADi', image: '../public/images/test-wallpaper2.jpg' },
        {title: 'her', artist: 'JVKE', image: '../public/images/test-wallpaper.jpg' },
        {title: 'this is what autumn feels like', artist: 'JVKE', image: '../public/images/test-wallpaper3.jpg' },
        {title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        {title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper.jpg' },
        {title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        {title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper3.jpg' },
        {title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        {title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper.jpg' },
    ]

    return (
        <div className="h-screen w-full truncate bg-gradient-to-br from-black-200 via-pink-600 to-pink-200">
            <NavBarComponent/>
            <div className="absolute h-full w-full background-black-200 blur-xl truncate z-10">
                {bubbles}
            </div>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="h-[70%] w-[60%] min-w-[300px] md:min-w-[500px] bg-black-200/50 z-20 rounded translate-y-12 relative backdrop-blur-3xl border border-black-200/30 p-8 flex md:items-end items-center flex-col">
                    <div className="w-[40%] min-w-[200px] max-w-[350px] md:flex hidden aspect-square rounded-full bg-white justify-center items-center absolute left-16 top-16 -translate-x-1/2 -translate-y-1/2">
                        <i className="fa-solid fa-heart text-9xl text-red-500"></i>
                    </div>
                    <div className="sm:w-[80%] h-[230px] flex items-center md:pl-16 p-0 w-full justify-center">
                        <h1 className="text-7xl font-bold text-white"><span className="text-red-500">L</span>ike</h1>
                    </div>
                    <div className="bg-black-200/80 w-full h-[60%] rounded truncate" style={{overflow: 'auto', scrollbarWidth: 'none'}}>
                        {musicList.map((e,i) => {
                            return <MusicListComponent {...e} index={i+1} key={i} option={true} />
                        })}
                    </div>
                </div>            
            </div>
        </div>
    )
}

export default LikePage