import React from 'react';
import Header from '../components/Header';
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useNavigate, Link } from 'react-router-dom';

function Preferences() {

const navigate = useNavigate();

    const logout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('user_id');
        alert("sucessfully logged out");
        navigate('/');
        }
    };

    // const toMain = () => {
    //     navigate('/main');
    // }
    
  return (
    <>
    <Header/>
    <div className="d-flex justify-content-between m-4">
    <Link to='/main' ><FaArrowLeftLong /></Link>

    <div
     className="d-flex gap-2 align-items-center"
     style={{ cursor: "pointer" }}
    onClick={logout}
               >
                 < RiLogoutCircleRLine/>
                <span> logout</span>
               </div>
    </div>
    <div className='d-flex ms-4 gap-5 flex-column btn-outline-dark height-100vh justify-content-center align-items-center'>
    <button
        type="button"
        class="btn btn-primary"
    >
        change password
    </button>

    <button
        type="button"
        class="btn btn-primary"
    >
        generate new passkey
    </button>
  <div class="mb-3">
    <label for="" class="form-label">change imagekey</label>
    <input
        type="file"
        class="form-control"
        name=""
        id=""
        aria-describedby="helpId"
        placeholder=""
    />
    
  </div>
  
    
    
    </div>
    </>
  )
}

export default Preferences