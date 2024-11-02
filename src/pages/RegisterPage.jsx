import CircleComponent from "../components/CircleComponent"

const RegisterPage = () => {

    const bubble = (index) => {
        const component = []
        for (let i = 0; i <= index; i++) {
            component.push(<CircleComponent key={i} />)
        }

        return component
    }

    return (
        <div className="h-screen w-full bg-gradient-to-tr from-pink-500 to-black-100 truncate relative">
            {/* background */}
            <div className="absolute h-full w-full background-black-200 blur-xl">
                {bubble(20)}
            </div>
            {/* Register section */}
            <div className="w-[1000px] h-[700px] bg-black-200/50 z-10 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded backdrop-blur-3xl"></div>
        </div>
    )
}

export default RegisterPage