import React, { useState, useRef, useEffect, useCallback } from "react";
import Header from "../components/Header";
import { LuPlus } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { PiGlobeSimple } from "react-icons/pi";
import { FaPencilAlt, FaEye, FaEyeSlash } from "react-icons/fa";

import PasswordValidator from "react-password-validattor";
import axios from "axios";
import { useShowNewEdit } from '../components/ShowNewEditContext';
import { AiFillDelete } from "react-icons/ai";
import { TiExport } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";
import Papa from 'papaparse';

// import Steganographer from 'steganographer';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import Item from "./Item";

import RepositoryDetails from './RepositoryDetails';

const API_URL = "https://api.unsplash.com/search/photos";

const IMAGES_PER_PAGE = 20;

function Main() {
  const [file, setFile] = useState(null);
  const [encodedFile, setEncodedFile] = useState(null);
  const [decodedMessage, setDecodedMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showNewEdit, setShowNewEdit] = useState(false);
  // const { showNewEdit, setShowNewEdit } = useShowNewEdit();
  const [logins, setLogins] = useState([]);
  const [showItem, setShowItem] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [editButton, setEditButton] = useState(true);

  const [activeItem, setActiveItem] = useState(null);
  const editContainerRef = useRef(null);
  const [editMode, setEditMode] = useState(false);

  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");


  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [text, setText] = useState("");
  const [embeddedImage, setEmbeddedImage] = useState(null);
  const [decryptedText, setDecryptedText] = useState("");
  // const [key, setKey] = useState('');
  const [newLogin, setNewLogin] = useState(null);
  const [selectedLogin, setSelectedLogin] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [embeddedImageDataURL, setEmbeddedImageDataURL] = useState('');
  const userID = localStorage.getItem('user_id');

   const [selectedOnlineImageUrl, setSelectedOnlineImageUrl] = useState(''); // For online image URL
   const [repositories, setRepositories] = useState([]);

   const [filteredLogins, setFilteredLogins] = useState([]);
   const [savedItems, setSavedItems] = useState([]);
   const [selectedItemId, setSelectedItemId] = useState(null);


  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEditPasswordVisible, setIsEditPasswordVisible] = useState(false);
  

  const handleDeleteAll = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete all repositories? This action cannot be undone.')) {
        try {
            const response = await axios.delete('https://camper-5tkx.onrender.com/api/repository/delete_all/', {
              headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
              }});
            // alert(response.data.message);
            alert("deleted all repositories!");
            window.location.reload();
            // Optionally, refresh the page or update the state to reflect the changes
        } catch (error) {
            console.error('Error deleting all repositories:', error);
            alert('Failed to delete all repositories. Please try again.');
        }
    }

  }

  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleEditPasswordVisibility = () => {
    setIsEditPasswordVisible(!isEditPasswordVisible);
  };

  const clearLogins = () => {
    setLogins([]);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setActiveItem(activeItem);
    }
  };


  useEffect(() => {
    // Fetch the saved items from the API when the component mounts
    const fetchSavedItems = async () => {
      try {
        const response = await axios.get('https://camper-5tkx.onrender.com/api/repositories/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        setSavedItems(response.data);
      
      } catch (error) {
        console.error('Error fetching saved items:', error);
      }
    };

    fetchSavedItems();
  }, []);

  const toPreferences = () => {
    navigate('/preferences');
  }



  const exportToCSV = () => {
    const csv = Papa.unparse(savedItems);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${username}_saved_items.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

const username = localStorage.getItem('username');
  

//   useEffect(() => {
//     const fetchRepositories = async () => {
//         try {
//             const response = await axios.get('https://camper-5tkx.onrender.com/api/repositories/', {
//                 headers: {
//                     'Authorization': `Token ${localStorage.getItem('token')}`
//                 }
//             });
//             setRepositories(response.data);
//         } catch (error) {
//             console.error('Error fetching repositories:', error);
//         }
//     };

//     fetchRepositories();
// }, []);


// useEffect(() => {
//   // Filter the repositories for the logged-in user
//   const filtered = repositories.filter(repo => repo.user === parseInt(userID, 10));
//   setFilteredLogins(filtered);
// }, [repositories, userID]);



  const handleFormSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('account_name', accountName);
    formData.append('password', password);
    // const username = localStorage.getItem('username');
     const userId = localStorage.getItem('user_id'); 
    formData.append('user', userId);


   

        if (selectedImage instanceof File) {
            formData.append('picture', selectedImage);
        // } else if (selectedImageUrl) {
        //     formData.append('picture_url', selectedImageUrl);
        }else {
      
        alert('Please select a picture.');
        return;
    }




    try {
        // Send data to backend endpoint
        const response = await axios.post('https://camper-5tkx.onrender.com/api/repositories/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization':`Token ${localStorage.getItem('token')}`
            },
                    
        });

        // Handle success response
     ;
        alert('Repository added successfully.');

        const newRepository = response.data;

        // Update the filteredLogins state directly
        // setFilteredLogins(prevFilteredLogins => [...prevFilteredLogins, newRepository]);
        setSavedItems((prevSavedItems) => [...prevSavedItems, newRepository]);
        setShowForm(false);
    
        setShowEdit(true);
        setShowNewEdit(false);
    
    } catch (error) {
        // Handle error response
        console.error('Error:', error);
        alert('An error occurred while saving data.');
    }




    
  };




 
  
  const removeActiveItem = () => {
    if (activeItem) {
      const updatedLogins = logins.filter(
        (login) => login.itemId !== activeItem
      );
      setLogins(updatedLogins);
      setActiveItem(null);
    }
  };


 

  const handleNewEditClick = () => {
    setShowNewEdit(true);
    setShowForm(true);
    setShowEdit(false);
    setAccountName("");
    setPassword("");
    setSelectedImage(null);
    setImages([]);
    setTotalPages(null);
    setSelectedItemId(null);
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
    // console.log(newPassword);
    setPassword(newPassword);
  };

  const searchInput = useRef(null);

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setErrorMsg("");
        
        const { data } = await axios.get(
          `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${process.env.REACT_APP_API_KEY}`
        );

        setImages(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      setErrorMsg("Error fetching images. Try again soon");
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);



  const resetSearch = () => {
    fetchImages();
    setPage(1);
  };


  const handleSearch = (event) => {
    event.preventDefault();
    // console.log(searchInput.current.value);
    resetSearch();
  };


  const fileToBlob = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsArrayBuffer(file);
    });
  };


  const convertFileToBlob = async (file) => {
    const blob = await fileToBlob(file);
    return new Blob([blob], { type: file.type });
  };

  // ...

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    convertFileToBlob(file).then((blob) => setSelectedImage(blob));
  };

  const getSelectedImageUrl = (image) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else if (typeof image === "object" && image.hasOwnProperty("urls")) {
      return image.urls.small;
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (selectedImage instanceof File) {
      const url = URL.createObjectURL(selectedImage);
     
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedImage]);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = savedItems.filter(item =>
    item.account_name.toLowerCase().includes(searchQuery.toLowerCase())
  );


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



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setSelectedImageUrl('');
    };


  const handleImageUrlChange = async (url) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], "downloaded_image.jpg", { type: blob.type });
        setSelectedImage(file); // Set the downloaded image as a file
        setSelectedImageUrl(''); // Clear the URL as we now have the file
    } catch (error) {
        console.error('Error downloading the image:', error);
        alert('Failed to download the image.');
    }
};






  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
    setShowNewEdit(false);
    // setEditMode(false);
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
                  value={searchQuery}
                  onChange={handleSearchChange}
                
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
    

