import { useState } from 'react'
import axios from 'axios'

export default function UploadPayment() {
    const [file, setFile] = useState(null)

    const handleFile = (event) => {
        setFile(event.target.files[0])
    }

    const handleUpload = async() => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`http://localhost:8000/transaction/uploadPayment`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': localStorage.getItem('token')
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        

    }

    return(
        <>
        <div>
            <input type='file' onChange={handleFile} />
            <button onClick={handleUpload}>Upload PaymentProof</button>
        </div>
        </>
    )
}