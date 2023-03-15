import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProfileForm from './editProfile';
import { Link, Navigate, useNavigate} from 'react-router-dom';

export default function Profiling (){

    const navigate = useNavigate();

    const [dataProfile, setDataProfile] = useState([])

    const getProfile = async () => {
      const response = await axios.get('http://localhost:8000/users/profile')
      console.log(response.data.data)
    }

    useEffect(() => {
        // getProfile();
    })

    const handleButtonClick = () => {
        // Navigate to PageB
        navigate('/editProfile');
    };

    return(
      <>
      <div className='flex gap-5 justify-center p-10 bg-stone-800 '>
        <div className='border rounded-lg p-7 h-[300px] w-[400px] '>
          <div>
            img
          </div>
          <h1>username</h1>
        </div>
        <div className='border rounded-lg w-[700px] h-[600px] p-7'>
          <p>name : </p>
          <p>birthdate : </p>
          <p>gender : </p>
          <p>address : </p>
        </div>
      </div>
      </>
    )
}
        


