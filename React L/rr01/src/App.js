import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Navbar from './Components/Navbar';
import Post from './Components/Post';

import './App.css'
function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route path='/' element= <Home/> />
        <Route path='/about' element=<About/> />
        <Route path='/contact' element=<Contact/> />
        {/* Dynamic Url */}
        <Route path='/post/:category' element=<Post/> />  
        {/* Not Found Page */}
        <Route path='*' element={<h2>Error 404 Page Not Found</h2>} />

      </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
