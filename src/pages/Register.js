import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { FaArrowLeftLong } from "react-icons/fa6";
import PasswordValidator from 'react-password-validattor'




function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [feedback, setFeedback] = useState("");
  const [progress, setProgress] = useState(0);
  const [feedbackColor, setFeedbackColor] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

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
    // Perform your validation logic here and update state accordingly
    // Validation logic
    let strength = "";
    let feedback = "";
    let progress = 0;

    // Regular expressions for each requirement
    const regex = [
      /[!@#$%&*_?]/, // Special characters
      /[A-Z]/, // Uppercase letters
      /[0-9]/, // Numbers
      /[a-z]/, // Lowercase letters
    ];

    // Check each requirement
    regex.forEach((pattern) => {
      if (pattern.test(value)) {
        progress += 25;
      }
    });

    if (value.length < 8) {
      strength = "Way too Weak";
      feedback = `${8 - value.length} more characters required`;
      setFeedbackColor("bg-danger");
      setFeedback(feedback);
    } else if (progress < 100) {
      switch (progress) {
        case 0:
        case 25:
          strength = "Very Weak";
          setFeedbackColor("bg-danger");

          break;
        case 50:
          strength = "Weak";
          setFeedbackColor("bg-warning");

          break;
        case 75:
          strength = "Medium";
          setFeedbackColor("bg-warning");

          break;
        default:
          break;
      }
      feedback =
        "Password must contain special characters, numbers, uppercase and lowercase letters";
      setFeedback(feedback);
    } else {
      strength = "Strong";
      feedback = "Password meets all requirements";
      setFeedbackColor("bg-success");
    }

    setStrength(strength);
    setFeedback(feedback);
    setProgress(progress);

    console.log(strength);
    console.log(feedback);
    console.log(progress);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Header />

      <div className="container d-flex gap-5 flex-column  justify-content-center align-items-center height-100vh">
       <h1>Register</h1>
        <form
          className="needs-validation mb-5 border-top"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name=""
                id=""
                aria-describedby="helpId"
                placeholder="UserName"
              />
            </div>

            <div className="mb-3">
              
              <input
                type="password"
                className="form-control"
                name=""
                id=""
                placeholder="Password"
              />
            </div>


            <div className="mb-3">
            
              <input
                type="password"
                className="form-control"
    
                id=""
                
                onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} name="confirmedPassword" placeholder="Please re-enter your password" 
              />
            </div>

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
            
            

            {/* <div className="col">
              <input
                type="password"
                className="form-control"
                minLength="8"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                required
              />
            
              <div className="progress" style={{ height: "5px" }}>
                <div
                  className={`progress-bar ${feedbackColor} progress-bar-striped progress-bar-animated`}
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <small id="passwordHelpBlock" className="form-text text-muted">
                Your password must be 8-20 characters long, must contain special
                characters "!@#$%&*_?", numbers, lower and upper letters only.
              </small>


              <div id="feedbackin" className={` ${feedbackColor}`}>
                strength
              </div>
              <div id="feedbackirn" className={` ${feedbackColor}`}>
                {feedback}
              </div>


            </div>


            
            <div className="mb-3">
              <input
                type="password"
                className={`form-control ${!passwordMatch ? "is-invalid" : ""}`}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
              {!passwordMatch && (
                <div className="invalid-feedback">Passwords do not match</div>
              )}
            </div> */}
          </div>
          <Link to="/login" className="btn btn-primary" type="submit">
            Submit
          </Link>
        </form>
        <small className='sf-grey'>Already have an account?&nbsp;<Link to="/login" className='no-link-decoration text-primary '>Sign In</Link></small>
      </div>
    </>
  );
}

export default Register;
