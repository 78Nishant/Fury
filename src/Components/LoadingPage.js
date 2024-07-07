import React from 'react'

function LoadingPage() {
    const images=['https://t3.ftcdn.net/jpg/00/66/74/90/360_F_66749097_nCsOYh69ix0o7h1DDXztTADd4N3q0Kze.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA3aO-MsKu_UfOFz36DtaMyvj_PPYnF4Rj6g&s','https://media.istockphoto.com/id/1404300806/photo/cute-dachshund-puppy-sits-and-looks-attentively-sideways-at-the-owner-waiting-for-a-delicious.webp?b=1&s=170667a&w=0&k=20&c=q5M_2im2chAM4tj-DAHXRKYez_RfL-a5yixXGZddKv0=']
    const val=(Math.floor(Math.random() * 10))%3;
    return(
      <div className='text-5xl font-bold  h-screen flex justify-center items-center '>
        <img src={images[val]} />
        Loading...
      </div>
    )
}

export default LoadingPage
