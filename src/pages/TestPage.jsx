import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer, toast, Slide } from "react-toastify"

const TestPage = () => {

    const alert = () => {
        toast.success('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }

    return (
        <div className="w-full h-screen bg-black-200">
            <button className="bg-white p-4" onClick={alert}>Click</button>
            <ToastContainer />
        </div>
    )

}

export default TestPage