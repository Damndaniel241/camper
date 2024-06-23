import React from 'react';
import {Link} from 'react-router-dom';
import logoSmall from '../logo192.png';
import realLogo1 from '../locked.png';
import Header from '../components/Header';

function Home() {
  return (
    <>
    {/* <div className="container fs-2 ">Camper</div> */}
<Header/>
   
<div className='d-flex justify-content-center height-100vh flex-column  align-items-center'>
<div className='d-flex justify-content-center align-items-center  flex-column'>
<img className="text-center" src={realLogo1} height="120em" width="120em"/>
    <div className='h5 my-2 text-center  '>Welcome to Camper Password Manager</div>
    <h6 className='text-center sf-grey my-3'>Easily manage your stored passwords on by leveraging the power of Steganography, 
        ensuring they are accessible across all your devices.</h6>
        </div>

        
{/* <div className='d-flex justify-content-center align-items-center flex-column '>
<img className="text-center" src={logoSmall}/>
<div className='h5 my-2 text-center  '>Password Checkup</div>
<h6 className='text-center sf-grey'>Check the strength and security of your saved passwords. Find out if they’ve been compromised and get personalized advice when you need it.</h6>
</div> */}

<div className='d-flex justify-content-center align-items-center '>
    <Link to="/login"
        type="button"
        className="btn btn-primary mx-3"
    >
        Sign in
    </Link>
    
    <Link to="/register"
        type="button"
        className="btn btn-primary"
    >
        Register
    </Link>
    
</div>
</div>

    </>
  )
}

export default Home