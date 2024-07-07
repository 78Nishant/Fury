import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

function LoginPage() {
  const navigate=useNavigate()
    const [formData,setFormData]=useState({});
    const change=(e)=>{
        const {name,value}=e.target;
        setFormData(formData=>({...formData,[name]:value}))
    }
    const [vis,setVis]=useState('password');
    const [message,setMessage]=useState('')
    const submit=(e)=>{
        e.preventDefault();
        console.log(formData)
        addLog(formData)
        setFormData({});

    }
    const addLog=async (formData)=>{
      const data=await axios.post('https://ecommercebackend-avcz.onrender.com/log',formData)
      console.log("submitted");
      Swal.fire(data.data.message);
      if(data.data.message==='Welcome Back!'){
        navigate('/')
      }
    }
    const visibilty=()=>{
        if(vis=='password' ? setVis('text') : setVis('password'));
    }
  return (
    <div className='h-full my-14 bg-gradient-to-br from-red-600 via-blue-900 to-black w-full  flex  justify-center items-center drop-shadow-2xl '>
     
        {/* upper options */}
        <div className='text-white '>
         <p className='text-3xl mb-5 font-bold'> Login</p>
          <div>{message}</div>
          {/* Login details section */}
        
            
            <input onChange={change} name='email' value={formData.email || ""} className='w-3/5 h-10 rounded-md  my-2 text-black' type="text" placeholder='Enter your Email-address' />

            <input type={vis} onChange={change} name='password'  value={formData.password || ""} className='w-3/5 h-10 rounded-md  my-16 text-black'  placeholder='Enter your Password' />
            <button onClick={visibilty} className=' w-auto h-auto my-10'>
            <img  className='h-10 w-10 ' src="https://img.icons8.com/ios-glyphs/ffffff/visible--v1.png" alt="visible--v1"/>
            </button>
          <button onClick={submit} className='mx-52 w-40 bg-blue-600 text-white  h-10 rounded-md my-10' >Submit</button>
        </div>

  </div>
  )
}

export default LoginPage
