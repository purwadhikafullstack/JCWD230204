import ProfilePict from './../assets/img/user.png'
import { useState } from 'react'
import axios from 'axios'

export default function Profile() {

    const [profile, setProfile] = useState([])

    const getProfile = async() => {
        try {
            const response = await axios.get('http://localhost:8000/users/profile', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            setProfile(response.data.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <>
        <div className="flex flex-col gap-5">
            <h1>Profile</h1>
            <div className="flex gap-6">
                <div className="flex flex-col gap-4 items-center justify-center p-4">
                    <img src={ProfilePict} alt="profile" className="w-[100px] h-[100px] rounded-full"/>
                    <div>username</div>
                </div>
                <div className='p-4'>
                    {
                        profile.map((value, index) => {
                            return(
                                <>
                                <div key={index}>name : {value.name}</div>
                                <div key={index}>gender: {value.gender}</div>
                                <div key={index}>birthdate: {value.birthdate}</div>
                                <div key={index}>email : </div>
                                <div key={index}>phone : </div>
                                <div key={index}>address : </div>
                                </>
                            )
                        })
                    }
                    <div>name</div>
                    <div>gender</div>
                    <div>birthdate</div>
                    <div>email</div>
                    <div>phone</div>
                    <div>address</div>
                </div>
            </div>
            <div>

            </div>
            
        </div>
        </>
    )
}