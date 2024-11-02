const CircleComponent = () => {

    // const {color, height, top, right} = props
    const color = Math.random() > .5 ? 'bg-black-200' : 'bg-white'
    const height = Math.floor(Math.random() * 400)
    const top = Math.floor(Math.random() * 1280)
    const right = Math.floor(Math.random() * 1980)

    return (
        <div className={`aspect-square ${color} rounded-full absolute`} 
            style={
                {
                    height: `${height}px`,
                    top: `${top}px`,
                    right: `${right}px`,
                }
            }>
        </div>
    )
}

export default CircleComponent