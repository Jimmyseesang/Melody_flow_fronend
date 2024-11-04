const LeftMusicComponent = () => {

    const id = 5
    const name = 'maybe?'
    const image = '/images/song/maybe.jpg'
    const artist = 'RADi'

    return (
        <section className="h-full w-1/2 flex justify-center items-center">
            {/* upper */}
            <div className="bg-black-200/50 h-[700px] w-[500px] rounded-md p-8 relative flex flex-col justify-evenly border-2 border-white/20">
                <div className="w-fit flex justify-center items-center relative bg-black-200/70 mx-auto p-1 rounded-full animate-spin1">
                    <img src="/images/song/maybe.jpg" alt="music-image" className="h-[350px] aspect-square rounded-full" />
                    <div className="h-8 aspect-square bg-black-200/50 rounded-full absolute border-2 border-black-200 z-10"></div>
                    <div className="h-8 aspect-square bg-pink-900 rounded-full absolute"></div>
                </div>
                {/* under */}
                <div className="text-white ml-4">
                    <h1 className="text-2xl font-bold my-2">{name}</h1>
                    <p className="text-base">artist: {artist}</p>
                </div>
                {/* timeline */}
                <div className="w-full mt-10 hover:cursor-pointer">
                    <div className="w-full h-2 bg-white rounded-full"></div>
                </div>
                <div className="w-full flex justify-evenly text-white">
                    <div className="h-12 aspect-square bg-white rounded-full flex justify-center items-center text-black-200 hover:cursor-pointer hover:text-pink-700 hover:text-xl duration-200"><i className="fa-solid fa-backward"></i></div>
                    <div className="h-12 aspect-square bg-white rounded-full flex justify-center items-center text-black-200 hover:cursor-pointer hover:text-pink-700 hover:text-xl duration-200"><i className="fa-solid fa-play"></i></div>
                    <div className="h-12 aspect-square bg-white rounded-full flex justify-center items-center text-black-200 hover:cursor-pointer hover:text-pink-700 hover:text-xl duration-200"><i className="fa-solid fa-forward"></i></div>
                </div>
                <div className="absolute bottom-40 right-4 flex w-1/3 justify-evenly">
                    <div className="h-14 aspect-square rounded-full bg-white flex justify-center items-center text-2xl hover:cursor-pointer hover:text-green-500 duration-200"><i className="fa-solid fa-plus"></i></div>
                    <div className="h-14 aspect-square rounded-full bg-white flex justify-center items-center text-2xl hover:cursor-pointer hover:text-red-500 duration-200"><i className="fa-solid fa-heart"></i></div>
                </div>
            </div>
        </section>
    )
}

export default LeftMusicComponent