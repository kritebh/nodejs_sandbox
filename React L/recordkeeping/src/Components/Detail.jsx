import React from 'react'
import Delete from "../assets/delete"

function Detail({data:{name,email,id},removeItem}) {
  return (
    <div className='flex justify-between p-4 shadow-md mt-1'>
        <h2 className=''>{name}</h2>
        <h3 className=''>{email}</h3>
        <button className='text-red-600' onClick={()=>removeItem(id)}><Delete/></button>
    </div>
  )
}

export default Detail