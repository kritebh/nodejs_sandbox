import Header from "./Components/Header";
import { useState } from "react";
import Add from "./assets/add.jsx"
import Detail from "./Components/Detail";
function App() {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [data,setData] = useState([])

  function submitHandle(){
      let userData = {name,email,id:Date.now()}
      setData([...data,userData])
      setName("")
      setEmail("")
  }

  function removeItem(id){
    let newData = data.filter(d=>{
      return d.id!==id
    })
    setData(newData)
  }


  return (
    <div className="">
      <Header/>
      <div className="flex gap-8 justify-center mt-3">
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="border py-2 px-3 text-grey-darkest" />
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="border py-2 px-3 text-grey-darkest" />
        <button type="submit" onClick={submitHandle} className="bg-black p-4 text-white"><Add/></button>
      </div>
      <hr className="mt-4"></hr>
      {
        data.map((d,i)=>{
          return <Detail key={d.id} data={d} removeItem={removeItem} />
        })
      }
    </div>
  );
}

export default App;
