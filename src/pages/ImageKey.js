import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ImageKey = () => {
    const [imageFile, setImageFile] = useState(null);
    const [verificationResult, setVerificationResult] = useState(null);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await axios.post('camper-5tkx.onrender.com/api/one_time_image_keys/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            alert('Image key created successfully');
            navigate('/main')

        } catch (error) {
            console.error('Error uploading image:', error.response.data);
        }
    };


    //HANDLE IMAGE VERIFICATION
    // const handleImageVerification = async () => {
    //     const formData = new FormData();
    //     formData.append('image', imageFile);

    //     try {
    //         const response = await axios.post('camper-5tkx.onrender.com/api/verify_image/', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'Authorization': `Token ${localStorage.getItem('token')}`
    //             }
    //         });
    //         setVerificationResult(response.data.success ? 'Verification successful' : 'Verification failed');
    //     } catch (error) {
    //         console.error('Error verifying image:', error.response.data);
    //         setVerificationResult('Verification failed');
    //     }
    // };


    // <button onClick={handleImageVerification}>Verify Image Key</button>
    // {verificationResult && <p>{verificationResult}</p>}
    return (<>
        <div classNAme="justify-content-center align-items-center height-100vh">
            <h1>One Time Image Key</h1>
            {/* <input type="file" onChange={handleFileChange} /> */}
            <div class="mb-3">
                      <label for="" class="form-label">
                        Select a picture from your system
                      </label>
                      <input
                        type="file"
                        class="form-control form-control-sm"
                       
                        id=""
                        accept="image/*"
                        aria-describedby="helpId"
                        placeholder=""
                        onChange={handleFileChange}
                      />
                   

                    </div>
          
            <button type="button" className="btn btn-primary" onClick={handleImageUpload}>Upload Image Key</button>
            
          
        </div>
        </>
    );
};

export default ImageKey;
