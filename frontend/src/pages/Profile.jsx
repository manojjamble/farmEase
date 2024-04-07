import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import {Button} from '@mui/material'


const Profile = () => {

    const [selectedView, setSelectedView] = useState('myTools');

    const user = {
        image: "../src/assets/avatar.jpg",
        username: "Username",
        tools: ["Tractor", "Harvestor", "Fertilizer", "Pesticide"],
    }


    const machine = {
        machines: [
            { id: 1, name: "Tractor", image: "https://imgs.search.brave.com/Gd7pNbjmF4XCgWvPzPiyZcn-50GJGztkTpI8vS0Zchg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/Njg2ODA4NzA0OTEt/NTkwY2Q0ZTIyNGFi/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRaOGZI/UnlZV04wYjNKOFpX/NThNSHg4TUh4OGZE/QT0.jpeg", bookingStatus: true },
            { id: 2, name: "Harvester", image: "https://imgs.search.brave.com/-Vqrf_HG3rAGmRsP7fb2tqrwdRiy2M1igj9uzQcvfGA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWM5LmRlcG9zaXRw/aG90b3MuY29tLzE0/MjYwNDkvMTE5My9p/LzQ1MC9kZXBvc2l0/cGhvdG9zXzExOTM1/ODEzLXN0b2NrLXBo/b3RvLWNvbWJpbmUt/aGFydmVzdGVyLmpw/Zw", bookingStatus: false },
            { id: 3, name: "Harvester", image: "https://imgs.search.brave.com/-Vqrf_HG3rAGmRsP7fb2tqrwdRiy2M1igj9uzQcvfGA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWM5LmRlcG9zaXRw/aG90b3MuY29tLzE0/MjYwNDkvMTE5My9p/LzQ1MC9kZXBvc2l0/cGhvdG9zXzExOTM1/ODEzLXN0b2NrLXBo/b3RvLWNvbWJpbmUt/aGFydmVzdGVyLmpw/Zw", bookingStatus: false },
            { id: 4, name: "Harvester", image: "https://imgs.search.brave.com/-Vqrf_HG3rAGmRsP7fb2tqrwdRiy2M1igj9uzQcvfGA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWM5LmRlcG9zaXRw/aG90b3MuY29tLzE0/MjYwNDkvMTE5My9p/LzQ1MC9kZXBvc2l0/cGhvdG9zXzExOTM1/ODEzLXN0b2NrLXBo/b3RvLWNvbWJpbmUt/aGFydmVzdGVyLmpw/Zw", bookingStatus: false },
            { id: 5, name: "Harvester", image: "https://imgs.search.brave.com/-Vqrf_HG3rAGmRsP7fb2tqrwdRiy2M1igj9uzQcvfGA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWM5LmRlcG9zaXRw/aG90b3MuY29tLzE0/MjYwNDkvMTE5My9p/LzQ1MC9kZXBvc2l0/cGhvdG9zXzExOTM1/ODEzLXN0b2NrLXBo/b3RvLWNvbWJpbmUt/aGFydmVzdGVyLmpw/Zw", bookingStatus: true },
            { id: 6, name: "Harvester", image: "https://imgs.search.brave.com/-Vqrf_HG3rAGmRsP7fb2tqrwdRiy2M1igj9uzQcvfGA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWM5LmRlcG9zaXRw/aG90b3MuY29tLzE0/MjYwNDkvMTE5My9p/LzQ1MC9kZXBvc2l0/cGhvdG9zXzExOTM1/ODEzLXN0b2NrLXBo/b3RvLWNvbWJpbmUt/aGFydmVzdGVyLmpw/Zw", bookingStatus: true },
            { id: 7, name: "Cultivator", image: "https://imgs.search.brave.com/s0CsyPum7GHJh-GdMDaohLQbzLizAGSit_Z7DdstmNk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/cmFjdG9yLWN1bHRp/dmF0aW5nLWZpZWxk/XzM0Mjc0NC01NjYu/anBnP3NpemU9NjI2/JmV4dD1qcGc", bookingStatus: true }
        ]
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            axios.get(`${BASE_URL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setUsername(response.data.user.name);
            }).catch((error) => {
                console.error("Error fetching user data:", error);
            });
        }
    }, []);

    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });
    const [editedTools, setEditedTools] = useState(user.tools.join(', ')); // Convert array to string

    const handleEditProfile = () => {
        setEditMode(!editMode);
    };

    const handleSaveProfile = () => {
        // Perform logic to save edited profile information
        // For example, send a request to update user data
        console.log("Edited User:", editedUser);

        // After saving, exit edit mode
        setEditMode(false);
    };


    return (
        <div className='w-full h-screen mt-[64px]'>
            <Navbar />

            <div className='flex  p-14'>

                {/* Profile Section --------------*/}
                {/* <div className=' w-1/5 h-screen  items-end   '>

                    <div className='flex flex-col mx-3 px-1 py-10 mt-7  items-center bg-[#f0f0f0]  rounded-xl shadow-md shadow-zinc-300'>
                        <img src={user.image} alt="" className='rounded-full w-52 object-cover ' />
                        <h1 className='text-xl mt-3'>{username}</h1>
                        <h1 className='text-xl mt-3'>Tools Own: {user.tools.length}</h1>
                        <h1 className='text-xl mt-3'>Ratings : 3.5 </h1>
                        <div className=' m-2 overflow-auto mt-8 flex flex-wrap gap-2'>
                            {user.tools.map((tool, index) => (
                                <h1 className='text-md bg-[#dfd9e2] p-2 rounded-xl' key={index}>{tool}</h1>
                            ))}
                        </div>

                        <button className="bg-[#2a7f62] hover:bg-[#3d9678] text-white font-bold py-2 px-4 mt-8 rounded">Edit Profile</button>

                    </div>
                </div> */}

                <div className='w-1/5 h-screen items-end'>
                    <div className='flex flex-col mx-3 px-1 py-10 mt-7 items-center bg-[#f0f0f0] rounded-xl shadow-md shadow-zinc-300'>
                        <img src={user.avatar} alt="" className='rounded-full w-52 object-cover' />
                        {editMode ? (
                            <TextField
                                value={editedUser.name}
                                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                label="Name"
                                variant='standard'
                                className="mt-3"
                            />
                        ) : (
                            <h1 className='text-xl mt-3'>{user.name}</h1>
                        )}
                        <div className='m-2 overflow-auto mt-8 flex flex-wrap gap-2'>
                            {editMode ? (
                                <TextField
                                    value={editedTools}
                                    onChange={(e) => setEditedTools(e.target.value)}
                                    label="Tools"
                                    variant='standard'
                                    className="text-md bg-[#dfd9e2] p-2 rounded-xl"
                                />
                            ) : (
                                user.tools.map((tool, index) => (
                                    <h1 className='text-md bg-[#dfd9e2] p-2 rounded-xl' key={index}>{tool}</h1>
                                ))
                            )}
                        </div>
                        <div className='mt-3'>
                            {editMode ? (
                                <TextField
                                    value={editedUser.mobile}
                                    onChange={(e) => setEditedUser({ ...editedUser, mobile: e.target.value })}
                                    label="Mobile"
                                    variant='standard'
                                    className="text-xl"
                                />
                            ) : (
                                <p className='text-xl '>{user.mobile}</p>
                            )}
                        </div>

                        {editMode ? (
                            <Button
                                variant="contained"
                                color="success"
                                className="mt-8"    
                                onClick={handleSaveProfile}
                            >
                                Save Profile
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                className="mt-8"
                                onClick={handleEditProfile}
                            >
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </div>



                {/* Tools Section --------------------------*/}
                <div className='w-4/5 h-screen bg-white rounded-3xl mt-[-104px] p-3'>
                    {/* Toolbar section */}
                    <div className="flex mt-4 p-8 border-b border-zinc-600 pb-2 ">
                        <button className={`text-[#2a7f62]  border-r border-zinc-600 font-bold py-2 px-4   ${selectedView === 'myTools' ? 'text-[#193a2f]' : ''}`} onClick={() => setSelectedView('myTools')}>My Tools</button>
                        <button className={`text-[#2a7f62] font-bold py-2 px-4   ${selectedView === 'onRentTools' ? 'text-[#193a2f]' : ''}`} onClick={() => setSelectedView('onRentTools')}>On Rent Tools</button>
                    </div>
                    <div className=' flex flex-wrap gap-4 mt-8 '>
                        {selectedView === 'myTools' ? machine.machines.map(machine => (
                            <div key={machine.id} className="bg-zinc-100 p-4 rounded-2xl shadow-md">
                                <img src={machine.image} alt={machine.name} className="w-56 h-26 rounded-full mx-auto" />
                                <h2 className="text-lg font-bold text-[#41676a] text-center mt-2">{machine.name}</h2>
                            </div>
                        )) : machine.machines.filter(machine => machine.bookingStatus).map(machine => (
                            <div key={machine.id} className="bg-zinc-100 p-4 rounded-2xl shadow-md">
                                <img src={machine.image} alt={machine.name} className="w-56 h-26 rounded-full mx-auto" />
                                <h2 className="text-lg font-bold text-[#41676a] text-center mt-2">{machine.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            {/* Footer------------------ */}
            <Footer />

        </div>
    );


}

export default Profile
