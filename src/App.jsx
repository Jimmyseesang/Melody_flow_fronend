import { Route, Routes } from "react-router-dom"

import "react-toastify/dist/ReactToastify.css";

// import Page
import HomePage from "./pages/HomePage"
import MusicPage from "./pages/MusicPage"
import RegisterPage from "./pages/RegisterPage"
import AdminPage from "./pages/AdminPage"
import ProtectRoute from "./pages/ProtectRoute"
import ProfilePage from "./pages/ProfilePage"
import PlaylistPage from "./pages/PlaylistPage"
import LikePage from "./pages/LikePage"
import PageNotFound from "./pages/PageNotFound"
import ProtectLogin from "./pages/ProtectLogin";
import { ProfileProvider } from "./contexts/ProfileContext";
import { MusicProvider } from "./contexts/MusicContext";
import ArtistEditPage from "./pages/ArtistEditPage";
import PlaylistIdPage from "./pages/PlaylistIdPage";

const App = () => {

    return (

        <ProfileProvider>
            <MusicProvider>
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route element={<ProtectRoute />} >
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/admin/editArtist/:artistId" element={<ArtistEditPage/>} />
                    </Route>
                    <Route element={<ProtectLogin />}>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/list" element={<PlaylistPage />} />
                        <Route path="/like" element={<LikePage />} />
                        <Route path="/music/:musicId" element={<MusicPage />} />
                        <Route path="/list/:playlistId/:musicId" element={<MusicPage/>}/>
                        <Route path="/like/:musicId" element={<MusicPage/>}/>
                        <Route path="/artistMusic/:artistId/:musicId" element={<MusicPage/>}/>
                        <Route path="/playlist/:playlistId" element={<PlaylistIdPage/>} />
                    </Route>
                    <Route path="/*" element={<PageNotFound />} />
                </Routes>
            </MusicProvider>
        </ProfileProvider>

    )
}

export default App
