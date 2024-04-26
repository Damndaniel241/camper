import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className=" w-100 fs-2 py-3 px-3 bg-light-blue"><Link className='no-link-decoration  text-light' to="/">Camper</Link></div>
  )
}

export default Header