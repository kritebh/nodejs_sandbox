import React from 'react'

function SecondStep({currStep,setCurrStep}) {
  return (
    <div>secondStep
         <button onClick={()=>setCurrStep(currStep+1)}>Next</button> 
         <button onClick={()=>setCurrStep(currStep-1)}>Back</button>
    </div>

  )
}

export default SecondStep