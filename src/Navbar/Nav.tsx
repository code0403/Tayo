import React from 'react'
import { Link } from 'react-router-dom'
import "./Nav.css"

const Nav: React.FC  = () => {
  return (
    <nav>
      <Link to={"/"} className='link'>Contacts</Link>
      <hr />
      <Link to={"/charts"} className='link'>Charts and Maps</Link>
    </nav>
  )
}

export default Nav;
