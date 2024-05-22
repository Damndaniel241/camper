import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RepositoryDetails = ({ itemID }) => {
    const [repository, setRepository] = useState(null);


    useEffect(() => {
        const fetchRepositoryDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/repositories/${itemID}/`, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                setRepository(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching repository details:', error);
            }
        };

        fetchRepositoryDetails();
    }, [itemID]);

    if (!repository) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Repository Details</h2>
            <p><strong>Account Name:</strong> {repository.account_name}</p>
            <p><strong>Password:</strong> {repository.password}</p>
            {repository.picture && (
                <img
                    src={URL.createObjectURL(new Blob([repository.picture]))}
                    // src={repository.picture}
                    alt="Repository"
                    height="400rem"
                    width="400rem"
                    className="my-5 align-self-center"
                />
            )}
        </div>
    );
};

export default RepositoryDetails;










// import React,{useEffect,useState} from 'react';

// const NewLoginDetails = ({ newLogin }) => {
//     const [imageUrl, setImageUrl] = useState(null);
  

//     useEffect(() => {
//       if (newLogin.selectedImage) {
//         if (newLogin.selectedImage instanceof File) {
//           // If selectedImage is a File (local selection)
//           setImageUrl(URL.createObjectURL(newLogin.selectedImage));
//         } else if (typeof newLogin.selectedImage === "object" && newLogin.selectedImage.urls) {
//           // If selectedImage is from online and has 'urls' property
//           setImageUrl(newLogin.selectedImage.urls.small);
//         }
//       }
  
//       // Clean up the object URL when the component unmounts or when newLogin.selectedImage changes
//       return () => {
//         if (imageUrl && typeof imageUrl === 'string') {
//           URL.revokeObjectURL(imageUrl);
//         }
//       };
//     }, [newLogin.selectedImage]);


    
//   if (!newLogin) {
//     return null;
//   }



  


//   return (
   

//     <div className="d-flex flex-column gap-5 ps-5">
//                         <div className="d-flex justify-content-between ">
//                           <span className="d-flex gap-2  flex-column ">
//                             <h5 className="sf-grey">Account Name</h5>
//                             <h5>{newLogin.accountName}</h5>
                   
//                           </span>
//                         </div>

//                         <div className="d-flex justify-content-between ">
//                           <span className="d-flex gap-2 flex-column ">
//                             <h5 clasName="sf-grey">Password</h5>
//                           {imageUrl &&   <h5><img src={imageUrl} alt="image password" height="400rem" width="400rem"/></h5>}

// <button
// type="button"
// className="btn btn-primary"
// >
// Decode
// </button>
//                           </span>
//                         </div>
//                       </div>



//   );
// };

// export default NewLoginDetails;






// import React, { useEffect, useState } from 'react';

// const NewLoginDetails = ({ newLogin }) => {
//   const [imageUrl, setImageUrl] = useState(null);

//   useEffect(() => {
//     if (newLogin && newLogin.selectedImage) {
//       if (newLogin.selectedImage instanceof File) {
//         // If selectedImage is a File (local selection)
//         setImageUrl(URL.createObjectURL(newLogin.selectedImage));
//       } else if (typeof newLogin.selectedImage === "object" && newLogin.selectedImage.urls) {
//         // If selectedImage is from online and has 'urls' property
//         setImageUrl(newLogin.selectedImage.urls.small);
//       }
//     }

//     // Clean up the object URL when the component unmounts or when newLogin.selectedImage changes
//     return () => {
//       if (imageUrl && typeof imageUrl === 'string') {
//         URL.revokeObjectURL(imageUrl);
//       }
//     };
//   }, [newLogin]);

//   return (
//     <div className="d-flex flex-column gap-5 ps-5">
//       {newLogin && ( // Conditionally render only if newLogin exists
//         <> {/* Wrap content in a fragment to avoid unnecessary DOM nodes */}
//           <div className="d-flex justify-content-between">
//             <span className="d-flex gap-2 flex-column">
//               <h5 className="sf-grey">Account Name</h5>
//               <h5>{newLogin.accountName}</h5>
//             </span>
//           </div>

//           <div className="d-flex justify-content-between">
//             <span className="d-flex gap-2 flex-column">
//               <h5 className="sf-grey">Password</h5>
//               {imageUrl && ( // Conditionally render the image only if imageUrl is set
//                 <img src={imageUrl} alt="Image Password" height="400rem" width="400rem" />
//               )}
//               <button type="button" className="btn btn-primary">
//                 Decode
//               </button>
//             </span>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default NewLoginDetails;