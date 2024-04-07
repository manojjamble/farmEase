import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal'; // Corrected import statement
import TextField from '@mui/material/TextField';


const ProductCard = ({ machine }) => {
  // console.log(machine);


  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  //  onClick={() => navigate(`/product/${machine._id}`)} in outermost div
  // console.log(machine);
  const [modal, setModal] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleConfirmBooking = () => {
    // Perform booking action here
    console.log("Booking confirmed!");
    closeModal();
  };

  return (
    <div className="w-full h-[25rem] bg-slate-100 shadow-md hover:scale-105 duration-500">
      <div className="bg-slate-200 w-full h-[13rem]">
      {/* {machine.images.length > 0 && (
        <img
          src={`data:${machine.images[0].contentType};base64,${btoa(
            new Uint8Array(machine.images[0].data.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )}`}
          alt={machine.images[0].filename}
        />
      )} */}
        <img className="w-full h-full object-cover object-top" src={machine.img[0]} alt={machine.name} />
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
      <button className="bg-blue-200 mt-5 p-2 mr-2 float-end hover:bg-blue-400" onClick={openModal}>
        Book Now
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          content: {
            color: 'black',
            width: '30%',
            height: '40%',
            margin: 'auto',
            borderRadius: '10px',
            padding: '20px',
          },
        }}
      >
        <h2 className='text-2xl bold text-zinc-900 items-center justify-center'>Confirm Booking</h2><br></br>
        <p className='text-lg text-zinc-900 items-center justify-center'>Are you sure you want to book <b>{machine.name}</b>?</p><br></br>
        <p>Price: ${machine.rentalPrice}</p>
        {/* <Calendar
          onChange={date => setSelectedDate(date)}
          value={selectedDate}
        /> */}
        <div className='flex mt-1 gap-2'>
        <p className='mt-1'>Date:</p>
        <TextField
          id="standard-search"
          type="date"
          variant="standard"
          placeholder="Enter Date (DD)"
        />
        </div>
        <p>Availability: {(machine.availability)}</p>
        <br></br>
        <div className='flex justify-center gap-5'>
          <button onClick={handleConfirmBooking} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-2xl'>Confirm</button>
          <button onClick={closeModal} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl'>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default ProductCard;
