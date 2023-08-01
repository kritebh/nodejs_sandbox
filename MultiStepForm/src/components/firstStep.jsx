import {useState} from 'react'

function FirstStep({currStep,setCurrStep,formData,setFormData}) {

    const handleInputChange = (e)=>{
        let newFOrmData = {...formData,firstStep:{...formData.firstStep,name:e.target.value}}
        setFormData(newFOrmData)
    }
    
  return (
    <div>
        <input type='text' placeholder='name' onChange={(e)=>handleInputChange(e)} value={formData.firstStep.name}></input>
        <button onClick={()=>setCurrStep(currStep+1)}>Next</button>    
    </div>
  )
}

export default FirstStep