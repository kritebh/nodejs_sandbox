import { useState } from 'react'
import FirstStep from './components/firstStep.jsx';
import SecondStep from './components/secondStep.jsx';
import Confirm from './components/Confirm.jsx';

function App() {
  const [currStep,setCurrStep] = useState(1);
  const [formData,setFormData] = useState({
    firstStep:{
      name:"",
      age:null
    },
    secondStep:{
      address1:"",
      address2:""
    },
  });

  if(currStep===1)return <FirstStep currStep={currStep} setCurrStep={setCurrStep} formData={formData} setFormData={setFormData} />
  if(currStep===2)return <SecondStep currStep={currStep} setCurrStep={setCurrStep} formData={formData} setFormData={setFormData} />
  return (
    <>
      {currStep===3?<Confirm currStep={currStep} setCurrStep={setCurrStep} formData={formData} setFormData={setFormData} />:""}
    </>
  )
}

export default App
