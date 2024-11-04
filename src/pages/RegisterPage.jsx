import { useState } from "react"
import CircleComponent from "../components/CircleComponent"

const RegisterPage = () => {

    const [elementHide, setElementHide] = useState(false)

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    const handleSubmit = (event) => {
        event.preventDefault()

    }

    return (
        <div className="h-screen w-full bg-gradient-to-tr from-pink-500 to-black-100 truncate relative">
            {/* background */}
            <div className="absolute h-full w-full background-black-200 blur-xl">
                {bubble(20)}
            </div>
            {/* Register section */}
            <section className="md:w-[60%] w-[80%] h-[800px] bg-black-200 z-10 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded backdrop-blur-3xl flex text-white truncate md:min-w-[700px] min-w-[300px] animate-appear">
                <div className={`md:w-1/2 w-full h-full flex flex-col justify-center transition-all duration-[2s] ${elementHide ? '-translate-x-[430px] opacity-0 ' : 'delay-[1s]'}`}>
                    <div className="w-full flex flex-col justify-center items-center">
                        <div>
                            <h1 className="text-3xl font-extrabold">Sign Up</h1>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-start justify-center">
                                <div className="flex flex-col my-4">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        placeholder="email..."
                                        id="email"
                                        className="text-black-200 rounded p-2 outline-offset-0 outline-2 focus:outline-pink-600 transition-all duration-300"
                                    />
                                </div>
                                <div className="flex flex-col my-4">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        placeholder="name..."
                                        id="name"
                                        className="text-black-200 rounded p-2 outline-offset-0 outline-2 focus:outline-pink-600 transition-all duration-300"
                                    />
                                </div>
                                <div className="flex flex-col my-4">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        placeholder="password..."
                                        id="password"
                                        className="text-black-200 rounded p-2 outline-offset-0 outline-2 focus:outline-pink-600 transition-all duration-300"
                                    />
                                </div>
                                <div className="w-full">
                                    <button className="bg-black-100 p-2 w-full text-base rounded mt-4 hover:bg-pink-800 hover:text-black-200 transition-all duration-200" type="submit">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="w-full flex justify-center translate-y-16">
                        <p className="flex">Already have an account? <div onClick={() => {setElementHide(!elementHide)}} className="ml-2 hover:text-pink-600 transition-all duration-200 hover:cursor-pointer">Sing in <span><i className="fa-solid fa-right-to-bracket"></i></span></div></p>
                    </div>
                </div>
                <div className={`w-1/2 h-full hidden md:flex flex-col justify-center items-center transition-all duration-[2s] ${elementHide ? 'delay-[1s] opacity-100 translate-x-[0px]' : 'translate-x-[450px] opacity-0'}`}>
                    <div className="text-black-200">
                        <h1 className="text-3xl font-extrabold">Login</h1>
                    </div>
                    <div>
                        <form className="text-black-200">
                            <div className="flex flex-col my-4">
                                <label htmlFor="email-login">Email</label>
                                <input 
                                    type="text"
                                    placeholder="email..."
                                    id="email-login"    
                                    className="p-2 bg-black-200 text-white rounded outline-0 focus:outline-pink-600 focus:outline-2 transition-all duration-300"
                                />
                            </div>
                            <div className="flex flex-col my-4">
                                <label htmlFor="password-login">Password</label>
                                <input 
                                    type="password"
                                    placeholder="password..."
                                    id="password-login" 
                                    className="p-2 bg-black-200 text-white rounded outline-0 focus:outline-pink-600 focus:outline-2 transition-all duration-300"
                                /> 
                            </div>
                            <div className="flex items-center justify-center">
                                <button className="bg-white/50 text-black-200 p-2 w-full mt-4 rounded hover:bg-black-200 hover:text-pink-600 transition-all duration-200" >Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="w-full flex justify-center translate-y-16">
                        <p className="flex">Don't have an account? <div onClick={() => {setElementHide(!elementHide)}} className="ml-2 hover:text-black-200 transition-all duration-200 hover:cursor-pointer">Sing up <span><i className="fa-solid fa-right-to-bracket"></i></span></div></p>
                    </div>
                </div>
                <div className={`md:w-[100%] hidden md:block h-full md:absolute bg-pink-600 md:-right-[50%] md:top-0 transition-all duration-[2s] ${elementHide ? 'md:-skew-x-[20deg] -z-10' : 'md:skew-x-[20deg] -z-0'}`}></div>
                <i className={`fa-solid fa-music text-9xl absolute top-[40%] xl:right[20%] hidden md:block duration-[2s] ${elementHide ? '-right-[150px] opacity-0' : 'animate-bounce right-[15%] delay-[1s]'}`}></i>
                <i className={`fa-solid fa-compact-disc text-9xl absolute top-[40%] -translate-x-1/2 duration-[2s] ${elementHide ? 'animate-spin left-[20%] delay-[1s]' : '-left-[150px] opacity-0'}`}></i>
            </section>
        </div>
    )
}

export default RegisterPage