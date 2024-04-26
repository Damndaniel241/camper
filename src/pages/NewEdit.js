import React,{useState} from 'react'
import { PiGlobeSimple } from "react-icons/pi";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
// import generatePassword from '../utilities/passwordGenerator';


function NewEdit() {

  const [password, setPassword] = useState("");
  const generatePassword = () => {
    const length = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
    const specials = '!@#$%&*_?';
    const numbers = '0123456789';
    const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const allChars = specials + numbers + lowerLetters + upperLetters;

    let newPassword = specials[Math.floor(Math.random() * specials.length)];
    newPassword += numbers[Math.floor(Math.random() * numbers.length)];
    newPassword += lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
    newPassword += upperLetters[Math.floor(Math.random() * upperLetters.length)];

    for (let i = 4; i < length; i++) {
      newPassword += allChars[Math.floor(Math.random() * allChars.length)];
    }

    newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('');
 console.log(newPassword);
    setPassword(newPassword);
  };
  // function generatePassword() {
  //   const generatedPassword = generatePassword();
  //   setPassword(generatedPassword);
  // }

  return (
    <>
    <div className='mx-3'>
    <h1 className='mb-5'><PiGlobeSimple style={{marginRight:"0.567em"}}/>Create New Account</h1>
    <form>
      <div class="mb-3">
        <label for="" class="form-label">Account Name</label>
        <input
          type="text"
          class="form-control form-control-sm"
          name=""
          id=""
          aria-describedby="helpId"
          placeholder=""
        />
       
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Username</label>
        <input
          type="text"
          class="form-control form-control-sm"
          name="username"
          id=""
          aria-describedby="helpId"
          placeholder=""
        />
        
      </div>

      <div class="mb-3 d-flex ">
        <label for="" class="form-label">Password</label>
        <input
          type="password"
          class="form-control form-control-sm"
          name="password"
          id=""
          aria-describedby="helpId"
          placeholder=""
        />
        <button className='btn btn-primary ' onClick={(e) => { e.preventDefault(); generatePassword(); }}>Generate Password</button>
      <p>{password}</p>
        
      </div>

      <div className='d-flex justify-content-end align-items-center '>
    <button
        type="button"
        className="btn bg-grey text-black mx-3"
    >
        Cancel
    </button>
    
    <button
        type="button"
        className="btn btn-primary"
    >
        Save
    </button>
    
</div>
      </form>
    </div>
    </>
  )
}

export default NewEdit