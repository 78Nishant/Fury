import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar'
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [userName,setUserName]=useState('Log in /Sign Up')
  const getUserInfo=async()=>{
    const id=localStorage.getItem('auth-id');
    const idInfo={
      "authID":id
    }
    const info=await axios.post('https://furybackend.onrender.com/activeUser',idInfo);
    if(info.data!=null) {
    setUserName(info.data.name )
    }
  }
  getUserInfo();
  const login = () => {
    navigate("/loginpage");
  };
  const myCart=()=>{
    navigate('/loading');
    setTimeout(()=>{
    navigate('/mycart');
},3000)
  }

  const deliverable_address = [
    "Pune",
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Kolkata",
    "Patna",
    "Chennai",
    "Chandigarh",
    "Lucknow",
  ];
  const [value,setValue]=useState('');
  const search = () => {
    const val=(value.toLowerCase())
    navigate('/loading');
    setTimeout(()=>{
    navigate('/search',{ state : {search : val }})
  },5000)
  };

  const [sideView,setSideView]=useState('text-white  h-screen w-0 z-1 invisible absolute')
  const [backView,setBackView]=useState('flex w-full bg-white')
  const sidebar=()=>{
    if(sideView==='text-white  h-screen w-0 z-1 invisible absolute' ? setSideView('text-white  h-screen w-1/4 z-1') : setSideView('text-white  h-screen w-0 z-1 invisible absolute'));
    if(sideView==='text-white  h-screen w-0 z-1 invisible absolute' ? setBackView('blur flex w-0 bg-white ') : setBackView('flex w-full bg-white'));
  }
  const change=(e)=>{
    setValue((e.target.value))
  }

  return (
     
    <div className="absolute inset-0 h-14 flex  w-full border-b rounded-3xl ">
      <div className={sideView}>
        <Sidebar />
      </div>
    
    <div className={backView}>
      <button onClick={sidebar} className="text-3xl font-bold  mx-2 bg-white">≡</button>
      <a href="/" className="text-4xl font-bold mx-2 my-2 text-black drop-shadow-2xl ">
        FURY
      </a>

      {/* Location bar */}
      <select className=" w-0 lg:w-auto drop-shadow-2xl bg-white text-black h-10 my-2 lg:mx-10 border  rounded-md">
        {deliverable_address.map((item,index) => {
          return <option key={index} className="bg-white text-black appearance-none">
            {item}
            </option>;
        })}
      </select>

      {/* Search Bar */}
      <div className="md:w-5/12 xl:mx-24 md:mx-12 flex w-0 ">
        <input
          type="search"
          value={value}
          onChange={change}
          className="w-full  border  text-center outline-none drop-shadow-2xl bg-white h-10 my-2 text-black rounded-2xl"
          placeholder="Search Fury.in"
        />
        <button onClick={search}  
        onKeyDown={(e) => {
        if (e.key === "Enter"){
          search()
        }
        }}>
          <svg
            className="w-0 md:w-auto md:scale-75 h-10 hover:scale-95 bg-white my-2 hover:transparent hover:rounded-md rounded-r-2xl mr-2 "
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 30 30"
          >
            <path
              ath
              d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
            ></path>
          </svg>
        </button>
      </div>

      <button onClick={myCart} className=" w-0 flex rounded-md  h-10 my-2 md:w-1/12 ">
        <img  className='h-8  mx-2 w-0 md:w-auto' src="https://img.icons8.com/ios-filled/000000/shopping-cart.png" alt="Unable to load "/>
        <div  className="my-2 w-0 md:w-8">Cart</div>
      </button>
      <button onClick={login} className="w-0 md:w-auto  my-1 mx-10 h-5">
        <div className="font-light w-0 md:w-auto ">Hello !</div>
        <div className="text-1xl font-bold w-0 md:w-52">{userName}</div>
      </button>
      </div>
      </div>
 
    
  );
}

export default Navbar;
