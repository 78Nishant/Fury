import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'




function UserPage() {
    const location=useLocation();
    const navigate=useNavigate();
    const userdata=location.state.userdata.data;
    const logout=async()=>{
       localStorage.removeItem('auth-id');
       navigate('/');
       window.location.reload();
      }
  return (
    <div className='w-full  flex justify-center h-4/5 '>
    <div className='text-black my-20 rounded-md  h-full border w-4/5 '>
        <div className='w-full flex justify-center'>
        <img className='h-1/4' src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="user-male-circle"/>
        </div>
        <div className='mx-5'>
      <p className='text-3xl  w-1/2 text-left flex'>
       <p className='font-bold'>Username</p> : {userdata.name}
      </p>
      <p className='text-3xl  w-1/2 text-left mt-5 flex '>
      <p className='font-bold'>Phone number</p>  : +91 {userdata.phone}
      </p>
      <p className='text-3xl  w-1/2 text-left mt-5 flex'>
      <p className='font-bold'>Email-id</p> : {userdata.email}
      </p>
      </div>
      <div className='w-full justify-center flex mt-5'>
      <button onClick={logout} className='w-1/5 bg-blue-500 text-white h-10 text-2xl  rounded-md'>Log-Out</button>
    </div>
    </div>
    </div>
  )
}

export default UserPage
