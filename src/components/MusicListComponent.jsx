import { useState } from "react";

const MusicListComponent = (props) => {

    const { title, artist, image, option} = props

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={`w-full md:min-h-[76px] md:h-[76px] min-h-[65px] h-[65px] flex text-white hover:cursor-pointer transition-all duration-200 justify-between ${isHovered && 'bg-black-200'}`}>
            <div className="h-full aspect-square flex justify-center items-center p-2">
                <div className="h-full aspect-square bg-cover bg-center rounded bg-white" style={{backgroundImage: `url(${image})`}}></div>
            </div>
            <div className="md:w-[80%] w-full h-full flex lg:flex-row lg:justify-around p-2 lg:items-center flex-col truncate items-start justify-start" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}} >
                <p className="w-1/2 h-full flex lg:justify-center justify-start items-center text-start md:text-base text-sm">{title}</p>
                <p className="w-1/2 h-full flex lg:justify-center justify-start items-center md:text-base text-sm">{artist}</p>
            </div>
            <div className={`h-full aspect-square justify-center items-center group hover:bg-white/20 transition-all duration-200 max-h-full ${option ? 'flex' : 'hidden'}`}>
                <i className="fa-solid fa-heart text-xl text-red-500 group-hover:text-white transition-all duration-200"></i>
            </div>
            <div className={`grow justify-center items-center group hover:bg-white/20 transition-all duration-200 max-h-full aspect-square ${option ? 'md:flex hidden' : 'hidden'}`}>
                <i className="fa-solid fa-plus text-xl group-hover:text-green-500 transition-all duration-200"></i>
            </div>
        </div>
    )
}

export default MusicListComponent