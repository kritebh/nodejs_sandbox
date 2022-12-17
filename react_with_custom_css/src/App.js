import './App.css';
import Hello from './Hello';

function App() {
  console.log("Server Hit")
  return (
    <div className="App">
      
        <Hello name="John"/>
    
    </div>
  );
}

export default App;
