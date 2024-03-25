import React from 'react'
import { Link } from 'react-router-dom'
import {TextField} from '@mui/material';

function Login() {
  return (
    <div className='w-full h-screen bg-[#f7f7f8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      {/* navbar------------------------ */}
      <div className=' p-2 px-8 w-full h-16 flex items-center bg-[#f7f7f8b8] fixed top-0 z-10 font-semibold'>
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
          <form className="flex flex-col gap-4">
            <label htmlFor="mobile" className="text-md mb-[-10px] ">Mobile Number:</label>
            <TextField id="standard-basic" label="Mobile" name='mobile' variant="standard" />
            <label htmlFor="password" className="text-md mb-[-10px] ">Password:</label>
            <TextField id="standard-password-input"  label="Password" name="password" type="password" autoComplete="current-password" variant='standard'/>
            <button type="submit" className="bg-green-500 text-white  py-2 px-4 rounded-md hover:bg-green-600">Submit</button>
          </form>
        </div>

          {/* Big Image */}
        <div className='w-1/3 flex-col bg-green-600 p-4 rounded-lg '>
          <img src="../src/assets/hero.png" alt="Big Image" className="w-full rounded-lg" />
        </div>

      </div>

    </div>
  )
}

export default Login
