import { useEffect, useMemo, useRef, useState } from "react"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css";

import NavBarComponent from "../components/NavBarComponent"
import CircleComponent from "../components/CircleComponent"
import axios from "axios";
import { redirect } from "react-router-dom";

const apiHost = import.meta.env.VITE_SERVER_HOST
const apiPort = import.meta.env.VITE_SERVER_PORT


const ProfilePage = () => {

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    const bubbles = useMemo(() => bubble(20), [])

    const [pfHover, setPfHover] = useState(false)
    const [imgSrc, setImgSrc] = useState('')
    const imageInput = useRef(null)

    const uploadImage = () => {
        imageInput.current.click()
    }

    const onSelectFile = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.addEventListener("load", () => {
            const imageUrl = reader.result.toString()
            setImgSrc(imageUrl)
        })

        reader.readAsDataURL(file)
    }

    const ASPECT_RATIO = 1;
    const MIN_DIMENSION = 150;


    const [crop, setCrop] = useState({
        unit: 'px',
        width: MIN_DIMENSION,
        aspect: ASPECT_RATIO
    })

    const onImageLoad = (e) => {

        const { width, height } = e.currentTarget

        setCrop((prevCrop) => ({
            ...prevCrop,
            width: Math.min(width, MIN_DIMENSION),
            height: Math.max(width, MIN_DIMENSION),
            x: (width - MIN_DIMENSION) / 2,
            y: (height - MIN_DIMENSION) / 2
        }))

    }

    const [profile, setProfile] = useState({})

    useEffect(() => {
        const getProfile = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                redirect('/')
            }
            const response = await axios.get(`http://${apiHost}:${apiPort}/user/getProfile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const profile = response.data.user
            console.log(profile)
            setProfile({
                image: profile.image || '../public/images/user-image.png',
                name: profile.name || 'null',
                email: profile.email || 'null',
                date: profile.date || 'null'
            })

            setUsername(profile.name || 'null')
            setEmail(profile.email || 'null')
            setDate(profile.date || 'null')
        }

        getProfile()

    },[])

    const [inputUsername, setInputUsername] = useState(false)
    const [inputEmail, setinputEmail] = useState(false)
    const [inputDate, setInputDate] = useState(false)
    
    const [username, setUsername] = useState('null')
    const [email, setEmail] = useState('null')
    const [date, setDate] = useState('null')
    
    return (
        <div className="min-h-screen w-full bg-black-200 bg-gradient-to-br from-10% via-pink-600 from-black-200 to-pink-300 flex flex-col lg:flex-row truncate overflow-hidden" style={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
            <NavBarComponent />
            <div className="absolute h-full w-full background-black-200 blur-xl truncate">
                {bubbles}
            </div>
            <section className="lg:w-full lg:h-screen h-screen w-full relative lg:ml-[90px] truncate">
                <div className="2xl:h-80 sm:h-64 h-44 aspect-square bg-white rounded-full absolute top-[30%] right-1/2 translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-cover bg-center hover:scale-110 hover:cursor-pointer transition-all z-20" style={{ backgroundImage: `url(${profile.image})` }} onMouseEnter={() => { setPfHover(true) }} onMouseLeave={() => { setPfHover(false) }} onClick={uploadImage}>
                    <div className={`h-full aspect-square bg-white rounded-full ${pfHover ? ' bg-opacity-50' : 'bg-opacity-0'} truncate flex items-end hover:cursor-pointer transition-all duration-200`}>
                        <div className={`w-full h-1/3 bg-black-200/50 flex items-center justify-center hover:cursor-pointer rounded-b-full transition-all duration-200 ${pfHover ? 'opacity-100' : 'opacity-0'}`}>select image</div>
                    </div>
                    <input type="file" className="hidden" ref={imageInput} onChange={onSelectFile} />
                </div>
                <div className="w-[70%] sm:min-w-[400px] min-w-[300px] h-1/2 bg-white/10 absolute top-[60%] right-1/2 translate-x-1/2 -translate-y-1/2 rounded p-16 flex items-center flex-col">
                    <div className="sm:mt-16 mt-4">
                        <h1 className="text-4xl font-bold text-white first-letter:uppercase">{profile.name}</h1>
                    </div>
                    <div>
                        <p className="text-white/70">@{profile.name}</p>
                    </div>
                    <table className="xl:w-[400px] w-[350px] h-[200px] text-white mt-4 hidden sm:table">
                        <tbody>
                            <tr>
                                <td className="font-bold text-lg">Username</td>
                                <td>{inputUsername ? <input type="text" className="outline-none bg-white/50 rounded p-2" value={username} onChange={(e) => {setUsername(e.target.value)}} /> : profile.name} </td>
                                <td onClick={() => setInputUsername(!inputUsername)}><i className="fa-solid fa-pen-to-square p-2 hover:cursor-pointer hover:text-white/50"></i></td>
                            </tr>
                            <tr>
                                <td className="font-bold text-lg">Email</td>
                                <td>{inputEmail ? <input type="text" className="outline-none bg-white/50 rounded p-2" value={email} onChange={(e) => {setEmail(e.target.value)}}/> : profile.email}</td>
                                <td onClick={() => setinputEmail(!inputEmail)}><i className="fa-solid fa-pen-to-square p-2 hover:cursor-pointer hover:text-white/50"></i></td>
                            </tr>
                            <tr>
                                <td className="font-bold text-lg">Date</td>
                                <td>{inputDate ? <input type="text" className="outline-none bg-white/50 rounded p-2" value={date} onChange={(e) => {setDate(e.target.value)}}/> : profile.date}</td>
                                <td onClick={() => setInputDate(!inputDate)}><i className="fa-solid fa-pen-to-square p-2 hover:cursor-pointer hover:text-white/50"></i></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="w-[250px] h-full sm:hidden table mt-8 text-white">
                        <tbody>
                            <tr className="font-bold">
                                <td>Username</td>
                            </tr>
                            <tr>
                                <td>Jimmyseesang</td>
                                <td><i className="fa-solid fa-pen-to-square p-2 hover:cursor-pointer hover:text-white/50"></i></td>
                            </tr>
                            <tr className="font-bold">
                                <td>Email</td>
                            </tr>
                            <tr>
                                <td>Jimmyseesang@gmail.com</td>
                                <td><i className="fa-solid fa-pen-to-square p-2 hover:cursor-pointer hover:text-white/50"></i></td>
                            </tr>
                            <tr className="font-bold">
                                <td>Date</td>
                            </tr>
                            <tr>
                                <td>26 February 2005</td>
                                <td><i className="fa-sjolid fa-pen-to-square p-2 hover:cursor-pointer hover:text-white/50"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {imgSrc && (
                    <div className="w-full h-full bg-black-200/50">
                        <div className="flex flex-col items-center absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-30">
                            <ReactCrop crop={crop} onChange={(newCrop) => setCrop(newCrop)} aspect={ASPECT_RATIO} circularCrop>
                                <img src={imgSrc} className="max-h-[700px]" alt="Upload img" onLoad={onImageLoad} />
                            </ReactCrop>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default ProfilePage