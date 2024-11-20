const LeftMusicComponent = () => {

    const id = 5
    const name = 'maybe?'
    const image = '/images/song/maybe.jpg'
    const artist = 'RADi'

    return (
        <div className="lg:w-1/2 lg:h-full h-screen p-16 flex items-center justify-center mt-12 lg:mt-0">
            <div className="w-full max-w-[650px] min-w-[300px] h-full bg-white/25 backdrop-blur-2xl rounded-2xl border p-4">
                {/* CD */}
                <div className="w-full h-2/3 flex items-center justify-center relative p-4">
                    <div className="w-[60%] md:min-w-[300px] min-w-[200px] aspect-square rounded-full bg-center bg-cover border-2 border-black-200 relative animate-spin1" style={{ backgroundImage: `url(${image})` }}>
                        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-pink-600 h-8 aspect-square rounded-full"></div>
                        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white/40 h-8 aspect-square rounded-full border-2 border-black-200"></div>
                    </div>
                    <div className="absolute top-0 left-0">
                        <i className="fa-solid fa-plus text-white h-full aspect-square p-4 flex justify-center items-center text-2xl rounded-full hover:text-black-100 hover:cursor-pointer transition-all duration-200"></i>
                    </div>
                    <div className="absolute bottom-4 left-4">
                        <i className="fa-solid fa-heart text-black-200 h-full aspect-square p-4 flex justify-center items-center text-2xl rounded-full hover:text-pink-600 hover:cursor-pointer bg-white transition-all duration-200"></i>
                    </div>
                </div>
                {/* content */}
                <div className="w-full h-1/3 bg-white/50 rounded-xl flex flex-col p-4 justify-between">
                    <div className="flex flex-col items-center w-full">
                        <h1 className="text-2xl font-bold">{name}</h1>
                        <p className="text-base">{artist}</p>
                    </div>
                    <div className="w-full flex justify-center items-end gap-4">
                        <div className="flex h-10 aspect-square bg-black-200 justify-center items-center text-white rounded-full text-xl hover:text-pink-600 hover:cursor-pointer transition-all duration-all">
                            <i className="fa-solid fa-backward"></i>
                        </div>
                        <div className="flex h-12 aspect-square bg-black-200 justify-center items-center text-white rounded-full text-xl hover:text-pink-600 hover:cursor-pointer transition-all duration-all">
                            <i className="fa-solid fa-play"></i>
                        </div>
                        <div className="flex h-10 aspect-square bg-black-200 justify-center items-center text-white rounded-full text-xl hover:text-pink-600 hover:cursor-pointer transition-all duration-all">
                            <i className="fa-solid fa-forward"></i>
                        </div>
                    </div>
                    <div className="w-full h-2 bg-white rounded-full hover:cursor-pointer"></div>
                    <div className="w-full flex justify-between">
                        <p className="text-black-200">0:00</p>
                        <p className="text-black-200">3:00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftMusicComponent