import React from 'react';
import { Link  , useNavigate} from 'react-router-dom';

const ProductCard = ({ machine }) => {
  const  navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  

  console.log(machine);
  
  return (
    <div onClick={() => navigate(`/product/${machine._id}`)} className="w-full h-[25rem] bg-slate-100 shadow-md hover:scale-105 duration-500">
      <div className="bg-slate-200 w-full h-[13rem]">
        <img className="w-full h-full object-cover object-top" src="https://images2.alphacoders.com/133/1338870.png" alt={machine.name} />
      </div>
      <div className="flex justify-between items-center px-5 mt-5">
        <p className="text-2xl font-bold">{machine.name}</p>
        <div className="bg-slate-200">
          <i className="ri-heart-line" style={{ fontSize: '27px' }}></i>
        </div>
      </div>
      <p className="text-xs px-5 mt-2 w-[90%]">
        {machine.description}
      </p>
      {/* <p>{machine._id}</p> */}
      <button className="bg-blue-200 mt-5 p-2 mr-2 float-end hover:bg-blue-400">
        Book Now
      </button>
    </div>
  );
}

export default ProductCard;
