import axios from "axios"
import { useEffect, useState } from "react"

const apiHost = import.meta.env.VITE_SERVER_HOST

const NavBarComponent = () => {

    const [navbarSlide, setNavbarSlide] = useState(false)
    const [permission, setPermission] = useState(false)
    const [bottonLogOut, setBottonLogOut] = useState(false)

    const handleNavbar = () => {

        setNavbarSlide(!navbarSlide)
    }

    const adminTool = () => {
        return (
            <a href="/admin">
                <div className="text-2xl py-6 hover:bg-white w-full text-center hover:text-black-200 hover:cursor-pointer transition-all duration-200 group"><i className="fa-solid fa-toolbox group-hover:scale-150 duration-200"></i></div>
            </a>
        )
    }

    const adminBar = () => {
        return (
            <a href="/admin" className="w-full">
                <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                    <span className="font-normal text-xl">Admin</span>
                    <i className="fa-solid fa-toolbox ml-12"></i>
                </div>
            </a>
        )
    }

    const adminBox = async () => {

        try {

            const token = localStorage.getItem('token')
            if(!token) {
                return setBottonLogOut(false)
            }

            const response = await axios.get(`http://${apiHost}:3900/auth/page`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setPermission(response.data.isAdmin)
            setBottonLogOut(true)
        }
        catch (err) {
            console.log('Error fetching permission', err)
        }
    }

    useEffect(() => {
        adminBox()
    }, [])

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
                    <div className="h-12 aspect-square bg-white rounded-full group-hover:bg-black-200 lg:group-hover:scale-150 duration-200"></div>
                </div>
                <div className="lg:hidden flex justify-center items-center text-2xl p-3 hover:cursor-pointer hover:bg-white hover:text-black-200 rounded-full sm:m-none mx-2">
                    <i className="fa-solid fa-right-from-bracket"></i>
                </div>
                <div className="flex flex-col items-center lg:h-fit lg:w-full lg:block hidden">
                    <a href="/">
                        <div className="text-2xl py-6 hover:bg-white w-full text-center hover:text-black-200 hover:cursor-pointer transition-all duration-200 group"><i className="fa-solid fa-house group-hover:scale-150 duration-200"></i></div>
                    </a>
                    <a href="/like">
                        <div className="text-2xl py-6 hover:bg-white w-full text-center hover:text-black-200 hover:cursor-pointer transition-all duration-200 group"><i className="fa-solid fa-heart group-hover:scale-150 duration-200 "></i></div>
                    </a>
                    <a href="/list">
                        <div className="text-2xl py-6 hover:bg-white w-full text-center hover:text-black-200 hover:cursor-pointer transition-all duration-200 group"><i className="fa-solid fa-list group-hover:scale-150 duration-200"></i></div>
                    </a>
                    <a href="/register" onClick={() => {bottonLogOut ? localStorage.removeItem('token') : ''}}>
                        <div className={`text-2xl py-6 hover:bg-white w-full text-center hover:cursor-pointer transition-all duration-200 group ${bottonLogOut ? 'text-red-600' : 'text-green-400'}`}><i className="fa-solid fa-right-from-bracket group-hover:scale-150 duration-200"></i></div>
                    </a>
                    {permission ? adminTool() : ''}
                </div>
                <div className="grow flex items-end lg:mb-24 relative">
                    <h1 className="lg:-rotate-[90deg] font-supakan sm:text-3xl tracking-wider text-xl hover:cursor-pointer">Melody <span className="text-pinky-200">flow</span></h1>
                </div>
            </div>
            <div className={`lg:hidden bg-black-200 w-full flex flex-col items-center absolute z-10 translate-all duration-200 ${navbarSlide ? 'top-[90px]' : '-top-[360px]'}`}>
                <a href="/" className="w-full">
                    <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                        <span className="font-normal text-xl">Home</span>
                        <i className="fa-solid fa-house ml-12"></i>
                    </div>
                </a>
                <a href="/like" className="w-full">
                    <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                        <span className="font-normal text-xl">Like</span>
                        <i className="fa-solid fa-heart ml-12"></i>
                    </div>
                </a>
                <a href="/list" className="w-full">
                    <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                        <span className="font-normal text-xl">List</span>
                        <i className="fa-solid fa-folder ml-12"></i>
                    </div>
                </a>
                <a href="/list" className="w-full">
                    <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                        <span className="font-normal text-xl">{bottonLogOut ? 'Logout' : 'Login'}</span>
                        <i className="fa-solid fa-right-from-bracket ml-12"></i>
                    </div>
                </a>
                {permission ? adminBar() : ''}
            </div>
        </div>
    )
}

export default NavBarComponent