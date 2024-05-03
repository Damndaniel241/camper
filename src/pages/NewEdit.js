import React, { useState} from "react";
import { PiGlobeSimple } from "react-icons/pi";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import PasswordValidator from "react-password-validattor";
import Item from "./Item";
import { useNavigate } from "react-router-dom";

function NewEdit({ onFormChange, item }){
  const [password, setPassword] = useState("");
  const [logins, setLogins] = useState([]);
  const [name, setName]  = useState("");
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ /* Initial form data */ });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Update form state
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onFormChange(formData); // Pass updated form data to Main.js
    // navigate('/read', { state: { formData } });
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
  // function generatePassword() {
  //   const generatedPassword = generatePassword();
  //   setPassword(generatedPassword);
  // }

  const addLogin = () => {
    // Logic to add a new login component to the list
    const newLogin = <Item key={logins.length + 1} />;
    setLogins([...logins, newLogin]);
  
  };

  return (
    <>
      <div className="mx-3">
        <h1 className="mb-5 d-flex">
          <PiGlobeSimple style={{ marginRight: "0.567em" }} />
          <span>Create New Account</span>
        </h1>
        <form >
          <div className="mb-3">
            <label for="" className="form-label">
              Account Name
            </label>
            <input
              type="text"
              className="form-control form-control-sm "
              name="specificVariable"
              value={formData.specificVariable}
              onChange={handleChange}
              
              id=""
              aria-describedby="helpId"
              placeholder=""
             
            />
          </div>
          
          {/* <div className="mb-3">
        <label for="" className="form-label">Username</label>
        <input
          type="text"
          className="form-control form-control-sm"
          name="username"
          id=""
          aria-describedby="helpId"
          placeholder=""
        />
        
      </div> */}

          <div className="mb-3 d-flex flex-column gap-2">
            <label for="" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-sm"
              name="password"
              id=""
              aria-describedby="helpId"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <PasswordValidator
              rules={[
                "minLength",
                "maxLength",
                "specialChar",
                "number",
                "capital",
                // 'matches',
                "lowercase",
                "notEmpty",
                "shouldNotContain",
              ]}
              forbiddenWords={["John", "Doe"]}
              minLength={8}
              maxLength={32}
              password={password}
              iconSize={16}
              // onValidatorChange={onValidatorChangeHandler}
              config={{ showProgressBar: true }}
            />

            <button
              className="btn btn-primary align-self-start"
              onClick={(e) => {
                e.preventDefault();
                generatePassword();
              }}
            >
              Generate Password
            </button>
            <p className="align-self-start">{password}</p>
          </div>

          <div className="d-flex justify-content-end align-items-center ">
            <button type="button" className="btn bg-grey text-black mx-3">
              Cancel
            </button>

            <button
            onClick={handleFormSubmit}
              type="button"
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewEdit;


