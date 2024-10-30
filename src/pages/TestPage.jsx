const TestPage = () => {

    return (
        <section className="p-8">
            <div className="relative max-w-[48rem] my-0 mx-auto">
                <div className="flex aspect-video snap-x" style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
                    <img className="snap-start flex-2 object-cover" src="/images/test-wallpaper.jpg" />
                    <img className="snap-start flex-2 object-cover" src="/images/test-wallpaper2.jpg" />
                    <img className="snap-start flex-2 object-cover" src="/images/test-wallpaper3.jpg" />
                    {/* <div id="image-1"><img src="/images/test-wallpaper.jpg" /></div>
                    <div id="image-2"><img src="/images/test-wallpaper2.jpg" /></div>
                    <div id="image-3"><img src="/images/test-wallpaper3.jpg" /></div> */}
                </div>
                <div>
                    <a href="#image-1"></a>
                    <a href="#image-2"></a>
                    <a href="#image-3"></a>
                </div>
            </div>
        </section>
    )

}

export default TestPage