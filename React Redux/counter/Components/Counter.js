import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {increaseCount,decreaseCount,resetCount,increaseCountByfive,decreaseCountByfive} from '../Store/CounterSlice';

function Counter() {

  const counter = useSelector(store=>store.counter.value);

  const dispatch = useDispatch();

  return (
    <div>
    <div style={{display:"flex",margin:"10px"}}>
      <button onClick={()=>dispatch(increaseCount())}>+</button>
      <p style={{padding:"5px",margin:"5px"}}>{counter}</p>
      <button onClick={()=>dispatch(decreaseCount())}>-</button>
    </div>
    <button style={{padding:"5px",margin:"5px"}} onClick={()=>dispatch(decreaseCountByfive())}>decrease by 5</button>
    <button style={{padding:"5px",margin:"5px"}} onClick={()=>dispatch(resetCount())}>reset</button>
    <button style={{padding:"5px",margin:"5px"}} onClick={()=>dispatch(increaseCountByfive())}>increase by 5</button>
    </div>
  )
}

export default Counter