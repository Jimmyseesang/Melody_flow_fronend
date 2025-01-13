import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProfileContext } from "../../contexts/ProfileContext"

const ArtistListComponent = (props) => {

    const { alert, alertFail, artists, getArtist } = props

    const navigate = useNavigate()

    const { apiHost, apiPort, token } = useContext(ProfileContext)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const handleEdit = (artist) => {
        navigate(`editArtist/${artist._id}`)
    }

    const handleDelete = async (artist) => {
        const id = artist._id
        const response = await axios.delete(`http://${apiHost}:${apiPort}/admin/deleteArtist/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response.data)
        if (response.status === 200) {
            alert('Delete artist success')
            await getArtist()
        } else {
            alertFail('Fail delete artist')
        }

    }

    useEffect(() => {

        const handleResize = () => setWindowWidth(window.innerWidth)

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)

    }, [])

    return (
        <section className="h-screen w-full flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center flex-col gap-y-8">
                <h1 className="text-pink-600 sm:text-4xl text-xl font-bold">Manage Artist</h1>
                <div className="truncate w-[70%] max-h-[526px] min-w-[250px]" style={{overflow: 'auto', scrollbarWidth:'none'}}>
                    <table className="w-full">
                        <thead className="bg-pink-600 sm:text-xl sticky text-base top-0">
                            <tr>
                                <th className="p-4">Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm bg-white">
                            {artists && artists.map(e => {
                                return (
                                    <tr>
                                        <td className="text-center border">{e.name}</td>
                                        <td className="text-center p-4 border w-[15%]">
                                            <button className="sm:px-8 px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-800" onClick={() => { handleEdit(e) }}>{windowWidth < 640 ? <i className="fa-solid fa-pen-to-square"></i> : 'edit'}</button>
                                        </td>
                                        <td className="text-center p-4 border w-[15%]">
                                            <button className="sm:px-8 px-4 py-2 bg-red-600 rounded text-white hover:bg-red-800" onClick={() => { handleDelete(e) }}>{windowWidth < 640 ? <i className="fa-solid fa-trash"></i> : 'delete'}</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default ArtistListComponent