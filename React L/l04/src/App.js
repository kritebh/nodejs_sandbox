import './App.css';
import CA from './Components/CA';
import {useState,createContext} from 'react'

const GlobalState = createContext()

function App() {
  // eslint-disable-next-line no-unused-vars
  const [data,setData]= useState("data from A useContext")
  // eslint-disable-next-line no-unused-vars
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
