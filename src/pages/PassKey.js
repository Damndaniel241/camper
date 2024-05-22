// GeneratePasskeyPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import jsPDF from "jspdf";
import axios from "axios";

const GeneratePasskeyPage = () => {
  const navigate = useNavigate();
  const [passkey, setPasskey] = useState("");

  const generatePasskey = (e) => {
    e.preventDefault();
    // Generate a unique passkey using uuid
    const newPasskey = uuidv4();
    setPasskey(newPasskey);

    axios
      .post(
        "http://127.0.0.1:8000/api/passkey/",
        { passkey: newPasskey },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Passkey stored successfully", response.data);
      })
      .catch((error) => {
        console.error("There was an error storing the passkey!", error);
      });
  };

  const generatePdf = (e) => {
    e.preventDefault();
    const doc = new jsPDF();
    doc.text(
      "CAMPER:This piece of text should be protected at all times",
      10,
      10
    );
    doc.text("Your one-time passkey:", 10, 40);
    doc.text(passkey, 10, 50);
    doc.save("camper_passkey.pdf");
    navigate("/imagekey");
  };

  return (
    <>
      <Header />
      <div className="container text-danger">
        Your passkey is very important for decrypting your passwords. You should
        save it in a secure place
      </div>
      <div className="d-flex flex-column container justify-content-center align-items-center height-100vh  gap-3">
        <button className="btn btn-primary " onClick={generatePasskey}>
          Generate Passkey
        </button>

        {passkey && (
          <>
            <h2>Your One-Time Passkey has been generated</h2>
            <h2>click below to download</h2>
          </>
        )}

        {passkey && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={generatePdf}
          >
            Download Passkey PDF
          </button>
        )}
      </div>
    </>
  );
};

export default GeneratePasskeyPage;
