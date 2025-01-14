import { useContext, useEffect, useMemo } from "react";

import NavBarComponent from "../components/NavBarComponent";
import CircleComponent from "../components/CircleComponent";
import PlaylistBoxComponent from "../components/PlaylistBoxComponent";
import { ProfileContext } from "../contexts/ProfileContext";

const PlaylistPage = () => {
    const bubble = (index) => {
        const component = [];
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />);
        }
        return component;
    };

    const bubbles = useMemo(() => bubble(20), []);

    const { profile, fetchProfile } = useContext(ProfileContext);

    useEffect(() => {
        fetchProfile();
    }, [])

    return (
        <div className="truncate w-full h-screen bg-gradient-to-br from-black-200 via-pink-600 to-pink-200">
            <NavBarComponent />
            <div className="absolute h-full w-full background-black-200 blur-xl truncate z-10">
                {bubbles}
            </div>
            <section className="h-screen w-full flex justify-center items-center mt-10 lg:mt-0">
                <div className="w-[60%] lg:h-[90%] h-[80%] bg-white/50 rounded-2xl min-w-[300px] z-20 truncate">
                    <div className="w-full h-[10%] flex justify-center items-center bg-black-200">
                        <h1 className="text-4xl font-bold text-white text-center">
                            PlayList&nbsp;&nbsp;
                            <i className="fa-regular fa-bookmark text-pink-600"></i>
                        </h1>
                    </div>
                    <div
                        className="w-full h-full flex flex-wrap justify-around truncate gap-y-20 pb-32 pt-8 scrollbarCustom"
                        style={{ overflowY: "auto" }}
                    >
                        {profile && profile.playlist.length > 0 ? (
                            profile.playlist.map((e, i) => (
                                <PlaylistBoxComponent key={i} {...e} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No playlist available</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PlaylistPage;
