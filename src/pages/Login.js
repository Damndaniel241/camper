import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Header from '../components/Header';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';


function Login() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [error, setError] = useState(null);

  const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    };

    const [formData, setFormData] = useState({
      username_or_email: '',
      password: '',
  });
  
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', JSON.stringify(formData), { headers: { 'Content-Type': 'application/json' } });
                
            alert("login successful");
            
            const { token,username,user_id } = response.data;
           
                console.log('Token:', token);
                // setCurrentUser(true);
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                 localStorage.setItem('user_id', user_id);
                navigate("/main");
    
               
            } catch (error) {
                console.error('Login failed:', error);
                setError('Invalid username,email or password');
                // Handle login failure, display error message, etc.
        
                setTimeout(() => {
                  setError(null);
                }, 10000); // 10000 milliseconds = 10 seconds
            }
    
          };
    
        // Handle form submission logic here

      


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
    <small className='sf-grey'>Don't have an account?&nbsp;<Link to="/register" className='no-link-decoration text-primary '>Register</Link></small>
        

    </div>

    </>
  )
}

export default Login

