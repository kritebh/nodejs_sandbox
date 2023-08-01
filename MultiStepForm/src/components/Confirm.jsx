import React from 'react'

function Confirm({currStep,setCurrStep}) {
  return (
    <div>Confirm
        <button onClick={()=>setCurrStep(currStep-1)}>Back</button>
    </div>
  )
}

export default Confirm