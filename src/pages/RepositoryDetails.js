import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash  } from "react-icons/fa";
;

const RepositoryDetails = ({ itemID }) => {
    const [repository, setRepository] = useState(null);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [userData, setUserData] = useState(null);
    const [answers, setAnswers] = useState({});
    const [passkey, setPasskey] = useState('');
    const [imageKey, setImageKey] = useState(null);
    const [message, setMessage] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
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


  
       
        useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/`, {
                        headers: {
                            'Authorization': `Token ${localStorage.getItem('token')}`
                        }
                    });
                    setUserData(response.data);
                    console.log(response.data);
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
      
        // const handleImageChange = (e) => {
        //     const file = e.target.files[0];
        //     if (file) {
        //         const imageUrl = URL.createObjectURL(file);
        //         setImageKey(file);
        //         setImagePreviewUrl(imageUrl);
        //         console.log(imageUrl);
        //     }
        // }

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

        
    

    if (!repository) {
        return <p>Loading...</p>;
    }



    return (
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
{/* 
            <button
                type="button"
                class="btn btn-primary mb-3"
                // onclick={fetchUserData}
            >
                get details
            </button> */}
            


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
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">
                    decrypt image
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
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
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Close
                </button>
                {/* <button type="button" class="btn btn-primary">Save</button> */}
            </div>
        </div>
    </div>
</div>

        </div>
    );
};

export default RepositoryDetails;







