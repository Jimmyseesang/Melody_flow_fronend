import { useContext } from "react"
import { ProfileContext } from "../contexts/ProfileContext"

const ArtistCartComponent = (props) => {

    const {apiHost, apiPort} = useContext(ProfileContext)

  return (
    <div className='h-[320px] w-[250px] bg-black-200 rounded-lg'>
        <div className='' style={{'backgroundImage': `url(http:${apiHost}:${apiPort})`}}></div>
    </div>
  )
}

export default ArtistCartComponent
