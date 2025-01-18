import axios from "axios"
import { useContext, useState } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"

const ArtistFormComponent = (props) => {

    const {alert, alertFail, getArtist} = props

    const {apiHost, apiPort, token} = useContext(ProfileContext)

    const [name, setName] = useState('')
    const [image, setImage] = useState()

    // alert
    const [nameAlert, setNameAlert] = useState(false)
    const [imageAlert, setImageAlert] = useState(false)

    const addArtist = async (dataForm) => {
        try {
            await axios.post(`https://melody-flow.online/admin/addArtist`, dataForm, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            alert('Add artist successfully')
            await getArtist()
        }catch(err) {
            console.log(err)
            if(err.status === 409) {
                return alertFail('This artist already exists')
            }
            alertFail('Fail adding artist, Try again later')
        }finally {
            setName('')   
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!name) {
            setNameAlert(true)
        }
        if(!image) {
            setImageAlert(true)
        }

        if(name && image) {
            const form = new FormData()
            form.append('name', name)
            form.append('image', image)
            await addArtist(form)
        }

    }

    return (
        <section className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-pink-600 text-xl sm:text-4xl font-bold">Add Artist</h1>
                <form className="flex flex-col items-center gap-y-4 sm:w-full w-4/6" onSubmit={handleSubmit}>
                    <div className="flex flex-col mt-4 w-full">
                        <label htmlFor="artist-name" className="text-lg text-white font-bold">Artist Name</label>
                        <input type="text" id="artist-name" placeholder="name..." className="p-2 rounded outline-pink-600" onChange={(e) => {setName(e.target.value)}} onClick={() => {setNameAlert(false)}} value={name}/>
                        <p className={`text-red-600 ${nameAlert ? 'block' : 'hidden'}`}>Please enter this field</p>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="artist-image" className="text-white text-lg font-bold">Artist Image</label>
                        <input type="file" className="bg-white p-2 rounded text-pink-600" onChange={(e) => {setImage(e.target.files[0])}} onFocus={() => {setImageAlert(false)}}/>
                        <p className={`text-red-600 ${imageAlert ? 'block' : 'hidden'}`}>Please enter this field</p>
                    </div>
                    <button className="bg-pink-600 text-xl font-bold text-white p-3 w-1/2 rounded">Add artist</button>
                </form>
            </div>
        </section>
    )
}

export default ArtistFormComponent