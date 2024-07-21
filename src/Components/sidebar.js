import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { useState } from 'react';


function Sidebar() {
  return (
    <div className='h-full flex  w-full  text-black text-1xl'>
        <div className='w-4/5 bg-white '>
        <a href='/' className='mx-2 mt-24 w-full flex justify-start'>
        <img  className='mx-2 ' width="40" height="40" src="https://img.icons8.com/ios-filled/50/000000/home-page.png" alt="home-page"/>
       <div className='my-2 '> Home </div>
        </a>
        <a href='/mycart' className='my-4 mx-2 w-full flex justify-start'>
        <img className='mx-1' width="40" height="40" src="https://img.icons8.com/ios-filled/000000/shopping-cart.png" alt="shopping-cart"/>
       <div className='my-2'> My Cart</div>
        </a>
        <a href='loginpage' className='my-4 mx-2 w-full flex justify-start '>
        <img className='mx-2' width="40" height="40" src="https://img.icons8.com/ios-filled/000000/login-rounded-right.png" alt="login-rounded-right"/>
         <div className='my-2'>Login / SignUp</div> 
          </a>
        <a href='contactPage' className='my-4 mx-2 w-full flex justify-start '>
        <img className='mx-2' width="40" height="40" src="https://img.icons8.com/ios-filled/000000/phone-message.png" alt="phone-message"/>
         <div className='my-2'> Contact Us</div>
          </a> 
          
          {localStorage.getItem('auth-id')!=null ? 
          <button onClick={()=>{localStorage.removeItem('auth-id')}} className='w-full flex justify-start mx-16 font-bold' >
            <a href='/'>Logout</a>
          </button> 
          : <></>
        }
      </div>
      <button className='text-5xl w-1/5 flex justify-center '> X </button>
    </div>
  )
}

export default Sidebar
