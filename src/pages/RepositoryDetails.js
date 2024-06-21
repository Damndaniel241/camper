import React, { useEffect, useState,useRef, useCallback } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash,FaPencilAlt  } from "react-icons/fa";
import { PiGlobeSimple } from "react-icons/pi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import PasswordValidator from "react-password-validattor";
import { useShowNewEdit } from '../components/ShowNewEditContext';
import { IoIosWarning } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";


const API_URL = "https://api.unsplash.com/search/photos";

const IMAGES_PER_PAGE = 20;



const RepositoryDetails = ({ itemID}) => {
    const [repository, setRepository] = useState(null);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [userData, setUserData] = useState(null);
    const [answers, setAnswers] = useState({});
    const [passkey, setPasskey] = useState('');
    const [imageKey, setImageKey] = useState(null);
    const [message, setMessage] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [password,setPassword]  = useState("");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [isEditPasswordVisible, setIsEditPasswordVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [images, setImages] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [accountName, setAccountName] = useState("");
    
    // const { setShowNewEdit } = useShowNewEdit();

    // useEffect(() => {
    //     setShowNewEdit(!showNewEdit);
    //   }, [setShowNewEdit]);

    // useEffect(() => {
    //   setShowNewEdit(false);
    // }, [setShowNewEdit]);
    
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



    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    
    const toggleEditPasswordVisibility = () => {
        setIsEditPasswordVisible(!isEditPasswordVisible);
      };
    
        

    const userId = localStorage.getItem('user_id');


    useEffect(() => {
        const fetchRepositoryDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/repositories/${itemID}/`, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                setRepository(response.data);
                // console.log(response.data)
            } catch (error) {
                console.error('Error fetching repository details:', error);
            }
        };

        fetchRepositoryDetails();
    }, [itemID]);


    const handleEditSubmit = async (event) => {
      event.preventDefault();
      try {
          const formData = new FormData();
          formData.append('account_name', accountName);
          formData.append('password', password);
          formData.append('user', userId);
          if (selectedImage  instanceof File) {
              formData.append('picture', selectedImage);
          }else {
      
            alert('Please select a picture.');
            return;
        }
    

          await axios.put(`http://127.0.0.1:8000/api/repositories/${itemID}/`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization':`Token ${localStorage.getItem('token')}`
              }
          });

          alert('Repository updated successfully!');
          setEditMode(false);
          window.location.reload();
          // Optionally, redirect or perform other actions after successful update
      } catch (error) {
          console.error('Error updating repository:', error);
          alert('Failed to update repository. Please try again.');
      }
  };

  
       
        useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/`, {
                        headers: {
                            'Authorization': `Token ${localStorage.getItem('token')}`
                        }
                    });
                    setUserData(response.data);
                    // console.log(response.data);
                    const shuffledQuestions = response.data.security_questions.sort(() => 0.5 - Math.random());
                    setSelectedQuestions(shuffledQuestions.slice(0, 3));
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
    
            fetchUserData();
        }, []);


        const handleInputChange = (e, index) => {
            const { value } = e.target;
            setAnswers({ ...answers, [index]: value });
        };
    

        const compareImages = (image1, image2) => {
            return new Promise((resolve) => {
                const img1 = new Image();
                const img2 = new Image();

                img1.crossOrigin = "anonymous"; // To avoid cross-origin issues
                img2.crossOrigin = "anonymous"; // To avoid cross-origin issues

    
                img1.src = image1;
                img2.src = image2;
    
                img1.onload = () => {
                    img2.onload = () => {
                        const canvas1 = document.createElement('canvas');
                        const canvas2 = document.createElement('canvas');
    
                        canvas1.width = img1.width;
                        canvas1.height = img1.height;
                        canvas2.width = img2.width;
                        canvas2.height = img2.height;
    
                        const ctx1 = canvas1.getContext('2d');
                        const ctx2 = canvas2.getContext('2d');
    
                        ctx1.drawImage(img1, 0, 0, img1.width, img1.height);
                        ctx2.drawImage(img2, 0, 0, img2.width, img2.height);
    
                        const imgData1 = ctx1.getImageData(0, 0, img1.width, img1.height).data;
                        const imgData2 = ctx2.getImageData(0, 0, img2.width, img2.height).data;
    
                        const areImagesEqual = compareImageData(imgData1, imgData2);
                        resolve(areImagesEqual);
                    };
                };
            });
        };

        const compareImageData = (data1, data2) => {
            if (data1.length !== data2.length) return false;
    
            for (let i = 0; i < data1.length; i++) {
                if (data1[i] !== data2[i]) return false;
            }
    
            return true;
        };


        const handleSubmit = async (e) => {
            e.preventDefault();
    
            // Check if all fields are filled
            if (!passkey || !imageKey || Object.keys(answers).length < 3) {
                setMessage('Fill all fields');
            setTimeout(() => {
                alert('Fill all fields');
            }, 0);
                return;
            }
    
            // Verify answers
            const correctAnswers = selectedQuestions.every((q, index) => q.answer === answers[index]);
            // console.log(correctAnswers);
            // console.log( userData.passkey.passkey === passkey);
    
         

            try{

                let imageComparisonResult = false;
                if (imageKey) {
                    const image1 = userData.imagekey.image;  // Use the URL directly
                    const image2 = URL.createObjectURL(imageKey);
                    imageComparisonResult = await compareImages(image1, image2);
                    // console.log(imageComparisonResult);
                }
            if (correctAnswers && userData.passkey.passkey === passkey && imageComparisonResult) {
                setMessage('Verification Successful');
                setTimeout(() => {
                    alert('Verification Successful');
                    alert(`Your password is: ${repository.password}`);
                    window.location.reload();
                }, 0);
            } else {
                setMessage('Verification Unsuccessful');
                setTimeout(() => {
                    alert('Verification Unsuccessful');
                }, 0);
            }
           
            } catch (error) {
                console.error('Error verifying :', error);
            setMessage('Verification Unsuccessful');
            setTimeout(() => {
                alert('Verification Unsuccessful');
            }, 0);
        }

            
        };
      
    

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviewUrl(reader.result);
                    setImageKey(file);
                };
                reader.readAsDataURL(file);
            }
        };

        const toggleEditMode = () => {
            setEditMode(!editMode);
            // setAccountName(repository.accountName);
            // setSelectedImage(repository.picture);
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


  const handleDelete = async () => {
    try {
        await axios.delete(`http://127.0.0.1:8000/api/repositories/${itemID}/`,{
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
      }});
        alert('Repository deleted successfully!');
        window.location.reload();
        // Optionally, redirect or perform other actions after successful deletion
    } catch (error) {
        console.error('Error deleting repository:', error);
        alert('Failed to delete repository. Please try again.');
    }
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



    if (!repository) {
        return <p>Loading...</p>;
    }



    return (
        <>

{editMode ? (<>
        <div className="mx-5 d-flex mb-3 justify-content-between">
            <div className="me-5 gap-2 d-flex align-items-center">
                          <PiGlobeSimple />
                          <span className='text-capitalize'>{repository.account_name}</span>
                        </div>

                        <div
                          className="p-1 px-3 hover-grey rounded-1 d-flex align-items-center gap-1"
                         data-bs-toggle="modal"
                              data-bs-target="#deleteId2"
                        >
                          <RiDeleteBin6Fill />
                          <span
                         
                          >Remove</span>
                        </div>

                        <div
                              class="modal fade"
                              id="deleteId2"
                              tabindex="-1"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              
                              role="dialog"
                              aria-labelledby="modalTitleId"
                              aria-hidden="true"
                            >
                              <div
                                class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
                                role="document"
                              >
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="modalTitleId">
                                      Delete Repository
                                    </h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    > <RxCross1 /></button>
                                  </div>
                                  <div class="modal-body"><IoIosWarning />Warning: You are about to delete your repository. Are you sure you want to proceed?</div>
                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      No
                                    </button>
                                    <button type="button" onClick={handleDelete} class="btn btn-primary">yes</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                  
                            <script>
                              const myModal = new bootstrap.Modal(
                                document.getElementById("deleteId2"),
                                options,
                              );
                            </script>

                      </div>

                      <div className='mx-4'>
                        <form onSubmit={handleEditSubmit}>
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
                          // value={repository.accountName}
                        />
                      </div>

                      <div class="mb-3  ">
                        
                        <label for="" class="form-label">
                          Password
                        </label>

                        <div className="d-flex  ">
                        <input
                          type={isEditPasswordVisible ? 'text' : 'password'}
                          class="form-control form-control-sm"
                          name=""
                          id=""
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          aria-describedby="helpId"
                          placeholder=""
                        />
                        
                        <span className="password-toggle  align-self-center " onClick={toggleEditPasswordVisibility}>
                        {isEditPasswordVisible ? (
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


                      <div className="d-flex my-3 justify-content-end align-items-end flex-column">
                        <button
                          className="btn btn-primary align-self-start"
                          onClick={(e) => {
                            e.preventDefault();
                            generatePassword();
                          }}
                        >
                          Generate Password
                        </button>
                        {/* <p className="align-self-start">{password}</p> */}
                      </div>

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

                    <p className='mb-2'>or search for a picture online</p>
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



                      <div className="d-flex justify-content-end gap-4 mb-3">
                        <div
                          className="p-1 px-3 bg-grey text-black btn rounded-1 d-flex align-items-center gap-1"
                          onClick={() => setEditMode(false)}
                        >
                          <span>Cancel</span>
                        </div>
                   
                          {/* <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button> */}

                       
                          <button
                            type="button"
                            class="btn btn-primary btn-lg"
                            data-bs-toggle="modal"
                            data-bs-target="#updateId"
                          >
                            Save Changes
                          </button>
                          
                        
                          <div
                            class="modal fade"
                            id="updateId"
                            tabindex="-1"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            
                            role="dialog"
                            aria-labelledby="modalTitleId"
                            aria-hidden="true"
                          >
                            <div
                              class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
                              role="document"
                            >
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="modalTitleId">
                                    Update your repository
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  > <RxCross1 /></button>
                                </div>
                                <div class="modal-body">Are you sure you want to make changes?</div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    No
                                  </button>
                                  <button type="submit" class="btn btn-primary">Yes</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                         
                          <script>
                            const myModal = new bootstrap.Modal(
                              document.getElementById("updateId"),
                              options,
                            );
                          </script>
                          
                      </div>
                      </form>
                      </div>
                    </>

                        ):(<>
                         <div className="d-flex justify-content-evenly p-5">
                        <div className="me-5 gap-2 d-flex align-items-center">
                          <PiGlobeSimple />
                          <span>{repository.account_name}</span>
                        </div>

                        <div className="d-flex align-items-center  gap-4">
                          <div
                            className="p-1 px-3 hover-grey rounded-1 d-flex align-items-center gap-1"
                            onClick={toggleEditMode}
                          >
                            <FaPencilAlt /> <span>Edit</span>
                          </div>
                          <div
                            className="p-1 px-3 hover-grey rounded-1 d-flex align-items-center gap-1"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteId"
                          >
                            <RiDeleteBin6Fill />
                            <span
                          
                            >Remove</span>
                       
                          
                
                            <div
                              class="modal fade"
                              id="deleteId"
                              tabindex="-1"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              
                              role="dialog"
                              aria-labelledby="modalTitleId"
                              aria-hidden="true"
                            >
                              <div
                                class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
                                role="document"
                              >
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="modalTitleId">
                                      Delete Repository
                                    </h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ><RxCross1 /></button>
                                  </div>
                                  <div class="modal-body"><IoIosWarning style={{color:"red"}} />Warning: You are about to delete your repository. Are you sure you want to proceed?</div>
                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      No
                                    </button>
                                    <button type="button" onClick={handleDelete} class="btn btn-primary">yes</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                  
                            <script>
                              const myModal = new bootstrap.Modal(
                                document.getElementById("deleteId"),
                                options,
                              );
                            </script>
                            
                          </div>
                        </div>
                      </div>










        <div className='ms-5'>
            {/* <h2>Repository Details</h2> */}
            <div className='d-flex flex-column'>
            <p><strong>Account Name</strong></p><p> {repository.account_name}</p>
            </div>
            <div className='d-flex flex-column mt-3'>
            <p><strong>Password</strong></p>
            {/* <p> {repository.password}</p> */}
            <div className=''>
            {repository.picture && (
                <img
                    // src={URL.createObjectURL(new Blob([repository.picture]))}
                    src={repository.picture}
                    alt="Repository"
                    height="400rem"
                    width="400rem"
                    className="my-3 align-self-center"
                />
            )}
             </div>
             </div>



            


<button
    type="button"
    class="btn btn-primary btn-lg mb-3"
    data-bs-toggle="modal"
    data-bs-target="#modalId"
>
    decrypt image
</button>


<div
    class="modal fade"
    id="modalId"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalTitleId"
    aria-hidden="true"
>
    <div
        class="modal-dialog modal-sm modal-fullscreen"
        role="document"
    >
        <div class="modal-content">
            <div class="modal-header d-flex justify-content-between">
                <h5 class="modal-title" id="modalTitleId">
                    decrypt image
                </h5>
               
                <button
                    type="button"
                    class="btn btn-close"
                    data-bs-dismiss="modal"
                    aria-label='Close'
                    style={{color:"black"}}
                >
                  <RxCross1 />
                </button>
            </div>
            <div class="modal-body">
                {/* {repository.password} */}

                <div className="container mt-5">
            {/* <h1>User Verification</h1> */}
            {/* {message && <div className={`alert mt-3 ${message === 'Verification Successful' ? 'alert-success' : 'alert-danger'}`}>{message}</div>} */}
            <form onSubmit={handleSubmit}>
                {selectedQuestions.map((question, index) => (
                    <div className="mb-3" key={index}>
                        <label className="form-label">{question.question}</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => handleInputChange(e, index)}
                        />
                    </div>
                ))}
                
                    <label className="form-label">Passkey</label>
                    <div className="mb-3 d-flex gap-2">
                    <input
                         type={isPasswordVisible ? 'text' : 'password'}
                        className="form-control"
                        value={passkey}
                        onChange={(e) => setPasskey(e.target.value)}
                    />
                     <span className="password-toggle align-self-center" onClick={togglePasswordVisibility}>
        {isPasswordVisible ? (
          <FaEye/>
        ) : (
          <FaEyeSlash/>
        )}
      </span>
                </div>
                <div className="mb-3">
                    <label className="form-label">Image Key URL</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        // value={imageKey}
                        // onChange={(e) => setImageKey(e.target.value)}
                        onChange={(e) => handleImageChange(e)}
                    />
                </div>

                {imagePreviewUrl && (
    <div className="mb-3">
        <label className="form-label">Image Preview</label>
        <img src={imagePreviewUrl} alt="Image Preview" style={{ width: '100%', height: 'auto' }} />
    </div>
)}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>



           
        </div>
            </div>
           
        </div>
    </div>
</div>

        </div>

        </>
             )}

             
        </>
    );
};

export default RepositoryDetails;







