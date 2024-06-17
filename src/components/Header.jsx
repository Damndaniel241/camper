import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const username = localStorage.getItem('username');

  return (
    <div className=" w-100 fs-2 py-3 px-3 bg-light-blue d-flex justify-content-between"><Link className='no-link-decoration  text-light' to="/">Camper</Link>
    
    {username && (
      <div className='text-light userfont align-self-center'>hello, {username}!</div>
    )}
    </div>
  )
}

export default Header