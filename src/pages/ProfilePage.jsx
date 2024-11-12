import NavBarComponent from "../components/NavBarComponent"
import PlaylistBoxComponent from "../components/PlaylistBoxComponent"

const ProfilePage = () => {

    const titleList = [
        {title: 'Like', image: '../public/images/test-wallpaper.jpg'},
        {title: 'List1', image: '../public/images/test-wallpaper2.jpg'},
        {title: 'List2', image: '../public/images/test-wallpaper3.jpg'},
        {title: 'Like3', image: '../public/images/test-wallpaper2.jpg'},
        {title: 'Like4', image: '../public/images/test-wallpaper.jpg'},
        {title: 'Like5', image: '../public/images/test-wallpaper2.jpg'},
        {title: 'Like6', image: '../public/images/test-wallpaper3.jpg'},
    ]
    
    return (
        <div className="min-h-screen w-full bg-black-200 bg-gradient-to-br from-10% via-pink-600 from-black-200 to-pink-300 flex flex-col lg:flex-row truncate" style={{overflowY: 'auto', scrollbarWidth: 'none'}}>
            <NavBarComponent />
            <section className="lg:w-1/2 lg:h-screen h-screen w-full relative lg:ml-[90px] truncate">
                <div className="2xl:h-80 sm:h-64 h-44 aspect-square bg-white rounded-full absolute top-[30%] right-1/2 translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-cover bg-center hover:scale-110 hover:cursor-pointer transition-all" style={{ backgroundImage: 'url(../public/images/ghost-icon.jpg)' }}></div>
                <div className="w-[70%] sm:min-w-[400px] min-w-[300px] h-1/2 bg-white/10 absolute top-[60%] right-1/2 translate-x-1/2 -translate-y-1/2 rounded p-16 flex items-center flex-col">
                    <div className="sm:mt-16 mt-4">
                        <h1 className="text-4xl font-bold text-white    ">Jimmy Seesang</h1>
                    </div>
                    <div>
                        <p className="text-white/70">@Jimmyseesang</p>
                    </div>
                    <table className="xl:w-[400px] w-[350px] h-[200px] text-white mt-4 hidden sm:table">
                        <tbody>
                            <tr>
                                <td className="font-bold text-lg">Username</td>
                                <td>Jimmy seesang</td>
                                <td><i className="fa-solid fa-pen-to-square p-2 hover:cursor-pointer hover:text-white/50"></i></td>
                            </tr>
                            <tr>
                                <td className="font-bold text-lg">Email</td>
                                <td>Jimmyseesang@gmail.com</td>
                                <td><i className="fa-solid fa-pen-to-square p-2 hover:cursor-pointer hover:text-white/50"></i></td>
                            </tr>
                            <tr>
                                <td className="font-bold text-lg">Date</td>
                                <td>26 February 2005</td>
                                <td><i className="fa-solid fa-pen-to-square p-2 hover:cursor-pointer hover:text-white/50"></i></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="w-[250px] h-full sm:hidden table mt-8 text-white">
                        <tbody>
                            <tr className="font-bold">
                                <td>Username</td>
                            </tr>
                            <tr>
                                <td>Jimmyseesang</td>
                                <td><i className="fa-solid fa-pen-to-square p-2 hover:cursor-pointer hover:text-white/50"></i></td>
                            </tr>
                            <tr className="font-bold">
                                <td>Email</td>
                            </tr>
                            <tr>
                                <td>Jimmyseesang@gmail.com</td>
                                <td><i className="fa-solid fa-pen-to-square p-2 hover:cursor-pointer hover:text-white/50"></i></td>
                            </tr>
                            <tr className="font-bold">
                                <td>Date</td>
                            </tr>
                            <tr>
                                <td>26 February 2005</td>
                                <td><i className="fa-solid fa-pen-to-square p-2 hover:cursor-pointer hover:text-white/50"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="lg:w-1/2 lg:h-screen w-full h-screen flex lg:flex-col bg-white/10 border-l border-white/25 flex-col">
                <div className="w-full h-[10%] flex justify-center items-center lg:my-0 my-16">
                    <h1 className="text-white text-4xl font-bold border p-4 rounded-full">Playlist</h1>
                </div>
                <div className="w-full h-[90%] px-16 py-2 overflow-y-auto overflow-visible flex flex-wrap justify-center gap-[36px]" style={{ scrollbarWidth: 'none' }}>
                    {titleList.map((e,i) => {
                        return <PlaylistBoxComponent key={i} {...e} />
                    })}
                </div>
            </section>
        </div>
    )
}

export default ProfilePage