import React, { useState } from 'react';
import { decode, encode } from 'steganographer';

function read2(){
  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [decodedMessage, setDecodedMessage] = useState('');
  const [messageToEncode, setMessageToEncode] = useState('');

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputImage(URL.createObjectURL(file));
    }
  };

  const handleEncode = async () => {
    if (messageToEncode && inputImage) {
      const encodedImage = await encode(messageToEncode, inputImage);
      setOutputImage(encodedImage);
    }
  };

  const handleDecode = async () => {
    if (outputImage) {
      const decodedText = await decode(outputImage);
      setDecodedMessage(decodedText);
    }
  };

  return (
    <div>
      {/* <h2>Steganography Encoder & Decoder</h2>
      <div>
        <h3>Encoder</h3>
        <input type="file" onChange={handleImageInputChange} accept="image/*" />
        <textarea
          placeholder="Type message to encode"
          value={messageToEncode}
          onChange={(e) => setMessageToEncode(e.target.value)}
        />
        <button onClick={handleEncode}>Encode</button>
        {outputImage && <img src={outputImage} alt="Encoded Image" />}
      </div>
      <div>
        <h3>Decoder</h3>
        <input type="file" onChange={handleImageInputChange} accept="image/*" />
        <button onClick={handleDecode}>Decode</button>
        {decodedMessage && <div>Decoded Message: {decodedMessage}</div>}
      </div> */}bread
    </div>
  );
};

export default Read2;
