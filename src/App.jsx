import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import TestPage from "./pages/TestPage"
import MusicPage from "./pages/MusicPage"
import RegisterPage from "./pages/RegisterPage"

const App = () => {

    return (

        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/test" element={<TestPage/>}/>
            <Route path="/music/:id" element={<MusicPage/>} />
        </Routes>
      
    )
}

export default App
