import { Route, Routes } from "react-router-dom"

import "react-toastify/dist/ReactToastify.css";
// import Page
import HomePage from "./pages/HomePage"
import TestPage from "./pages/TestPage"
import MusicPage from "./pages/MusicPage"
import RegisterPage from "./pages/RegisterPage"
import AdminPage from "./pages/AdminPage"
import ProtectRoute from "./pages/ProtectRoute"
import ProfilePage from "./pages/profilePage"
import PlaylistPage from "./pages/PlaylistPage"
import LikePage from "./pages/LikePage"
import PageNotFound from "./pages/PageNotFound"
import ProtectLogin from "./pages/ProtectLogin";

const App = () => {

    return (

        <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/music/:id" element={<MusicPage />} />
            <Route element={<ProtectRoute/>} >
                <Route path="/admin" element={<AdminPage/>} />
            </Route>
            <Route element={<ProtectLogin/>}>
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/list" element={<PlaylistPage/>} />
                <Route path="/like" element={<LikePage/>} />
            </Route>
            <Route path="/*" element={<PageNotFound/>} />
            <Route path="/test" element={<TestPage />} />
        </Routes>

    )
}

export default App
