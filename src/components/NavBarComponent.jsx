const NavBarComponent = () => {
    return(
        <div 
            className="fixed bg-black-100 text-white w-full h-[5rem]
            flex justify-between items-center xl:px-20 text-2xl
            sm:px-8 truncate px-4 z-20
            ">
            <div className="flex flex-col h-full justify-evenly py-5 hover:cursor-pointer">
                <div className="w-8 h-1 bg-white rounded"></div>
                <div className="w-8 h-1 bg-white rounded"></div>
                <div className="w-8 h-1 bg-white rounded"></div>
            </div>
            <div className="flex items-center justify-end gap-8 w-5/6">
                <form className="flex items-center sm:max-w-full max-w-12 grow justify-end">
                    <input type="text" className="rounded-full h-12 md:min-w-64 md:max-w-[500px] min-w-12 w-full text-black-100 text-base px-4 sm:placeholder-current placeholder-transparent sm:placeholder-gray-400" placeholder='music...' />
                    <button type="submit" className="text-black-100 -translate-x-9 w-0"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <div className="h-12 aspect-square bg-white rounded-full"></div>
                <div className="font-supakan hidden sm:block hover:cursor-pointer hover:bg-white/25 p-2 rounded-full">Melody<span className="text-pinky-500">Flow</span></div>
            </div>
        </div>
    )
}

export default NavBarComponent