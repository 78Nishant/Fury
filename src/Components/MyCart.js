import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

function MyCart() {
    const navigate=useNavigate();
    const [product,setProduct]=useState([])
    const [email,setEmail]=useState('');
    const getProduct=async()=>{
      const id=localStorage.getItem('auth-id');
    const idInfo={
      "authID":id
    }
        const products=await axios.post('https://furybackend.onrender.com/activeUser',idInfo)
        if(products.data==null){
          navigate('/loginpage')
          Swal.fire('You need to login first')
        }
        else{
        setProduct(products.data.CartDetails)
        setEmail(products.data.email)
        }   
    }
    useEffect(()=>{
        getProduct();
    })
    const arr=product;
    var price=0;
    const remove=async(params)=>{
      const data={
        "item_name":params,
        "user_email":email
      };
      console.log(data);
      await axios.post(`https://furybackend.onrender.com/mycart/delete`,data)
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
            <div className='h-1/4 flex w-1/2 bg-white border-3 text-black mx-20 my-5 rounded-md drop-shadow-2xl z-1'>
                <div className='flex justify-end my-2'>
                    <img className='h-44' src={item.thumbnail} alt="Unable to load"/>
                </div>
                <div className='mx-10'>
                <div className='font-bold mx-2 my-2 text-2xl'>{item.title}</div>
                <div className='mx-2 text-yellow-600'>{item.rating} / 5</div>
                <div className='font-bold mx-2 mt-3'>₹{Math.floor(item.price*83).toLocaleString('en-IN')}</div>
                <div className='bg-yellow-600 text-white w-20 text-center my-2 mx-2 '>-{item.discountPercentage}%</div>
                <button onClick={()=>buy(item)} className='bg-blue-600 text-white w-24 rounded-md drop-shadow-2xl my-4'>
                  Buy now
                </button>
                <button onClick={()=>remove(item.title)} className='bg-red-600 text-white w-40 mx-3 rounded-md'>
                  Remove from cart
                </button>

                </div>
                
            </div>
        )
      })}
      <div className='bg-white  w-3/4 h-20 mx-20 text-black border drop-shadow-2xl mb-5 font-bold rounded-md flex items-center justify-center'>
      <div>
      <p className='text-2xl mx-10'>Check out {arr.length} Products</p>
      <p className='text-3xl mx-10'>Total ₹{price.toLocaleString('en-IN')}</p>
      </div>
      {/* <div className='  text-white  '>
        <button  className='flex-1 bg-blue-600 w-32 flex justify-center'>Check out</button>
      </div> */}
      </div>
   
    
    </div>
  )
}

export default MyCart
