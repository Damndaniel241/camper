
import React,{useEffect,useState} from 'react';

const NewLoginDetails = ({ newLogin }) => {
    const [imageUrl, setImageUrl] = useState(null);
  

    useEffect(() => {
      if (newLogin.selectedImage) {
        if (newLogin.selectedImage instanceof File) {
          // If selectedImage is a File (local selection)
          setImageUrl(URL.createObjectURL(newLogin.selectedImage));
        } else if (typeof newLogin.selectedImage === "object" && newLogin.selectedImage.urls) {
          // If selectedImage is from online and has 'urls' property
          setImageUrl(newLogin.selectedImage.urls.small);
        }
      }
  
      // Clean up the object URL when the component unmounts or when newLogin.selectedImage changes
      return () => {
        if (imageUrl && typeof imageUrl === 'string') {
          URL.revokeObjectURL(imageUrl);
        }
      };
    }, [newLogin.selectedImage]);


    
  if (!newLogin) {
    return null;
  }



  


  return (
   

    <div className="d-flex flex-column gap-5 ps-5">
                        <div className="d-flex justify-content-between ">
                          <span className="d-flex gap-2  flex-column ">
                            <h5 className="sf-grey">Account Name</h5>
                            <h5>{newLogin.accountName}</h5>
                   
                          </span>
                        </div>

                        <div className="d-flex justify-content-between ">
                          <span className="d-flex gap-2 flex-column ">
                            <h5 clasName="sf-grey">Password</h5>
                          {imageUrl &&   <h5><img src={imageUrl} alt="image password" height="400rem" width="400rem"/></h5>}

<button
type="button"
className="btn btn-primary"
>
Decode
</button>
                          </span>
                        </div>
                      </div>



  );
};

export default NewLoginDetails;