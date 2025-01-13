import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { ToastContainer, toast, Slide } from "react-toastify"

const TestPage = () => {

    const testRef = useRef(null)

    const handleClick = (e) => {
        console.log('Client Y : ',e.clientY)
        console.log('GetBounding : ',testRef.current.getBoundingClientRect().top)
    }
    
    return (
        <div className="w-full h-screen bg-black-200 text-9xl text-white font-bold flex items-center justify-center">
            <div className="h-full w-6 rounded-full bg-white m-auto hover:cursor-pointer" ref={testRef} onClick={handleClick}></div>
        </div>
    )

}

export default TestPage