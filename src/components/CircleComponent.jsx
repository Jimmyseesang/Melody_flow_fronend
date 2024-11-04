const CircleComponent = () => { 

    const color = Math.random() > 0.5 ? 'bg-black-200' : 'bg-white';
    const height = Math.floor(Math.random() * 300);
    const startTop = Math.floor(Math.random() * 1280);
    const startRight = Math.floor(Math.random() * 1980);
    const duration = Math.floor(Math.random() * (20000 - 10000 + 1)) + 60000

    const animationStyle = {
        height: `${height}px`,
        top: `${startTop}px`,
        right: `${startRight}px`,
        animation: `bubbleMove ${duration}ms ease-in-out infinite alternate`,
    };

    return (
        <div 
            className={`aspect-square ${color} rounded-full absolute`} 
            style={animationStyle}
        ></div>
    );
};

export default CircleComponent;
