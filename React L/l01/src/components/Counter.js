import React,{useState} from 'react'
import Profile from './Profile';
function Counter() {
    const [num, setNum] = useState(0);
    const [lowerlimit, setlowerLimit] = useState(1);
    const [higherlimit, sethigherLimit] = useState(0);
  
    const increment = () => {
      if(num>=10){
        sethigherLimit(1);
        return
      }
      setlowerLimit(0)
      setNum(num + 1);
    };
  
    const decrement = () => {
      if(num<=0){
        setlowerLimit(1);
        return
      }
      sethigherLimit(0)
      setNum(num - 1);
    };
  
    return (
      <div>
        <button disabled={lowerlimit} style={{ marginRight: "10px" }} onClick={decrement}>
          -
        </button>
        <span>{num}</span>
        <button disabled={higherlimit} style={{ marginLeft: "10px" }} onClick={increment}>
          +
        </button>
        {num===7 &&<Profile/>}
      </div>
    );
}

export default Counter