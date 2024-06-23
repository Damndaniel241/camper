import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ImageKey = () => {
    const [imageFile, setImageFile] = useState(null);
    const [verificationResult, setVerificationResult] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const navigate = useNavigate();


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

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
        const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviewUrl(reader.result);
                
                };
                reader.readAsDataURL(file);
            }
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

    
  

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await axios.post('https://camper-5tkx.onrender.com/api/one_time_image_keys/', formData, {
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
           
            {imagePreviewUrl && (
    <div className="mb-3">
        <label className="form-label">Image Preview</label>
        <img src={imagePreviewUrl} alt="Image Preview" style={{ width: '100%', height: 'auto' }} />
    </div>
)}
          
        </div>
        </>
    );
};

export default ImageKey;
