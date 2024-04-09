import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
function Login() {

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    mobile: '',
    password: ''
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
      const response = await axios.post(`${BASE_URL}/api/user/login`, formData);
      console.log(response.data); // Log response for debugging
      const { message, user, token } = response.data;
      // Here you can handle the successful login, such as redirecting the user
      localStorage.setItem('token', token);
      console.log('message',message, 'user',user, 'token',token);
      navigate('/products');
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Here you can handle login errors, such as displaying an error message to the user
    }
  };

  return (
    <div className='w-full h-screen bg-[#f7f7f8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      {/* navbar------------------------ */}
      {/* <div className='p-2 px-8 w-full h-16 flex items-center bg-[#f7f7f8b8] fixed top-0 z-10 font-semibold'>
        <div className='flex align-center items-center justify-start gap-2 w-1/3'>
          <Link to="/products">
            <img src="../src/assets/Logo2.png" alt="" className='rounded-full' width={"50px"} />
          </Link>
          <h2 className='text-2xl text-zinc-800 font-bold'>AgroRent</h2>
        </div>
      </div> */}
      <Navbar/>

      {/* form------------------- */}
      <div className='flex justify-around mt-[64px] p-10 '>
        <div className='w-1/4 flex-col p-4 pt-40 rounded-lg'>
          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="mobile" className="text-md mb-[-10px] ">Mobile Number:</label>
            <TextField id="mobile" name='mobile' label="Mobile" variant="standard" value={formData.mobile} onChange={handleChange} />
            <label htmlFor="password" className="text-md mb-[-10px] ">Password:</label>
            <TextField id="password" name="password" label="Password" type="password" autoComplete="current-password" variant='standard' value={formData.password} onChange={handleChange} />
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Submit</button>
          </form>
        </div>

        {/* Big Image */}
        <div className='w-1/3 flex-col p-4 rounded-lg '>
          <img src="../src/assets/hero.png" alt="Big Image" className="w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default Login;
