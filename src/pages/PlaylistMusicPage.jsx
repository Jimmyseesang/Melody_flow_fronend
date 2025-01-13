import { useMemo } from "react";
import NavBarComponent from "../components/NavBarComponent";
import CircleComponent from "../components/CircleComponent";

const PlaylistMusicPage = () => {

    const bubble = (index) => {
        const component = [];
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />);
        }
        return component;
    };

    const bubbles = useMemo(() => bubble(20), []);

    return (
        <div className="truncate w-full h-screen bg-gradient-to-br from-black-200 via-pink-600 to-pink-200">
            <NavBarComponent />
            <div className="absolute h-full w-full background-black-200 blur-xl truncate z-10">
                {bubbles}
            </div>
            <div className="w-[95.3%] h-full bg-black-200/50 z-20 absolute right-0 flex items-center justify-center">
                <div className="w-1/2 h-[500px] bg-black-200 rounded-2xl">
                    <div className="w-1/5 aspect-square bg-white rounded-full absolute -translate-y-1/2 right-1/2 translate-x-1/2"></div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistMusicPage