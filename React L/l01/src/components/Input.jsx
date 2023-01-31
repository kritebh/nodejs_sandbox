import React,{useState} from 'react'

function Input() {

    const [name,setName]=useState("")
    console.log(name);

  return (
    <div>
        <form onSubmit={(e)=>{e.preventDefault(); console.log(name)}}>
            <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Input