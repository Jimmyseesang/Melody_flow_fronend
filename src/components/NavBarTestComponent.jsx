import { useRef, useState } from "react"

const NavBarTestComponent = () => {

    const [navbarSlide, setNavbarSlide] = useState(false)

    const handleNavbar = () => {

        setNavbarSlide(!navbarSlide)
    }

    return (
        <div className="lg:h-screen lg:w-[90px] h-[90px] w-full fixed bg-black-200 z-30">
            <div className="text-white w-full h-full flex lg:flex-col flex-row-reverse justify-between lg:justify-start lg:px-0 px-4 items-center absolute z-20 bg-black-200">
                <div 
                    className="flex flex-col justify-center items-center lg:h-[10%] lg:w-full lg:p-0 lg:border-b border-white/20 
                        hover:bg-white group transition-all duration-200 hover:cursor-pointer h-12 p-2 rounded-full lg:rounded-none lg:hidden block"
                        onClick={handleNavbar}>
                    <div className="w-8 h-1 bg-white rounded-full mb-1 group-hover:bg-black-200"></div>
                    <div className="w-8 h-1 bg-white rounded-full mb-1 group-hover:bg-black-200"></div>
                    <div className="w-8 h-1 bg-white rounded-full group-hover:bg-black-200"></div>
                </div>
                <div className="hidden lg:h-[98.094px] lg:w-full sm:flex items-center justify-center hover:bg-white hover:cursor-pointer lg:border-b lg:p-0 p-2 lg:mx-0 mx-8 lg:mr-0 lg:rounded-none rounded-full border-white/20 group transition-all duration-200">
                    <div className="h-12 aspect-square bg-white rounded-full group-hover:bg-black-200"></div>   
                </div>
                <div className="lg:hidden flex justify-center items-center text-2xl p-3 hover:cursor-pointer hover:bg-white hover:text-black-200 rounded-full sm:m-none mx-2">
                    <i className="fa-solid fa-right-from-bracket"></i>
                </div>
                <div className="flex flex-col items-center lg:h-fit lg:w-full lg:block hidden">
                    <div className="text-2xl py-6 hover:bg-white w-full text-center hover:text-black-200 hover:cursor-pointer transition-all duration-200"><i className="fa-solid fa-house"></i></div>
                    <div className="text-2xl py-6 hover:bg-white w-full text-center hover:text-black-200 hover:cursor-pointer transition-all duration-200"><i className="fa-solid fa-heart"></i></div>
                    <div className="text-2xl py-6 hover:bg-white w-full text-center hover:text-black-200 hover:cursor-pointer transition-all duration-200"><i className="fa-solid fa-list"></i></div>
                    <div className="text-2xl py-6 hover:bg-white w-full text-center hover:text-black-200 hover:cursor-pointer transition-all duration-200"><i className="fa-solid fa-right-from-bracket"></i></div>
                </div>
                <div className="grow flex items-end lg:mb-24 relative">
                    <h1 className="lg:-rotate-[90deg] font-supakan sm:text-3xl tracking-wider text-xl hover:cursor-pointer">Melody <span className="text-pinky-200">flow</span></h1>
                </div>
            </div>
            <div className={`lg:hidden bg-black-200 w-full flex flex-col items-center absolute z-10 translate-all duration-200 ${navbarSlide ? 'top-[90px]' : '-top-[180px]'}`}>
                <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                    <span className="font-normal text-xl">Home</span>
                    <i className="fa-solid fa-house ml-12"></i>
                </div>
                <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                    <span className="font-normal text-xl">Like</span>
                    <i className="fa-solid fa-heart ml-12"></i>
                </div>
                <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                    <span className="font-normal text-xl">List</span>
                    <i className="fa-solid fa-folder ml-12"></i>
                </div>
            </div>
        </div>
    )
}

export default NavBarTestComponent