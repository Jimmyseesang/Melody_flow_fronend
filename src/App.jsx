import { Route, Routes } from "react-router-dom"
// import Page
import HomePage from "./pages/HomePage"
import TestPage from "./pages/TestPage"
import MusicPage from "./pages/MusicPage"
import RegisterPage from "./pages/RegisterPage"
import AdminPage from "./pages/AdminPage"
import ProtectRoute from "./pages/ProtectRoute"
import ProfilePage from "./pages/profilePage"

const App = () => {

    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/music/:id" element={<MusicPage />} />
            <Route element={<ProtectRoute/>} >
                <Route path="/admin" element={<AdminPage/>} />
            </Route>
            <Route path="/profile" element={<ProfilePage/>} />
        </Routes>

    )
}

export default App
