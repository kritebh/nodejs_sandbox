import React from 'react'
import { Link,NavLink } from 'react-router-dom'


function Navbar() {
  return (
    <div>
        <ul >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link> </li>
            <li><Link to="/about">About</Link></li>
        </ul>
        <ul>
            <li> <NavLink to="/about" style={({isActive})=>{return {backgroundColor:isActive?'green':''}}} >About</NavLink> </li>
            <li> <NavLink to="/post/mobile" style={({isActive})=>{return {backgroundColor:isActive?'green':''}}} >Post</NavLink> </li>
        </ul>
    </div>
  )
}

export default Navbar