import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Login() {

   
    const handleChange = (event) => {
        const value = event.target.value;
        // setPassword(value);
    
   

    
    };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here

      };


  return (
    <>
    <Header/>
    
    <div className=' d-flex flex-column  align-items-center justify-content-center  height-100vh'>

<h1 className=' mb-5'>Sign In</h1>
     

<form className="needs-validation mb-5 border-top" noValidate onSubmit={handleSubmit}>
      <div className="form-group">


      <div class="mb-3">
          
            <input
                type="text"
                class="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder="Username"
            />
            
        </div>


        <div className="col">
          
          <input
            type="password"
            className="form-control"
             placeholder='password'
          />
         
        </div>
      </div>
      <Link to="/main" className="btn btn-primary mt-3" type="submit">Sign in</Link>
      
    </form>
    <small className='sf-grey'>Don't have an account?&nbsp;<Link to="/register" className='no-link-decoration text-primary '>Register</Link></small>
        

    </div>

    </>
  )
}

export default Login