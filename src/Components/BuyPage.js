import React from 'react'
import { useLocation } from 'react-router-dom'

function BuyPage() {
    const location=useLocation();
    const product=location.state.productInfo.product;
    console.log(product)
  return (
    <div className='my-20  mx-40 h-full w-full '>
      <div className='h-2/5 w-4/5 bg-gradient-to-r from-blue-600 to-red-700  rounded-3xl text-white flex'>
        <img src={product.thumbnail} className='mx-2 w-1/3' />
        <div className='mx-10 text-3xl'>
            <div className='w-full my-2 flex justify-start text-5xl'>{product.title}</div>
            <div className='w-full flex justify-start my-2 text-yellow-500 font-light'>{product.rating} / 5</div>
            <div className='w-full flex justify-start my-3 text-4xl font-bold'>₹{Math.round(product.price*83).toLocaleString('en-IN')}</div>
            <div className='w-24 flex justify-start bg-yellow-600 text-center rounded-md'>-{product.discountPercentage}</div>
            <i className='w-full flex justify-center mx-10 my-5'>Fastest Delivery in 2 Hours</i>
        </div>
      </div>

      <div className='my-10 mx-10'>
       <div className='text-3xl'> Delivery address</div>
       <div className='my-3'>
        Enter Pincode:
        <input className='w-32 rounded-md text-center h-7 mx-2  bg-gray-300' placeholder='Pincode'/>
        </div>
      </div>
    </div>
  )
}

export default BuyPage
