// GeneratePasskeyPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import jsPDF from "jspdf";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

const GeneratePasskeyPage = () => {
  const navigate = useNavigate();
  const [passkey, setPasskey] = useState("");

  const generatePasskey = () => {
    // Generate a unique passkey using uuid
    const newPasskey = uuidv4();
    setPasskey(newPasskey);
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("This piece of text should be protected at all times", 10, 10);
    doc.text("Your one-time passkey:", 10, 40);
    doc.text(passkey, 10, 50);
    doc.save("passkey.pdf");
    navigate("/login");
  };

  return (
    <>
      <Header />

      <div className="d-flex flex-column container justify-content-center align-items-center height-100vh  gap-3">
        <button className="btn btn-primary " onClick={generatePasskey}>
          Generate Passkey
        </button>

        <button onClick={() => navigate("/security")}>
          Back to Security Questions
        </button>
        <h2>Your One-Time Passkey:</h2>
        <p>{passkey}</p>
        {passkey && (
          <button className="btn btn-primary" onClick={generatePdf}>
            Download Passkey PDF
          </button>
        )}
      </div>
    </>
  );
};

export default GeneratePasskeyPage;
