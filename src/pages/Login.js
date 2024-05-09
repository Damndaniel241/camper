import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


function Login() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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


      <div className="mb-3 ">
          
            <input
                type='text'
                className="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder="Username"
            />
           
        </div>


        <div className="col d-flex gap-1">
          
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            className="form-control"
             placeholder='password'
          />
           <span className="password-toggle align-self-center" onClick={togglePasswordVisibility}>
        {isPasswordVisible ? (
          <FaEye/>
        ) : (
          <FaEyeSlash/>
        )}
      </span>
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

