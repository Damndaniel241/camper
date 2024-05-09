// GeneratePasskeyPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header";

const GeneratePasskeyPage = () => {
  const navigate = useNavigate();
  const [passkey, setPasskey] = useState("");

  //   const generatePasskey = () => {
  //     // Generate a unique passkey using uuid
  //     const newPasskey = uuidv4();
  //     setPasskey(newPasskey);
  //   };

  //   const handleDownloadPDF = () => {
  //     // Logic to export passkey to PDF
  //     // You can use a library like react-pdf or jsPDF for this
  //     // Here, I'm just simulating a download
  //     const fakePdfDownloadLink = document.createElement('a');
  //     fakePdfDownloadLink.href = `data:application/pdf,${encodeURIComponent(passkey)}`;
  //     fakePdfDownloadLink.download = 'passkey.pdf';
  //     fakePdfDownloadLink.click();
  //   };

  // const generatePasskey = () => {
  //   // Generate a unique passkey
  //   const newPasskey = 'GeneratedPasskey123'; // You can replace this with your actual passkey generation logic
  //   setPasskey(newPasskey);

  //   // Create PDF blob
  //   const pdfBlob = new Blob([passkey], { type: 'application/pdf' });

  //   // Create download link
  //   const downloadLink = document.createElement('a');
  //   downloadLink.href = window.URL.createObjectURL(pdfBlob);
  //   downloadLink.setAttribute('download', 'passkey.pdf');

  //   // Trigger download
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();

  //   // Cleanup
  //   document.body.removeChild(downloadLink);
   

  return (
    <>
      <Header />

      <div className="d-flex flex-column container justify-content-center align-items-center height-100vh  gap-3">
        {/* <button className="btn btn-primary " onClick={generatePasskey}>
          Generate Passkey
        </button> */}
        {/* <button className='btn btn-primary' onClick={handleDownloadPDF}>Download Passkey PDF</button> */}
        <button onClick={() => navigate("/security")}>
          Back to Security Questions
        </button>
        <h2>Your One-Time Passkey:</h2>
        <p>{passkey}</p>
      </div>
    </>
  );
};

export default GeneratePasskeyPage;
