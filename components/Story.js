import React from 'react'

const Story = ({img, userName}) => {
  return (
    <div>
        {/* <img src="/hp.jpg" alt="" /> */}
        {/* below should be object-contain  */}
        <img src={img} className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-cover cursor-pointer hover:scale-110 transition transform duration-200 ease-out" alt="" />
        {/* <p>userName</p> */}
        <p className='text-xs w-14 truncate text-center'>{userName}</p>
    </div>
  )
}

export default Story