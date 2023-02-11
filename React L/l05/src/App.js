import './App.css';
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { Inc,Dec } from './states/reducers';

function App() {

  const currState = useSelector((state)=>state.number)
  const dispatch = useDispatch()



  return (
    <div className="App">
        <button onClick={()=>dispatch(Inc())}>+</button>
        <h2>{currState}</h2>
        <button onClick={()=>dispatch(Dec())}>-</button>
    </div>
  );
}

export default App;
