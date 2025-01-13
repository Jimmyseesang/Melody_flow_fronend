const PageNotFound = () => {
    return (
        <div className="w-full h-screen bg-gradient-to-t from-black-200 via-pink-600 to-pink-200 flex justify-center items-center bg-bottom bg-no-repeat bg-cover mix-blend-lighten" style={{backgroundImage: 'url(/images/layered-waves-haikei.svg)'}}>
            <div className="w-1/2 h-[700px] bg-black-200/50 backdrop-blur-3xl rounded-lg text-white flex flex-col items-center justify-start gap-4 p-16">
                <h1 className="text-9xl font-bold">404</h1>
                <p className="text-xl">Page Not Found</p>
                <p className="text-base">It's like you're lost.</p>
                <div className="grow flex items-center">
                    <a href="/" className="hover:cursor-pointer transition-all durationa-200 w-48 h-20 rounded-full relative before:content-['Home'] hover:before:text-xl before:bg-pink-600 before:h-20 before:w-20 before:rounded-full before:flex before:justify-center before:items-center hover:before:w-full before:transition-all duration-200 hover:before:border before:absolute before:top-0 before:right-1/2 before:translate-x-1/2"></a>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound