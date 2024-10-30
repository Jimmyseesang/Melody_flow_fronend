const MusicBoxComponent = (props) => {

    const {name, image, artist} = props

    return (
        <div className="min-w-72 h-[90%] bg-black-100/75 rounded relative top-0">
            <div className="w-full rounded py-4 mx-auto bg-black-100/75">
                <div style={{ backgroundImage: `url(${image})` }} className="w-[90%] aspect-square bg-cover bg-top rounded mx-auto"></div>
            </div>
            <div className="text-white p-4">
                <h4 className="text-xl font-bold pb-1">{name}</h4>
                <p className=""><span className="font-bold">artist:</span> {artist}</p>
            </div>
            <div className="absolute w-12 h-12 bg-white rounded-full bottom-4 right-4 text-2xl flex justify-center items-center hover:text-green-500 hover:cursor-pointer"><i className="fa-solid fa-plus"></i></div>
            <div className="absolute w-12 h-12 bg-white rounded-full bottom-4 right-20 text-2xl flex justify-center items-center hover:text-red-500 hover:cursor-pointer"><i className="fa-solid fa-heart"></i></div>
        </div>
    )
}

export default MusicBoxComponent