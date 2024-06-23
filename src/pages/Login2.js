import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

function Login2() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

 

  const navigate = useNavigate();


 
  const [formData, setFormData] = useState({
    username_or_email: '',
    password: '',
});

const [error, setError] = useState(null); // Add error state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

    
      const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
        const response = await axios.post('https://camper-5tkx.onrender.com/api/login/', JSON.stringify(formData),{headers:{'Content-Type':'application/json'}}
          
        );
           
        alert("login successful");
        const { token,username,user_id } = response.data;
           
            console.log('Token:', token);
          
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('user_id', user_id);
            navigate("/security2");

           
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid username,email or password');
            // Handle login failure, display error message, etc.
    
            setTimeout(() => {
              setError(null);
            }, 10000); // 10000 milliseconds = 10 seconds
        }

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
                name="username_or_email"
                id=""
                aria-describedby="helpId"
                placeholder="Username or Email"
                onChange={handleChange}
            />
           
        </div>


        <div className="col d-flex gap-1">
          
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            className="form-control"
             placeholder='password'
             name="password"
             onChange={handleChange}
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
      {error && (<div className="text-danger">{error}</div>)} 
      <button className="btn btn-primary mt-3" type="submit">Sign in</button>
      
    </form>
    {/* <small className='sf-grey'>Don't have an account?&nbsp;<Link to="/register" className='no-link-decoration text-primary '>Register</Link></small> */}
        

    </div>

    </>
  )
}

export default Login2

