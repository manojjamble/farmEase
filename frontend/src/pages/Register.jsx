import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    age: '',
    role: 'farmer',
    avatar: 'https://res.cloudinary.com/djnv06fje/image/upload/v1617322354/avatars/avatar-1_ukzj6v.png',

  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:3000/api/user', formData);
      console.log(response.data); // Log response for debugging
      // Here you can handle the successful registration, such as redirecting the user
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Here you can handle registration errors, such as displaying an error message to the user
    }
  };

  return (
    <div className='w-full h-screen bg-[#f7f7f8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      {/* navbar------------------------ */}
      <div className='p-2 px-8 w-full h-16 flex items-center bg-[#f7f7f8b8] fixed top-0 z-10 font-semibold'>
        <div className='flex align-center items-center justify-start gap-2 w-1/3'>
          <Link to="/products">
            <img src="../src/assets/Logo2.png" alt="" className='rounded-full' width={"50px"} />
          </Link>
          <h2 className='text-2xl text-zinc-800 font-bold'>AgroRent</h2>
        </div>
      </div>

      {/* form------------------- */}
      <div className='flex justify-around mt-[64px] p-10 '>
        <div className='w-1/4 flex-col bg-blue-200 p-4 rounded-lg'>
          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-md mb-[-10px] ">Name:</label>
            <TextField id="name" name='name' label="Name" variant="standard" value={formData.name} onChange={handleChange} />
            <label htmlFor="mobile" className="text-md mb-[-10px] ">Mobile Number:</label>
            <TextField id="mobile" name='mobile' label="Mobile" variant="standard" value={formData.mobile} onChange={handleChange} />
            <label htmlFor="password" className="text-md mb-[-10px] ">Password:</label>
            <TextField id="password" name="password" label="Password" type="password" autoComplete="current-password" variant='standard' value={formData.password} onChange={handleChange} />
            <label htmlFor="age" className="text-md mb-[-10px] ">Age:</label>
            <TextField id="age" name='age' label="Age" variant="standard" value={formData.age} onChange={handleChange} />
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Register</button>
          </form>
        </div>

        {/* Big Image */}
        <div className='w-1/3 flex-col bg-green-600 p-4 rounded-lg '>
          <img src="../src/assets/hero.png" alt="Big Image" className="w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default Register;