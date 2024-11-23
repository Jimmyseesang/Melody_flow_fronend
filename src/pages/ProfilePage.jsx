import { useContext, useEffect, useMemo, useRef, useState } from "react"
import "react-image-crop/dist/ReactCrop.css";
import { useNavigate } from "react-router-dom";

import NavBarComponent from "../components/NavBarComponent"
import CircleComponent from "../components/CircleComponent"
import { ProfileContext } from "../contexts/ProfileContext";
import axios from "axios";

const ProfilePage = () => {

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }
    // Info
    const bubbles = useMemo(() => bubble(20), [])

    const navigate = useNavigate()

    const [pfHover, setPfHover] = useState(false)
    const imageInput = useRef(null)

    const { profile, fetchProfile, apiHost, apiPort, token, profileImg } = useContext(ProfileContext)

    const uploadImage = () => {
        imageInput.current.click()
    }

    const uploadProfile = async (image) => {
        const data = new FormData()
        data.append('image', image)

        try {
            const response = await axios.post(`http://${apiHost}:${apiPort}/user/uploadProfile`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                console.log('success')
                fetchProfile()
            } else {
                console.error('Failed to upload profile image:', response)
            }
        } catch (error) {
            console.error('Error uploading profile image:', error)
            alert('Failed to upload profile image. Please try again later.')
        }
    }

    const onSelectFile = (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (/image\/(jpeg|png)/.test(file.type)) {

            uploadProfile(file)

        }
        e.target.value = null

    }

    useEffect(() => {

        fetchProfile()

    }, [])

    return (
        <div className="min-h-screen w-full bg-black-200 bg-gradient-to-br from-10% via-pink-600 from-black-200 to-pink-300 flex flex-col lg:flex-row truncate overflow-hidden" style={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
            <NavBarComponent />
            <div className="absolute h-full w-full background-black-200 blur-xl truncate">
                {bubbles}
            </div>
            {profile &&
                <section className="lg:w-full lg:h-screen h-screen w-full relative lg:ml-[90px] truncate">
                    <div className="2xl:h-80 sm:h-64 h-44 aspect-square bg-white rounded-full absolute top-[30%] right-1/2 translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-cover bg-center hover:scale-110 hover:cursor-pointer transition-all z-30" style={{ backgroundImage: `url(${profileImg})` }} onMouseEnter={() => { setPfHover(true) }} onMouseLeave={() => { setPfHover(false) }} onClick={uploadImage}>
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
                                    <td>{profile.name} </td>
                                </tr>
                                <tr>
                                    <td className="font-bold text-lg">Email</td>
                                    <td>{profile.email}</td>
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
                                </tr>
                                <tr className="font-bold">
                                    <td>Email</td>
                                </tr>
                                <tr>
                                    <td>Jimmyseesang@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>}
        </div>
    )
}

export default ProfilePage