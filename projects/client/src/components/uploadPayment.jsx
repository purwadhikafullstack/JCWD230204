import { useState } from 'react'
import axios from 'axios'

export default function UploadPayment() {
    const [file, setFile] = useState(null)

    const token = localStorage.getItem('token')

    const handleFile = (event) => {
        setFile(event.target.files[0])
    }

    const handleUpload = async() => {
        try {
            const formData = new FormData()
            formData.append('images', file)
            const response = await axios.post(`http://localhost:8000/transaction/uploadPayment`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: token
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        

    }

    return(
        <>
        <div className='flex flex-col gap-4 justify-center'>
            <input type='file' onChange={handleFile} />
            <button onClick={handleUpload}>Upload Payment Proof</button>
        </div>
        </>
    )
}