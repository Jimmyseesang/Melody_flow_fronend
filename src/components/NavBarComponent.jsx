import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../contexts/ProfileContext"

const apiHost = import.meta.env.VITE_SERVER_HOST
const apiPort = import.meta.env.VITE_SERVER_PORT

const NavBarComponent = () => {

    const [navbarSlide, setNavbarSlide] = useState(false)
    const [permission, setPermission] = useState(false)
    const [bottonLogOut, setBottonLogOut] = useState(false)
    const [loading, setLoading] = useState(true)

    const handleNavbar = () => {

        setNavbarSlide(!navbarSlide)
    }

    const adminTool = () => {
        return (
            <a href="/admin">
                <div className="w-full py-6 text-2xl text-center transition-all duration-200 hover:bg-white hover:text-black-200 hover:cursor-pointer group"><i className="duration-200 fa-solid fa-toolbox group-hover:scale-150"></i></div>
            </a>
        )
    }

    const adminBar = () => {
        return (
            <a href="/admin" className="w-full">
                <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                    <span className="text-xl font-normal">Admin</span>
                    <i className="ml-12 fa-solid fa-toolbox"></i>
                </div>
            </a>
        )
    }

    const adminBox = async () => {

        try {

            const token = localStorage.getItem('token')
            if (!token) {
                return setBottonLogOut(false)
            }

            const response = await axios.get(`http://${apiHost}:${apiPort}/auth/page`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            setPermission(response.data.isAdmin)
            setBottonLogOut(true)
        }
        catch (err) {
            console.log('Error fetching permission', err)
        } finally {
            setLoading(false)
        }
    }
    const {profileImg, token, setToken, fetchProfile} = useContext(ProfileContext)

    useEffect(() => {
        setToken(localStorage.getItem('token'))
        if(token) {
            fetchProfile()
        }
        setBottonLogOut(false)
        setBottonLogOut(!!token)

        adminBox()
    }, [token])


    return (
        <div className="lg:h-screen lg:w-[90px] h-[90px] w-full fixed bg-black-200 z-50 left-0">
            {/* Side bar */}
            <div className="absolute z-20 flex flex-row-reverse items-center justify-between w-full h-full px-4 text-white lg:flex-col lg:justify-start lg:px-0 bg-black-200">
                <div
                    className="flex flex-col justify-center items-center lg:h-[10%] lg:w-full lg:p-0 lg:border-b border-white/20 hover:bg-white group transition-all duration-200 hover:cursor-pointer h-12 p-2 rounded-full lg:rounded-none lg:hidden"
                    onClick={handleNavbar}>
                    <div className="w-8 h-1 mb-1 bg-white rounded-full group-hover:bg-black-200"></div>
                    <div className="w-8 h-1 mb-1 bg-white rounded-full group-hover:bg-black-200"></div>
                    <div className="w-8 h-1 bg-white rounded-full group-hover:bg-black-200"></div>
                </div>
                <div className="hidden lg:h-[98.094px] lg:w-full sm:flex items-center justify-center hover:bg-white hover:cursor-pointer lg:border-b lg:p-0 p-2 lg:mx-0 mx-8 lg:mr-0 lg:rounded-none rounded-full border-white/20 group transition-all duration-200">
                    <a href="/profile">
                        <div className="h-12 duration-200 bg-white rounded-full aspect-square group-hover:bg-black-200 lg:group-hover:scale-150 bg-cover bg-center" style={{backgroundImage: `url(${profileImg})`}}></div>
                    </a>
                </div>
                <a href="/register" className={`lg:hidden flex justify-center items-center text-2xl p-3 hover:cursor-pointer hover:bg-white hover:text-black-200 rounded-full sm:m-none mx-2 ${bottonLogOut ? 'text-red-600' : 'text-green-400'}`} onClick={() => { bottonLogOut ? localStorage.removeItem('token') : '' }}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                </a>
                <div className="hidden lg:h-[650px] lg:w-full lg:flex flex-col justify-start">
                    <a href="/">
                        <div className="w-full py-6 text-2xl text-center transition-all duration-200 hover:bg-white hover:text-black-200 hover:cursor-pointer group"><i className="duration-200 fa-solid fa-house group-hover:scale-150"></i></div>
                    </a>
                    <a href="/list">
                        <div className="w-full py-6 text-2xl text-center transition-all duration-200 hover:bg-white hover:text-black-200 hover:cursor-pointer group"><i className="duration-200 fa-solid fa-list group-hover:scale-150"></i></div>
                    </a>
                    <a href="/like">
                        <div className="w-full py-6 text-2xl text-center transition-all duration-200 hover:bg-white hover:text-black-200 hover:cursor-pointer group"><i className="duration-200 fa-solid fa-heart group-hover:scale-150"></i></div>
                    </a>
                    {permission ? adminTool() : ''}
                    <a href="/register" onClick={() => { bottonLogOut ? localStorage.removeItem('token') : '' }}>
                        <div className={`text-2xl py-6 hover:bg-white w-full text-center hover:cursor-pointer transition-all duration-200 group text-green-400 ${loading ? 'text-white' : bottonLogOut ? 'text-red-600' : 'text-green-400'}`}><i className="duration-200 fa-solid fa-right-from-bracket group-hover:scale-150"></i></div>
                    </a>
                </div>
                <div className="relative flex items-end grow lg:mb-24">
                    <h1 className="lg:-rotate-[90deg] font-supakan sm:text-3xl tracking-wider text-xl hover:cursor-pointer">Melody <span className="text-pinky-200">flow</span></h1>
                </div>
            </div>
            {/* Navbar */}
            <div className={`lg:hidden bg-black-200 w-full flex flex-col items-center absolute z-10 translate-all duration-200 ${navbarSlide ? 'top-[90px]' : '-top-[360px]'}`}>
                <a href="/" className="w-full">
                    <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                        <span className="text-xl font-normal">Home</span>
                        <i className="ml-12 fa-solid fa-house"></i>
                    </div>
                </a>
                <a href="/profile" className="w-full">
                    <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                        <span className="text-xl font-normal">Profile</span>
                        <i className="fa-solid fa-user ml-12"></i>
                    </div>
                </a>
                <a href="/like" className="w-full">
                    <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                        <span className="text-xl font-normal">Like</span>
                        <i className="ml-12 fa-solid fa-heart"></i>
                    </div>
                </a>
                <a href="/list" className="w-full">
                    <div className="hover:bg-white w-full h-[90px] flex items-center justify-center text-2xl font-bold text-white hover:text-black-200 transition-all duration-200 hover:cursor-pointer">
                        <span className="text-xl font-normal">List</span>
                        <i className="ml-12 fa-solid fa-folder"></i>
                    </div>
                </a>
                {permission ? adminBar() : ''}
            </div>
        </div>
    )
}

export default NavBarComponent