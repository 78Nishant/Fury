import React, { useEffect, useState } from 'react'
import DisplayBox from './DisplayBox'
import FrontBanner from './FrontBanner';
import Categories from './Categories';
import axios from 'axios';

function FrontPageProducts() {
  const [loading,setLoading]=useState(true);
  const [all,setAll]=useState([])
  const [current,setCurrent]=useState(0);
  
  const [itemPerPage,setItemPerPage]=useState(12);
  const [nextPage,setNextPage]=useState(itemPerPage);

  const getProduct=async ()=>{
    // setLoading(true);
    await fetch('https://ecommercebackend-qi6x.onrender.com/')
      .then(response => response.json())
      .then(res => {
        setAll(res);
        setLoading(false);
      });
    // const res=await axios.get('https://ecommercebackend-qi6x.onrender.com/');
    // setAll(res.data);
  }
  const currentPage=Math.ceil(current/itemPerPage);
  const totalPage=Math.ceil(all.length/itemPerPage)
  
  useEffect(() => {
     getProduct();
    })
    const data = all.slice(current, nextPage);
    
    //loading effect
  if(loading){
    const images=['https://t3.ftcdn.net/jpg/00/66/74/90/360_F_66749097_nCsOYh69ix0o7h1DDXztTADd4N3q0Kze.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA3aO-MsKu_UfOFz36DtaMyvj_PPYnF4Rj6g&s','https://media.istockphoto.com/id/1404300806/photo/cute-dachshund-puppy-sits-and-looks-attentively-sideways-at-the-owner-waiting-for-a-delicious.webp?b=1&s=170667a&w=0&k=20&c=q5M_2im2chAM4tj-DAHXRKYez_RfL-a5yixXGZddKv0=']
    const val=(Math.floor(Math.random() * 10))%3;
    return(
      <div className='text-5xl font-bold  h-screen flex justify-center items-center '>
        <img src={images[val]} />
        Loading...
      </div>
    )
  }
  //Pagination
  const set=(params)=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    },5000)
    setCurrent(itemPerPage*(params-1));
    setNextPage(itemPerPage*(params));
  }
  const next=(params)=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    },5000)
    setCurrent(current+itemPerPage);
    setNextPage(nextPage+itemPerPage);
  }
  const prev=()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    },5000)
    setCurrent(current-itemPerPage);
    setNextPage(nextPage-itemPerPage);
  }
  return (
    <div className='h-screen my-20 '>
    <FrontBanner/>
    <button className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 md:mx-5 mx-4'>
      {data.map((e)=>{

        return(
          <div className='my-8  '>
          <DisplayBox product={e} />
          </div>
        )}
        )
      } 
    </button>
    <div className='mx-20 text-blue-600 text-center font-sans'> {currentPage+1} / {totalPage} pages </div>
    
    {/* Don't use w-screen instead use w-full  */}
    <div className='w-full  flex justify-center'>
    <button  onClick={prev} className=' bg-blue-500 w-20 h-10 text-white rounded-md mx-20 my-5'>
       Prev
    </button>
    <ul className='flex my-5'>
      <button onClick={()=>set(currentPage+1)} className='mx-2 w-7 h-7 hover:bg-blue-600 hover:text-white hover:rounded-full '> {currentPage+1}</button>
      <button onClick={()=>set(currentPage+2)} className='mx-2 w-7 h-7 hover:bg-blue-600 hover:text-white hover:rounded-full'> {currentPage+2}</button>
      <button onClick={()=>set(currentPage+3)} className='mx-2 w-7 h-7 hover:bg-blue-600 hover:text-white hover:rounded-full'> {currentPage+3}</button>
      <button onClick={()=>set(currentPage+4)} className='mx-2 w-7 h-7 hover:bg-blue-600 hover:text-white hover:rounded-full'> {currentPage+4}</button>
    </ul>
    <button  onClick={next} className='bg-blue-500 w-20 h-10 text-white rounded-md mx-20 my-5'>
        Next
    </button>
    </div>
    </div>)
}

export default FrontPageProducts;
