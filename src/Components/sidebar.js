import React from 'react'

function sidebar() {
  return (
    <div className='h-full  w-full bg-gradient-to-b from-blue-900 via-blue-900 to-red-600 text-white text-1xl'>
        <a href='/' className='mx-2  w-full flex justify-start'>
        <img  className='mx-2 ' width="40" height="40" src="https://img.icons8.com/ios-filled/50/ffffff/home-page.png" alt="home-page"/>
       <div className='my-2 '> Home </div>
        </a>
        <a href='/mycart' className='my-4 mx-2 w-full flex justify-start'>
        <img className='mx-1' width="40" height="40" src="https://img.icons8.com/ios-filled/ffffff/shopping-cart.png" alt="shopping-cart"/>
       <div className='my-2'> My Cart</div>
        </a>
        <a href='loginpage' className='my-4 mx-2 w-full flex justify-start '>
        <img className='mx-2' width="40" height="40" src="https://img.icons8.com/ios-filled/ffffff/login-rounded-right.png" alt="login-rounded-right"/>
         <div className='my-2'>Login / SignUp</div> 
          </a>
        <a href='contactPage' className='my-4 mx-2 w-full flex justify-start '>
        <img className='mx-2' width="40" height="40" src="https://img.icons8.com/ios-filled/ffffff/phone-message.png" alt="phone-message"/>
         <div className='my-2'> Contact Us</div>
          </a> 
    </div>
  )
}

export default sidebar
