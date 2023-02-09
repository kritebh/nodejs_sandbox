import React from 'react'

function Movie({movie:{imdbID,Title,Year,Poster}}) {
  return (
    <div>
        <div className='h-min w-[182px] shadow-md hover:scale-105 cursor-pointer'>
        <img className='rounded-t-xl' src={Poster} alt={Title} width={182} height={268}/>
        <h2 className='text-center text-lg'>{Title}</h2>
        <p className='text-center'>{Year}</p>
        </div>
    </div>
  )
}

export default Movie