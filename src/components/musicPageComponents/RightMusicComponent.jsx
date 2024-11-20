import MusicListComponent from "../MusicListComponent"

const RightMusicComponent = () => {

    const musicList = [
        { title: 'Just the two of us', artist: 'Bill Withers', image: '../public/images/test-wallpaper.jpg' },
        { title: 'maybe?', artist: 'RADi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'her', artist: 'JVKE', image: '../public/images/test-wallpaper.jpg' },
        { title: 'this is what autumn feels like', artist: 'JVKE', image: '../public/images/test-wallpaper3.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper3.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },
        { title: 'drunk', artist: 'keshi', image: '../public/images/test-wallpaper2.jpg' },

    ]

    return (
        <div className="lg:h-full h-screen w-full lg:w-1/2 p-16 flex justify-center items-center">
            <div className="w-full max-w-[650px] md:min-w-[480px] min-w-[300px] h-full bg-black-200/50 backdrop-blur-2xl rounded-2xl border border-black-100 flex flex-col rounded-br-none">
                <h1 className="w-full h-fit p-6 text-center text-3xl font-bold text-pink-600 bg-black-100 rounded-t-2xl">Music</h1>
                <div className="h-full w-full rounded-bl-2xl truncate scrollbarCustom" style={{overflow: 'auto'}}>
                    {musicList.map((e, i) => <MusicListComponent {...e} key={i} />)}
                </div>
            </div>
        </div>
    )
}

export default RightMusicComponent