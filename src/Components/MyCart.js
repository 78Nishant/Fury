import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function MyCart() {
    const navigate=useNavigate();
    const [product,setProduct]=useState([])
    const getProduct=async()=>{
        const products=await axios.get('https://ecommercebackend-avcz.onrender.com/mycart')
        setProduct(products.data)
    }
    useEffect(()=>{
        getProduct();
       
    })
    const arr=product;
    var price=0;
    const remove=async(params)=>{
      const item=params
      const product=await axios.delete(`https://ecommercebackend-avcz.onrender.com/mycart/${item}`)
    }
    const removeAll=async()=>{
      const product=await axios.delete('https://ecommercebackend-avcz.onrender.com/mycart/all')
    }
    const buy=(params)=>{
      const product=params
     
      navigate('/buyPage' ,{state : {productInfo : {product}}})
    }
  return (
    <div className='h-full w-screen my-20'>
      <div className='text-5xl my-2  mx-20'>My Cart</div>
      {/* <button onClick={removeAll} className='h-10 w-20 bg-blue-600 rounded-md mx-20 my-3 text-white '>Clear cart</button> */}
      {arr.map((item)=>{
        price+=Math.floor(item.price*83);
        return(
            <div className='h-1/4 flex w-1/2 bg-gradient-to-r from-red-500  to-blue-600 text-white mx-20 my-5 rounded-md drop-shadow-2xl z-1'>
                <div className='flex justify-end my-2'>
                    <img className='h-44' src={item.thumbnail} />
                </div>
                <div className='mx-10'>
                <div className='font-bold mx-2 my-2 text-2xl'>{item.title}</div>
                <div className='mx-2 text-yellow-400'>{item.rating} / 5</div>
                <div className='font-bold mx-2 mt-3'>₹{Math.floor(item.price*83).toLocaleString('en-IN')}</div>
                <div className='bg-yellow-600 text-white w-20 text-center my-2 mx-2 '>-{item.discountPercentage}%</div>
                <button onClick={()=>buy(item)} className='bg-white text-blue-600 w-24 rounded-md drop-shadow-2xl my-4'>
                  Buy now
                </button>
                <button onClick={()=>remove(item.title)} className='bg-white text-red-600 w-40 mx-3 rounded-md'>
                  Remove from cart
                </button>

                </div>
                
            </div>
        )
      })}
      <div className='bg-gradient-to-r from-blue-600 via-red-800 to-red-900 w-3/4 h-20 mx-20 text-white font-bold rounded-md'>
      <div className='text-2xl mx-10'>Check out {arr.length} Products</div>
      <div className='text-3xl mx-10'>Total ₹{price.toLocaleString('en-IN')}</div>
      </div>
   
    
    </div>
  )
}

export default MyCart
