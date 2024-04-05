import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const handleLogout = async () => {
        try {
            const navigate = useNavigate();
            
            // Clear the token from local storage
            localStorage.removeItem('token');
            
            // Navigate to the login page
            navigate('/login');
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <nav className='navbar p-2 px-8 w-full h-16 flex items-center bg-[#f7f7f8b8] fixed top-0 z-10 font-semibold'>
            <div className='flex align-center items-center justify-start gap-2 w-1/3'>
                <Link to="/products">
                    <img src="../src/assets/Logo2.png" alt="" className='rounded-full' width={"50px"} />
                </Link>
                <h2 className='text-2xl text-zinc-800 font-bold'>AgroRent</h2>
            </div>
            <div className='flex items-end justify-center gap-4 w-1/3'>
                <h1 className='hover:bg-[#b2d8b4] p-1 rounded-md'><Link to="/products">Products</Link></h1>
                <h1 className='hover:bg-[#b2d8b4] p-1 rounded-md'><Link to="/add_tools">Add Tools</Link></h1>
                <h1 className='hover:bg-[#b2d8b4] p-1 rounded-md'><Link to="/about">About us</Link></h1>
                <h1 className='hover:bg-[#b2d8b4] p-1 rounded-md'><Link to="/contact">Contact us</Link></h1>
            </div>
            <div className='flex items-center justify-end w-1/3 gap-8'>
                <div className='flex align-center items-center justify-start gap-2'>
                    <img src="../src/assets/avatar.jpg" alt="" className='rounded-full w-10 object-cover' />
                    <h1 className='text-xl text-zinc-800 '>Username</h1>
                </div>
                <button onClick={handleLogout} className="bg-[#b2d8b4] hover:bg-[#9fd39b] text-black font-bold py-2 px-4 rounded">
                    <i className="ri-logout-box-r-line"></i> Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
