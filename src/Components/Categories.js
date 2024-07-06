import React from 'react'

function Categories() {
  const category=['Beauty',"Furniture","Groceries","Home Decor","Kitchen appliances",'clothing',"Footwear","watches"]
  const images=[]
  return (
    <div className='h-1/6'>
      <div className='flex border border-black w-9/10 my-2 mx-32'>
        {category.map((item)=>{
            return(
              <div className='mx-5 my-10 w-28'>
                <img className='h-auto' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWZ7E8w989FVLH-2m6d71uolvbJKKx24o2Wg&s" />
                {item}
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default Categories
