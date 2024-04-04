import React from 'react'

const ProductCard = () => {
  return (
    <div className=' w-full h-[25rem] bg-slate-100 shadow-md hover:scale-105 duration-500'>
        <div className=' bg-slate-200 w-full h-[13rem]'>
            <img className='w-full h-full object-cover object-top' src="https://images2.alphacoders.com/133/1338870.png" />
        </div>
        <div className='flex justify-between items-center px-5 mt-5'>
            <p className='text-2xl font-bold'>Tracter</p>
            <div className=' bg-slate-200'>
            <i className="ri-heart-line" style={{fontSize: '27px'}}></i>
            </div>
        </div>
        <p className=' text-xs px-5 mt-2 w-[90%]'>
          Lorem ipsum dolor, sit amet coatui quidem molestiae similique! Provident.
        </p>
        <button className='bg-blue-200 mt-5 p-2 mr-2 float-end hover:bg-blue-400'>
            Book Now
        </button>
    </div>
  )
}

export default ProductCard;