import React, { useState } from "react";
import Header from "../components/Header";
import { LuPlus } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { PiGlobeSimple } from "react-icons/pi";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link, NavLink,useNavigate } from "react-router-dom";
//  <FaPencilAlt /><RiDeleteBin6Fill />
import LoginList from "./LoginList";
import NewEdit from "./NewEdit";
import Item from "./Item";

function Main() {
  const [logins, setLogins] = useState([]);
  
  const [itemData, setItemData] = useState({ /* Initial item data */ });
  const navigate = useNavigate(); 
  const handleFormChange = (newItemData) => {
    setItemData(newItemData); // Update state with new item data
  };

  const handleAddLogin = () => {
    addLogin(setLogins);
  };

  const [showNewEdit, setShowNewEdit] = useState(false);

  const handleNewEditClick = () => {
    setShowNewEdit(true);
    // setTimeout(() => setShowNewEdit(false), 3000);
  };

  const addLogin = () => {
    // Logic to add a new login component to the list
    const newLogin = <Item key={logins.length + 1} />;
    setLogins([...logins, newLogin]);
  };

  const deleteLogin = (index) => {
    // Filter out the login component at the specified index
    const updatedLogins = logins.filter((_, i) => i !== index);
    setLogins(updatedLogins);
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
                />
              </div>

              <div
                style={{ cursor: "pointer" }}
                onClick={handleNewEditClick}
                className={`bg-grey p-2 px-3 rounded-1 ${
                  showNewEdit ? "invisible" : ""
                }`}
              >
                <LuPlus
                  style={{ backgroundColor: "#72757a", color: "black" }}
                />
              </div>
            </div>
          </div>
          <div id="list-2" className="list-2 ">

          <Item item={itemData} />
          </div>
        </div>

        <div className="edit">
          <div className="d-flex justify-content-end align-items-center  p-3">
            <BsThreeDots />
          </div>
          {showNewEdit && <NewEdit onFormChange={handleFormChange} item={itemData}/>}
          {/* <div className='d-flex justify-content-evenly p-5'>
            <h1 className='me-5'><PiGlobeSimple/>Account</h1>

            <div className='d-flex align-items-center  gap-5'>
              <div className='p-1 px-3 hover-grey rounded-1'><FaPencilAlt /> Edit</div>
              <div className='p-1 px-3 hover-grey rounded-1'><RiDeleteBin6Fill />Remove</div>
            </div>
      </div> */}

          
        </div>
      </div>
    </>
  );
}

export default Main;


























// {logins.length === 0 ? (
//   <div>
//     <p>No logins found. When you save a password in Camper, it will show up here</p>
//   </div>
// ) : (
//   <div>
//     {/* Render the list of login components */}
//     {logins.map((login, index) => (
//       <div key={index}>{login}

//       <button onClick={() => deleteLogin(index)}>delete Login</button>
//       </div>

//     ))}

//   </div>
// )}
