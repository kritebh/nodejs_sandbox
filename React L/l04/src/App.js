import './App.css';
import CA from './Components/CA';
import {useState,createContext} from 'react'

const GlobalState = createContext()

function App() {
  const [data,setData]= useState("data from A useContext")
  const [count,setcount]= useState(0)


  return (
    
    <GlobalState.Provider value={{data,count}} >
      <div className="App">
        <CA/>
      </div>
    </GlobalState.Provider>
  );
}

export default App;
export {GlobalState}
