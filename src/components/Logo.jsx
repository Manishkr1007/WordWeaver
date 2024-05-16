import React from 'react'
import logo from "../../public/img/Featherpenlogo.png"

function Logo({width = "100%"}) {
  return (
  <img src={logo} style={{width}} className='rounded-full'  alt='Logo placeholder' />
   ) 
}

export default Logo;