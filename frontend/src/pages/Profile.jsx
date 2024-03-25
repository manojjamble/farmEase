import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


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

    return (
        <div className='w-full h-screen mt-[64px]'>
            <Navbar />
            <div className='flex '>


                {/* Profile Section --------------*/}
                <div className='w-1/5 h-screen justify-center items-center '>

                    <div className='flex flex-col mx-3 px-1 py-10 mt-7 items-center bg-[#f0f0f0]  rounded-3xl shadow-lg shadow-zinc-600'>
                        <img src={user.image} alt="" className='rounded-full w-52 object-cover ' />
                        <h1 className='text-xl mt-3'>{user.username}</h1>
                        {/* Wrap the tools in a container with fixed height and overflow auto */}
                        <div className=' m-2 overflow-auto mt-8 flex flex-wrap gap-2'>
                            {user.tools.map((tool, index) => (
                                <h1 className='text-md bg-[#dfd9e2] p-2 rounded-xl' key={index}>{tool}</h1>
                            ))}
                        </div>

                        <button className="bg-[#2a7f62] hover:bg-[#3d9678] text-white font-bold py-2 px-4 mt-8 rounded">Edit Profile</button>

                    </div>
                </div>


                {/* Tools Section --------------------------*/}
                <div className='w-4/5 h-screen bg-white rounded-3xl mt-5 p-3'>
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
                <Footer/>

        </div>
    );


}

export default Profile
