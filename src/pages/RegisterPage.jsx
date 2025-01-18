import axios from "axios"
import CircleComponent from "../components/CircleComponent"

import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

const apiHost = import.meta.env.VITE_SERVER_HOST
const apiPort = import.meta.env.VITE_SERVER_PORT

const RegisterPage = () => {

    const navigate = useNavigate()
    
    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }
        
        return component
    }
    
    const bubbles = useMemo(() => bubble(20), [])
    const [elementHide, setElementHide] = useState(false)

    // register input
    const [regisEmail, setRegisEmail] = useState('')
    const [name, setName] = useState('')
    const [regisPassword, setRegisPassword] = useState('')

    // register alert
    const [alertRegisEmail, setAlertRegisEmail] = useState(false)
    const [alertName, setAlertName] = useState(false)
    const [alertRegisPassword, setAlertRegisPassword] = useState(false)
    const [alertEMessage, setAlertEMessage] = useState('Please input this filed!!!')

    // login input
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    // login alert
    const [alertLoginEmail, setAlertLoginEmail] = useState('')
    const [alertLoginPassword, setAlertLoginPassword] = useState('')

    const resetRegisterData = () => {
        setRegisEmail('')
        setName('')
        setRegisPassword('')
    }

    const resetLoginData = () => {
        setLoginEmail('')
        setLoginPassword('')
    }

    const chackRegisData = () => {

        let isValid = true
        const emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/

        if (regisEmail === '' || null) {
            isValid = false
            setAlertRegisEmail(true)
        } else if (!emailPattern.test(regisEmail)) {
            isValid = false
            setAlertEMessage('Please enter @gmail.com')
            setAlertRegisEmail(true)
        }

        if (name === '' || null) {
            isValid = false
            setAlertName(true)
        }
        if (regisPassword == '' || null) {
            isValid = false
            setAlertRegisPassword(true)
        }

        return isValid

    }

    const checkLoginData = () => {

        let valid = true

        if (loginEmail === '' || null) {
            setAlertLoginEmail(true)
            valid = false
        }

        if (loginPassword === '' || null) {
            setAlertLoginPassword(true)
            valid = false
        }

        return valid

    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault()

        if (chackRegisData()) {
            const data = {
                email: regisEmail,
                name,
                password: regisPassword
            };

            try {

                await axios.post(`https://melody-flow.online/user/register`, data)
                setElementHide(!elementHide)
                resetRegisterData()

            } catch (error) {
                if (error.response.status === 409) {
                    setAlertEMessage('This email already exists')
                    setAlertRegisEmail(true)
                }
                else {
                    console.error('Error Registing data', error)
                }
            }
        }
    };


    const handleLoginSubmit = async (event) => {

        event.preventDefault()

        if(checkLoginData()) {
            const data = {
                email: loginEmail,
                password: loginPassword
            }

            try{

                const response = await axios.post(`https://melody-flow.online/user/login`,data)
                localStorage.setItem('token', response.data.token)
                navigate('/')

            }
            catch(err) {

                if(err.status === 404){
                    setAlertLoginEmail(true)
                    setAlertEMessage('Email or password incorrect')
                }
                else {

                    console.error('Error login', err)

                }                
            }
        }


    }

    return (
        <div className="h-screen w-full bg-gradient-to-tr from-pink-500 to-black-100 truncate relative">
            {/* background */}
            <div className="absolute h-full w-full background-black-200 blur-xl">
                {bubbles}
            </div>
            {/* Register section */}
            <section className={`md:w-[60%] w-[80%] h-[800px] md:bg-black-200 z-10 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded backdrop-blur-3xl flex text-white truncate md:min-w-[700px] min-w-[300px] animate-appear ${elementHide ? 'bg-pink-600' : 'bg-black-200'}`}>
                {/* Register form */}
                <div className={`md:w-1/2 w-full h-full flex flex-col justify-center transition-all duration-[2s] ${elementHide ? '-translate-x-[430px] opacity-0 hidden md:flex' : 'delay-[1s]'}`}>
                    <div className="w-full flex flex-col justify-center items-center">
                        <div>
                            <h1 className="text-3xl font-extrabold">Sign Up</h1>
                        </div>
                        <div>
                            <form onSubmit={handleRegisterSubmit} className="w-full h-full flex flex-col items-start justify-center">
                                <div className="flex flex-col my-4">
                                    <label htmlFor="email">Email <span className={`text-sm text-red-600 mt-1 ${alertRegisEmail ? '' : 'hidden'}`}>{alertEMessage}</span></label>
                                    <input
                                        type="text"
                                        placeholder="email..."
                                        id="email"
                                        onChange={(e) => setRegisEmail(e.target.value)}
                                        className="text-black-200 rounded p-2 outline-offset-0 outline-2 focus:outline-pink-600 transition-all duration-300 max-w-[216px]"
                                        onFocus={() => {
                                            setAlertRegisEmail(false)
                                            setAlertEMessage('Please input this filed!!!')
                                        }}
                                        value={regisEmail}
                                    />
                                </div>
                                <div className="flex flex-col my-4">
                                    <label htmlFor="name">Name <span className={`text-sm text-red-600 mt-1 ${alertName ? '' : 'hidden'}`}>Please input this filed!!!</span></label>
                                    <input
                                        type="text"
                                        placeholder="name..."
                                        id="name"
                                        onChange={(e) => setName(e.target.value)}
                                        className="text-black-200 rounded p-2 outline-offset-0 outline-2 focus:outline-pink-600 transition-all duration-300 max-w-[216px]"
                                        onFocus={() => setAlertName(false)}
                                        value={name}
                                    />
                                </div>
                                <div className="flex flex-col my-4">
                                    <label htmlFor="password">Password <span className={`text-sm text-red-600 mt-1 ${alertRegisPassword ? '' : 'hidden'}`}>Please input this filed!!!</span></label>
                                    <input
                                        type="password"
                                        placeholder="password..."
                                        id="password"
                                        onChange={(e) => setRegisPassword(e.target.value)}
                                        className="text-black-200 rounded p-2 outline-offset-0 outline-2 focus:outline-pink-600 transition-all duration-300 max-w-[216px]"
                                        onFocus={() => { setAlertRegisPassword(false) }}
                                        value={regisPassword}
                                    />
                                </div>
                                <div className="w-full">
                                    <button className="bg-black-100 p-2 w-full text-base rounded mt-4 hover:bg-pink-800 hover:text-black-200 transition-all duration-200" type="submit">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="w-full flex justify-center translate-y-16">
                        <p className="flex">
                            Already have an account?
                            <span
                                onClick={() => { 
                                    setElementHide(!elementHide)
                                    resetRegisterData()
                                    setAlertRegisPassword(false)
                                    setAlertName(false)
                                    setAlertRegisEmail(false)
                                 }}
                                className="ml-2 hover:text-pink-600 transition-all duration-200 hover:cursor-pointer"
                            >
                                Sign in <i className="fa-solid fa-right-to-bracket"></i>
                            </span>
                        </p>
                    </div>

                </div>
                {/* Login form */}
                <div className={`md:w-1/2 w-full h-full md:flex flex-col justify-center items-center transition-all duration-[2s] ${elementHide ? 'delay-[1s] opacity-100 translate-x-[0px] flex' : 'translate-x-[450px] opacity-0 hidden'}`}>
                    <div className="text-black-200">
                        <h1 className="text-3xl font-extrabold text-center">Login</h1>
                    </div>
                    <div>
                        <form className="text-black-200" onSubmit={handleLoginSubmit}>
                            <div className="flex flex-col my-4">
                                <label htmlFor="email-login">Email <span className={`text-sm text-red-600 mt-1 bg-black-200 rounded px-2 ${alertLoginEmail ? '' : 'hidden'}`}>{alertEMessage}</span></label>
                                <input
                                    type="text"
                                    placeholder="email..."
                                    id="email-login"
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    value={loginEmail}
                                    onFocus={() => {
                                        setAlertLoginEmail(false)
                                        setAlertEMessage('Please input this filed!!!')
                                    }}
                                    className="p-2 bg-black-200 text-white rounded outline-0 focus:outline-pink-600 focus:outline-2 transition-all duration-300"
                                />
                            </div>
                            <div className="flex flex-col my-4">
                                <label htmlFor="password-login">Password <span className={`text-sm text-red-600 mt-1 bg-black-200 rounded px-2 ${alertLoginPassword ? '' : 'hidden'}`}>Please input this filed!!!</span></label>
                                <input
                                    type="password"
                                    placeholder="password..."
                                    id="password-login"
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    value={loginPassword}
                                    onFocus={() => setAlertLoginPassword(false)}
                                    className="p-2 bg-black-200 text-white rounded outline-0 focus:outline-pink-600 focus:outline-2 transition-all duration-300"
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <button className="bg-white/50 text-black-200 p-2 w-full mt-4 rounded hover:bg-black-200 hover:text-pink-600 transition-all duration-200" type="submit" >Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="w-full flex justify-center translate-y-16">
                        <p className="flex">
                            Don't have an account?
                            <span
                                onClick={() => { 
                                    setElementHide(!elementHide); 
                                    resetLoginData()
                                    setAlertLoginEmail(false)
                                }}
                                className="ml-2 hover:text-black-200 transition-all duration-200 hover:cursor-pointer"
                            >
                                Sign up <i className="fa-solid fa-right-to-bracket"></i>
                            </span>
                        </p>
                    </div>
                </div>
                <div className={`md:w-[100%] h-full md:absolute bg-pink-600 md:-right-[50%] md:top-0 transition-all duration-[2s] ${elementHide ? 'md:-skew-x-[20deg] -z-10' : 'md:skew-x-[20deg] -z-0'}`}></div>
                <i className={`fa-solid fa-music text-9xl absolute top-[40%] xl:right[20%] hidden md:block duration-[2s] ${elementHide ? '-right-[150px] opacity-0' : 'animate-bounce right-[15%] delay-[1s]'}`}></i>
                <i className={`fa-solid fa-compact-disc text-9xl absolute top-[40%] hidden md:block -translate-x-1/2 duration-[2s] ${elementHide ? 'animate-spin left-[20%] delay-[1s]' : '-left-[150px] opacity-0'}`}></i>
            </section>
        </div>
    )
}

export default RegisterPage