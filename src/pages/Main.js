import React, { useState, useRef, useEffect, useCallback } from "react";
import Header from "../components/Header";
import { LuPlus } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { PiGlobeSimple } from "react-icons/pi";
import { FaPencilAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import PasswordValidator from "react-password-validattor";
import axios from "axios";


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

import NewLoginDetails from './NewLoginDetails';

const API_URL = "https://api.unsplash.com/search/photos";

const IMAGES_PER_PAGE = 20;

function Main() {
  const [file, setFile] = useState(null);
  const [encodedFile, setEncodedFile] = useState(null);
  const [decodedMessage, setDecodedMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showNewEdit, setShowNewEdit] = useState(false);
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

  const { createCanvas, loadImage, ImageData } = require("canvas");
  const { xorWith } = require("lodash"); // For simple encryption, you can use a library like lodash

  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState("");
  const [embeddedImage, setEmbeddedImage] = useState(null);
  const [decryptedText, setDecryptedText] = useState("");
  // const [key, setKey] = useState('');
  const [newLogin, setNewLogin] = useState(null);
  const [selectedLogin, setSelectedLogin] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [embeddedImageDataURL, setEmbeddedImageDataURL] = useState('');
  // const loginKey = `login-${accountName}`;


  const handleItemClick = () => {
    setActiveItem(accountName);
    // setSelectedLogin(login);
    if (editContainerRef.current) {
      editContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setEditMode(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // const handleNewLogin = (itemId) => {
  //   // const updatedLogins = [...logins, newLogin];
  //   // localStorage.setItem('logins', JSON.stringify(updatedLogins));
  //   console.log(`Item clicked: ${itemId}`);
  //   if (editContainerRef.current) {
  //     editContainerRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  //   setEditMode(false);
  // };


  const filteredLogins = logins.filter((login) =>
  login.accountName.toLowerCase().includes(searchQuery.toLowerCase())
);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEditPasswordVisible, setIsEditPasswordVisible] = useState(false);
  
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    // setShowItem(true);
    setShowEdit(true);
    setShowNewEdit(false);

    const newLogin = {
      id: logins.length + 1, // You may need an id for each login item
      accountName: accountName,
      password: password,
      selectedImage: selectedImage,
    };

    setLogins([...logins, newLogin]);

    setNewLogin(newLogin);
    
    // localStorage.setItem(loginKey, JSON.stringify(newLogin));

    console.log(logins);
  };


  const handleLoadLogin = (login) => {
    setSelectedLogin(login);
  };

  // useEffect(() => {
  //  const storedNewLogin = localStorage.getItem(loginKey);
  //    const newLogin = storedNewLogin ? JSON.parse(storedNewLogin) : null;

  //   if (newLogin) {
  //     setNewLogin(newLogin);
  //   }
  // }, []);
  
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
    console.log(searchInput.current.value);
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
      // return () => URL.createObjectURL(selectedImage);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedImage]);

  // Function to encrypt text
  function encrypt(text, key) {
    // Simple XOR encryption
    return xorWith(text, key, (a, b) => a.charCodeAt(0) ^ b.charCodeAt(0));
  }

  // Function to decrypt text
  function decrypt(encryptedText, key) {
    // Simple XOR decryption
    return xorWith(encryptedText, key, (a, b) =>
      String.fromCharCode(a ^ b.charCodeAt(0))
    ).join("");
  }

  ///Function to embed encrypted text into image 
  async function embedTextInImage(imageFile, text, key) {
    const image = await loadImage(imageFile);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const encryptedText = encrypt(text, key);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Embed encrypted text into image data
    for (let i = 0; i < encryptedText.length; i++) {
      data[i] = encryptedText.charCodeAt(i);
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };








async function extractTextFromImage(imageFile, key) {
  const image = await loadImage(imageFile);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Extract encrypted text from image data
  let encryptedText = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i]!== 0) {
      encryptedText += String.fromCharCode(data[i]);
    } else {
      break; // Assuming text ends with a null character
    } 
  }

}

 
 

const embedText = async () => {
  if (!selectedImage || !text) return;

  try {
    const reader = new FileReader();
    reader.onload = async () => {
      const imageDataUrl = reader.result;
      const embeddedImageDataURL = await embedTextInImage(imageDataUrl, text, 'mySecretKey');
      setEmbeddedImage(embeddedImageDataURL); // Set the Data URL as the embedded image
    };
    reader.readAsDataURL(selectedImage);
  } catch (error) {
    console.error('Error embedding text:', error);
  }
};





// const extractText = async () => {
//     if (!selectedImage) return;

//     try {
//         const reader = new FileReader();
//         reader.onload = async () => {
//             const imageDataUrl = reader.result;
//             console.log(imageDataUrl);
//             const extractedText = await extractTextFromImage(imageDataUrl, 'mySecretKey');
//             setDecryptedText(extractedText); 
//             console.log(extractedText);
//         };
//         reader.readAsDataURL(selectedImage);
//     } catch (error) {
//         console.error('Error extracting text:', error);
//     }
// };

//2 trail
// const extractText = async () => {
//   if (!selectedImage) return;

//   try {
//       const extractedText = await extractTextFromImage(selectedImage, 'mySecretKey');
//       setDecryptedText(extractedText);
//   } catch (error) {
//       console.error('Error extracting text:', error);
//   }
// };

const extractText = async () => {
  if (!selectedImage) return;

  try {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedImage);
      fileReader.onload = async () => {
          const dataUrl = fileReader.result;
          const extractedText = await extractTextFromImage(dataUrl, 'mySecretKey');
          setDecryptedText(extractedText);
          console.log(dataUrl);
          console.log(extractedText);
          console.log(decryptedText);
      };
  } catch (error) {
      console.error('Error extracting text:', error);
  }
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
            {/* {showItem && ( */}

            {filteredLogins.length === 0 ? (
              <div>
                <p>
                  No logins found. When you save a password in Camper, it will
                  show up here
                </p>
              </div>
            ) : (
              <>
                {filteredLogins.map((login, index) => (
                  <Item
                    key={index}
                    
                    accountName={login.accountName}
                    password={login.password}
                    // itemId={index}
                    onClick={handleItemClick}
                    // onClick={() => handleItemClick(login.accountName)}
                  />
                ))}
              </>
            )}

            {/* )} */}
          </div>
        </div>

        <div className="edit">
          <div className="d-flex dropdown justify-content-end align-items-center  p-3">
            <button
              type="button"
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BsThreeDots />
            </button>
            <ul class="dropdown-menu">
              <li>
                <div
                  onClick={clearLogins}
                  class="dropdown-item"
                  style={{ cursor: "pointer" }}
                  href="#"
                >
                  Remove All Accounts
                </div>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Export Accounts
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Preferences
                </a>
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
                        type={isPasswordVisible ? "text" : "password"}
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
                     
                    </div>

                    <div class="mb-3">
                      <label for="" class="form-label">
                        Select a picture locally
                      </label>
                      <input
                        type="file"
                        class="form-control form-control-sm"
                        name=""
                        id=""
                        accept="image/*"
                        aria-describedby="helpId"
                        placeholder=""
                        onChange={handleImageChange}
                      />
                      <div className="d-flex gap-2 flex-column ">
                       

                       


                        {embeddedImage && (
                          <img
                         
                            // src={URL.createObjectURL(new Blob([embeddedImage]))}
                            alt="Embedded Image"
                            src={embeddedImage}
                           
                          />
                        )}
                       
                       
                        {decryptedText && (
                          <p>Decrypted Text: {decryptedText}</p>
                        )}
                      </div>
                    </div>

                    <p>or search for a picture online</p>
                    {errorMsg && <p className="text-danger my-3">{errorMsg}</p>}
                    <div class="mb-3 d-flex gap-2">
                      <input
                        type="text"
                        class="form-control"
                        name=""
                        id=""
                        aria-describedby="helpId"
                        placeholder="Type something to search..."
                        ref={searchInput}
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
                                  onClick={() => setSelectedImage(image)}
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
                        
                        <img
                          src={getSelectedImageUrl(selectedImage)}
                          alt="Selected Image"
                          height="400rem"
                          width="400rem"
                          className="my-5 align-self-center "
                        />
                      )}
                    </div>

                    <div className="d-flex justify-content-end align-items-center ">
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

          {showEdit && (
            <>
              {activeItem && (
                <div
                  id="edit-container"
                  // className="d-flex justify-content-evenly p-5"
                  ref={editContainerRef}
                >
                  {editMode ? (
                    <div className="container">
                      <div className="d-flex mb-3 justify-content-between">
                        <h1 className="me-5 gap-2 d-flex">
                          <PiGlobeSimple />
                          <span>{activeItem}</span>
                        </h1>

                        <div
                          className="p-1 px-3 hover-grey rounded-1 d-flex align-items-center gap-1"
                          onClick={removeActiveItem}
                        >
                          <RiDeleteBin6Fill />
                          <span>Remove</span>
                        </div>
                      </div>

                      <div class="mb-3">
                        <label for="" class="form-label">
                          Account Name
                        </label>
                        <input
                          type="text"
                          class="form-control form-control-sm"
                          name=""
                          id=""
                          onChange={(e) => setAccountName(e.target.value)}
                          aria-describedby="helpId"
                          placeholder=""
                        />
                      </div>

                      <div class="mb-3 d-flex gap-1">
                        <label for="" class="form-label d-block">
                          Password
                        </label>
                        <input
                          type={isEditPasswordVisible ? 'text' : 'password'}
                          class="form-control form-control-sm"
                          name=""
                          id=""
                          onChange={() => setPassword({ password })}
                          value={password}
                          aria-describedby="helpId"
                          placeholder=""
                        />
                        <span className="password-toggle align-self-center" onClick={toggleEditPasswordVisibility}>
        {isEditPasswordVisible ? (
          <FaEye/>
        ) : (
          <FaEyeSlash/>
        )}
      </span>
                      </div>
                      <div className="d-flex mb-3 justify-content-end align-items-end flex-column">
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

                      <div className="d-flex gap-4">
                        <div
                          className="p-1 px-3 bg-grey text-black btn rounded-1 d-flex align-items-center gap-1"
                          onClick={() => setEditMode(false)}
                        >
                          <span>Cancel</span>
                        </div>
                        <div
                          className="p-1 px-3 btn btn-primary  rounded-1 d-flex align-items-center gap-1"
                          onClick={handleFormSubmit}
                        >
                          <span>Save Changes</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="d-flex justify-content-evenly p-5">
                        <h1 className="me-5 gap-2 d-flex">
                          <PiGlobeSimple />
                          <span>{activeItem}</span>
                        </h1>

                        <div className="d-flex align-items-center  gap-4">
                          <div
                            className="p-1 px-3 hover-grey rounded-1 d-flex align-items-center gap-1"
                            onClick={toggleEditMode}
                          >
                            <FaPencilAlt /> <span>Edit</span>
                          </div>
                          <div
                            className="p-1 px-3 hover-grey rounded-1 d-flex align-items-center gap-1"
                            onClick={removeActiveItem}
                          >
                            <RiDeleteBin6Fill />
                            <span>Remove</span>
                          </div>
                        </div>
                      </div>

                      {/* <div className="d-flex flex-column gap-5 ps-5">
                        <div className="d-flex justify-content-between ">
                          <span className="d-flex gap-2  flex-column ">
                            <h5 className="sf-grey">Account Name</h5>
                            <h5>{activeItem}</h5>
                   
                          </span>
                        </div>

                        <div className="d-flex justify-content-between ">
                          <span className="d-flex gap-2 flex-column ">
                            <h5 clasName="sf-grey">Password</h5>
                            <h5>Chicago241@@$$</h5>
                          </span>
                        </div>
                      </div> */}

{newLogin && <NewLoginDetails newLogin={newLogin} />}

                      
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