{filteredItems.length === 0 ? (
          <div>
            <p>No logins found. When you save a password, it will show up here</p>
          </div>
        ) : (
          <>
            {filteredItems.map((login, index) => (
              <Item
                key={index}
                accountName={login.account_name}
                // onClick={() => console.log(`Item ${index} clicked`)}
                onClick={() => handleItemClick(login.id)}
              />
            ))}
          </>
        )}

           

            
          </div>
        </div>

        <div className="edit">
          <div className="d-flex dropdown justify-content-end align-items-center  p-3">
            
            <div
             data-bs-toggle="dropdown"
            className="grey-background p-2 rounded-5"
              aria-expanded="false"
              style={{cursor:"pointer"}}>
              <BsThreeDots />
              </div>
          
            <ul class="dropdown-menu">
              <li>
                
                <div
                
                  className="dropdown-item d-flex align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                  onClick={handleDeleteAll}
                  
                >
                  < AiFillDelete/>
                  Remove All Accounts
                </div>
              </li>
              <li>
                <div className="dropdown-item d-flex align-items-center gap-2" onClick={ exportToCSV} style={{ cursor: "pointer" }}>
                  <TiExport/>
                  Export Accounts
                </div>
              </li>
              <li>
                <div className="dropdown-item d-flex align-items-center gap-2" onClick={toPreferences} style={{ cursor: "pointer" }} >
                  <IoMdSettings/>
                  Preferences
                </div>
              </li>
              <li>
                <div
                 
                  className="dropdown-item d-flex align-items-center gap-2 "
                  style={{ cursor: "pointer" }}
                  // data-bs-toggle="modal"
                  // data-bs-target="#modalId2"
                  onClick={logout}
                >
                  < RiLogoutCircleRLine/>
                  Logout
                </div>
              </li>
            </ul>
          </div>

          {showForm && (
            <div>
              {showNewEdit && (
                <div className="mx-3">
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
                        name="account_name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        id=""
                        aria-describedby="helpId"
                        placeholder=""
                      />
                    </div>

                    <div className="mb-3 d-flex flex-column gap-2 ">
                    <label for="" className="form-label">
                        Password
                      </label>
                      <div className="d-flex ">
                    
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        className="form-control form-control-sm"
                        name="password"
                        id=""
                        aria-describedby="helpId"
                        placeholder=""
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />

   
<span className="password-toggle  align-self-center " onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? (
                        <FaEye/>
                        ) : (
                        <FaEyeSlash/>
                        )}
                        </span>
</div>
</div>

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
                        className="btn btn-primary align-self-start my-3"
                        onClick={(e) => {
                          e.preventDefault();
                          generatePassword();
                        }}
                      >
                        Generate Password
                      </button>
                     
                    

                    <div class="mb-3">
                      <label for="" class="form-label">
                        Select a picture locally
                      </label>
                      <input
                        type="file"
                        class="form-control form-control-sm"
                        // name="picture"
                        id=""
                        accept="image/*"
                        aria-describedby="helpId"
                        placeholder=""
                        onChange={handleImageChange}
                      />
                   

                    </div>

                    <p>or search for a picture online</p>
                    {/* {errorMsg && <p className="text-danger my-3">{errorMsg}</p>} */}
                    <div class="mb-3 d-flex gap-2">
                      <input
                        type="text"
                        class="form-control"
                        // name="picture_url"
                        id=""
                        aria-describedby="helpId"
                        placeholder="Type something to search..."
                        ref={searchInput}
                  onBlur={(e) => handleImageUrlChange(e.target.value)}
                        //  onChange={handleImageUrlChange} 
                      />

                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </div>

                    <div className="d-flex flex-column">
                      <div className="images container my-4">
                         <div className="row gx-3 gy-3">
                         {images.map((image) => {
                            return (
                              <div
                                className="col-3 rounded-2"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  key={image.id}
                                  src={image.urls.small}
                                  alt={image.alt_description}
                                  className="image"
                                  // onClick={() => setSelectedImage(image)}
                                   onClick={() => handleImageUrlChange(image.urls.small)}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="buttons align-self-center d-flex gap-3">
                        {page > 1 && (
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => setPage(page - 1)}
                          >
                            Previous
                          </button>
                        )}
                        {page < totalPages && (
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => setPage(page + 1)}
                          >
                            Next
                          </button>
                        )}
                      </div>
                      
                      {selectedImage && (
                         <img src={getSelectedImageUrl(selectedImage)} alt="loading images..."
                                      height="400rem"
                                      width="400rem"
                                      className="my-5 align-self-center "
                                    />
                                  )}


                    </div>

                    <div className="d-flex justify-content-end align-items-center mb-3 ">
                      <button
                        type="button"
                        className="btn bg-grey text-black mx-3"
                        onClick={() => setShowNewEdit(false)}
                      >
                        Cancel
                      </button>

                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}


       



{selectedItemId && (
        <div id="details">
          <RepositoryDetails itemID={selectedItemId}  />
        </div>
      )}

        </div>
      </div>
    </>
  );
}

export default Main;
