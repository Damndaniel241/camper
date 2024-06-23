import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaArrowLeftLong } from "react-icons/fa6";
import PasswordValidator from 'react-password-validattor'

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';




function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });

 
   

};

const generatePassword = () => {
  const length = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
  const specials = "!@#$%&*_?";
  const numbers = "0123456789";
  const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const allChars = specials + numbers + lowerLetters + upperLetters;

  let newPassword = specials[Math.floor(Math.random() * specials.length)];
  newPassword += numbers[Math.floor(Math.random() * numbers.length)];
  newPassword +=
    lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
  newPassword +=
    upperLetters[Math.floor(Math.random() * upperLetters.length)];

  for (let i = 4; i < length; i++) {
    newPassword += allChars[Math.floor(Math.random() * allChars.length)];
  }

  newPassword = newPassword
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
  console.log(newPassword);
  setPassword(newPassword);
};


  const handleSignUp = async (e) => {
    // if (!passwordMatch) {
    //   alert("Passwords do not match");
    //   return;
    // }
    e.preventDefault();
    try {
      const response = await axios.post('camper-5tkx.onrender.com/api/register/', formData);
      
      alert(`Welcome ${formData.username}`)
      if (response.status === 201) {
        
  navigate('/login2');
  }
} catch (error) {
  console.error('Error during registration:', error);
  alert('Registration failed. Please check your details and try again.');
}
};



  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   if (name === "password") {
  //     setPassword(value);
  //   } else if (name === "confirmPassword") {
  //     setConfirmPassword(value);
  //     if (value !== password) {
  //       setPasswordMatch(false);
  //     } else {
  //       setPasswordMatch(true);
  //     }
  //   }
  // }


 

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  return (
    <>
      <Header />

      <div className="container d-flex gap-5 flex-column  justify-content-center align-items-center height-100vh">
       <h1>Register</h1>
        {/* <form
          className="needs-validation mb-5 border-top"
          noValidate
          onSubmit={handleSubmit}
        > */}
          <div className="form-group">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="username"
                id=""
                aria-describedby="helpId"
                placeholder="UserName"
                value={formData.username}
                onChange={handleChange}
                
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                id=""
                aria-describedby="helpId"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
               
              />
            </div>


            <div className="mb-3 d-flex gap-1">
              
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className="form-control"
                name="password"
                id=""
                placeholder="Password"
                value={formData.password} 
                // onChange={(e) => setPassword(e.target.value)} 
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


            {/* <div class="mb-3 d-flex gap-1">
             
              <input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                class="form-control"
                id=""
                aria-describedby="helpId"
                // onChange={(e) => setConfirmPassword(e.target.value)}
                value={formData.confirmPassword} 
                name="confirmedPassword" 
                placeholder="Please re-enter your password"
                onChange={handleChange}
              />
               <span className="password-toggle align-self-center" onClick={toggleConfirmPasswordVisibility}>
        {isConfirmPasswordVisible ? (
          <FaEye/>
        ) : (
          <FaEyeSlash/>
        )}
      </span>
            </div>
             */}
            <PasswordValidator 
              rules={['minLength', 
                      'maxLength', 
                      'specialChar', 
                      'number', 
                      'capital', 
                      // 'matches', 
                      'lowercase', 
                      'notEmpty'
                      // 'shouldNotContain'
                    ]}
              // forbiddenWords={['John', 'Doe']} 
              minLength={8}
              maxLength={32}
              password={formData.password}
              // confirmedPassword={confirmPassword}
              iconSize={16}
              // onValidatorChange={onValidatorChangeHandler}
              config={{ showProgressBar: true }} />
            
            

         
          
          </div>

          {/* <button
                        className="btn btn-primary align-self-start"
                        onClick={(e) => {
                          e.preventDefault();
                          generatePassword();
                        }}
                      >
                        Generate Password
                      </button> */}

    

        
        
          <button onClick={handleSignUp} className="btn btn-primary" type="submit">
            Sign Up
          </button>

        <small className='sf-grey'>Already have an account?&nbsp;<Link to="/login" className='no-link-decoration text-primary '>Sign In</Link></small>
      </div>
    </>
  );
}

export default Register;
