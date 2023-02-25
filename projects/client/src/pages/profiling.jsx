import React, { useState } from 'react';
import axios from 'axios';
import EditProfileForm from './editProfile';
import { Link, Navigate, useNavigate} from 'react-router-dom';

export default function Profiling (){

    const navigate = useNavigate();
    const handleButtonClick = () => {
        // Navigate to PageB
        navigate('/editProfile');
    };
    
    const [name, setName] = useState('Name');
    const [picture, setPicture] = useState('https://via.placeholder.com/150');
    const [birthdate, setBirthdate] = useState('Birthdate');
    const [gender, setGender] = useState('Gender');
    const [address, setAddress] = useState('Alamat');
    const [email, setEmail] = useState('Email');

    return(
            <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-100 p-8">
              <img src={picture} alt={name} className="rounded-full w-48 h-48 object-cover mr-8" />
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-4xl font-bold text-gray-800">{name}</h1>
                <p className="text-lg text-gray-700 my-4">{birthdate}</p>
                <p className="text-lg text-gray-700 my-4">{gender}</p>
                <p className="text-lg text-gray-700 my-4">{email}</p>
                <button className="p-3 border rounded-lg bg-green-300 w-[150px]"onClick={handleButtonClick}> Edit Profile </button>
                <div className="flex justify-center md:justify-start">
                </div>
              </div>
              
            </div>
    );
}
        


