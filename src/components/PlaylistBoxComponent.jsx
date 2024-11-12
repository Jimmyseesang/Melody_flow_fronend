const PlaylistBoxComponent = (props) => {

    const {title, image} = props
    
    return (
        <div className="min-w-60 min-h-80 relative group hover:cursor-pointer">
            <div className="absolute w-full h-full bg-zinc-800 rounded z-30 shadow-md p-2 flex flex-col transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 border-2 border-zinc-700">
                <div className="w-full h-[150px] bg-white rounded bg-cover bg-center" style={{backgroundImage: `url(${image})`}}></div>
                <div className="flex-1 flex justify-center items-center">
                    <h2 className="text-white font-bold text-xl group-hover:text-pink-600 transition-all duration-200">{title}</h2>
                </div>
            </div>
            <div className="absolute w-full h-full bg-zinc-800 rounded z-20 translate-x-2 shadow-md translate-y-2 transition-all group-hover:translate-x-3 group-hover:translate-y-3 border-2 border-zinc-700"></div>
            <div className="absolute w-full h-full bg-zinc-800 rounded z-10 translate-x-4 shadow-md translate-y-4 transition-all group-hover:translate-x-7 group-hover:translate-y-7 border-2 border-zinc-700"></div>
        </div>
    )
}

export default PlaylistBoxComponent