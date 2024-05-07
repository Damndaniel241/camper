import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaArrowLeftLong } from "react-icons/fa6";
import PasswordValidator from 'react-password-validattor'




function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });


  const handleSignUp = async () => {

  navigate('/security');
  };



  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      if (value !== password) {
        setPasswordMatch(false);
      } else {
        setPasswordMatch(true);
      }
    }
  }


 

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
                name=""
                id=""
                aria-describedby="helpId"
                placeholder="UserName"
                value={formData.username} 
                onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder="Email"
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>


            <div className="mb-3">
              
              <input
                type="password"
                className="form-control"
                name=""
                id=""
                placeholder="Password"
                value={formData.password} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

{/* 
            <div className="mb-3">
            
              <input
                type="password"
                className="form-control"
                id=""
                onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} name="confirmedPassword" placeholder="Please re-enter your password" 
              />
            </div> */}

            <PasswordValidator 
              rules={['minLength', 
                      'maxLength', 
                      'specialChar', 
                      'number', 
                      'capital', 
                      'matches', 
                      'lowercase', 
                      'notEmpty', 
                      'shouldNotContain']}
              // forbiddenWords={['John', 'Doe']} 
              minLength={8}
              maxLength={32}
              password={password}
              confirmedPassword={confirmPassword}
              iconSize={16}
              // onValidatorChange={onValidatorChangeHandler}
              config={{ showProgressBar: true }} />
            
            

         
          
          </div>
          <button onClick={handleSignUp} className="btn btn-primary" type="submit">
            Sign Up
          </button>
        {/* </form> */}
        <small className='sf-grey'>Already have an account?&nbsp;<Link to="/login" className='no-link-decoration text-primary '>Sign In</Link></small>
      </div>
    </>
  );
}

export default Register;
