const GenreBox = (props) => {

    const {id, genre, imageUrl} = props

    return (
        <div className="w-full h-24 flex justify-start items-center p-2 gap-7 first:rounded-t hover:bg-pink-400 hover:cursor-pointer group transition-all duration-200" id={id}>
            <div className="h-20 aspect-square bg-black-200 rounded">
                <img src={imageUrl} alt="imageGenre" className="rounded" />
            </div>
            <p className="text-xl group-hover:text-black-200 text-white transition-all duration-200">{genre}</p>
        </div>
    )
}

export default GenreBox