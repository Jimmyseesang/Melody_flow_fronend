const ArtistBoxComponent = (props) => {

    const {artistName, imgUrl} = props

    return (
        <div className="h-full bg-black-200 rounded relative">
            <div className="w-full flex flex-col items-center justify-center py-4 hover:cursor-pointer">
                <div style={{ backgroundImage: `url(${imgUrl})` }} className="w-[90%] max-w-64 aspect-square bg-cover bg-top rounded mb-4"></div>
                <hr className="w-64 rounded-full" />
            </div>
            <div className="text-white max-w-72 pl-4">
                <h4 className="text-xl font-bold pb-1 whitespace-normal">{artistName}</h4>
            </div>
            <div className="absolute w-12 h-12 bg-white rounded-full bottom-4 right-4 text-2xl flex justify-center items-center hover:text-green-500 hover:cursor-pointer transition-all duration-300"><i className="fa-solid fa-plus"></i></div>
            <div className="absolute w-12 h-12 bg-white rounded-full bottom-4 right-20 text-2xl flex justify-center items-center hover:text-red-500 hover:cursor-pointer transition-all duration-300"><i className="fa-solid fa-heart"></i></div>
        </div>
    )
}

export default ArtistBoxComponent