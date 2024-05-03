import React,{useState} from "react";
import Header from "../components/Header";
import { LuPlus } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { PiGlobeSimple } from "react-icons/pi";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import PasswordValidator from "react-password-validattor";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Item from "./Item";

function Main2() {

    const [password, setPassword] = useState("");
    const [showNewEdit, setShowNewEdit] = useState(false);
    const [logins, setLogins] = useState([]);
    const [showItem, setShowItem] = useState(false);
    const [accountName, setAccountName] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const handleFormSubmit = (e) => {
      e.preventDefault();
      setShowForm(false);
      setShowItem(true);
      setShowEdit(true);
      setShowNewEdit(false);
      // handleAddLogin();
      const newLogin = {
        id: logins.length + 1, // You may need an id for each login item
        accountName: accountName,
        // Add other properties as needed
      };

    
      
      setLogins([...logins, newLogin]);
        // Clear the form fields after submission
  // setAccountName('');
  // setPassword('');


      console.log(logins);
    }

  //   const addLogin = () => {
  //     const newLogin = <Item key={logins.length + 1} />;
  //     setLogins([...logins, newLogin]);
  //   };


  // const handleAddLogin = () => {
  //   addLogin(setLogins);
  // };
  
 
  
 

    const handleNewEditClick = () => {
        setShowNewEdit(true);
        setShowForm(true);
        setShowEdit(false);

         setAccountName('');
  setPassword('');

        // setTimeout(() => setShowNewEdit(false), 3000);
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
      
  return (
    <>
      <Header />

      <div className="passlist-body height-100vh">
        <div className="lists">
          <div className="list-1 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name=""
                  id=""
                  aria-describedby="helpId"
                  placeholder="Search Accounts"
                  // onChange={(e) => setPassword(e.target.value)}
                  // value={accountName}
                />
              </div>
              <div style={{cursor:"pointer"}}
              onClick={handleNewEditClick}
              className={`bg-grey p-2 px-3 rounded-1 ${
                showNewEdit ? "invisible" : ""
              }`}>
                <LuPlus
                  style={{ backgroundColor: "#72757a", color: "black" }}
                />
              </div>

            </div>
          </div>
          <div id="list-2" className="list-2 ">

          {showItem && (
        logins.map((login, index) => (
          <Item key={index} accountName={login.accountName} />
        ))
       
    
      )}
     
          </div>
        </div>

        <div className="edit">
        <div className="d-flex justify-content-end align-items-center  p-3">
            <BsThreeDots />
          </div>

          {showForm && ( <div>

          {showNewEdit &&  <div  className="mx-3">
        <h1 className="mb-5 d-flex">
          <PiGlobeSimple style={{ marginRight: "0.567em" }} />
          <span>Create New Account</span>
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label for="" className="form-label">
              Account Name
            </label>
            <input
              type="text"
              className="form-control form-control-sm "
              name="name"
         
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              id=""
              aria-describedby="helpId"
              placeholder=""
             
            />
          </div>
          
        
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
        
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>}
      </div> )}


      {showEdit && (
        <div id="edit-container" className="d-flex justify-content-evenly p-5">
          <h1 className='me-5 gap-2 d-flex'><PiGlobeSimple/><span>{accountName}</span></h1>

<div className='d-flex align-items-center  gap-4'>
  <div className='p-1 px-3 hover-grey rounded-1 d-flex align-items-center gap-1'><FaPencilAlt /> <span>Edit</span></div>
  <div className='p-1 px-3 hover-grey rounded-1 d-flex align-items-center gap-1'><RiDeleteBin6Fill /><span>Remove</span></div>
</div>
        </div>
      )}
            </div>

            

      </div>
    </>
  );
}

export default Main2;
