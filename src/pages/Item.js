import React from 'react';
import { PiGlobeSimple } from "react-icons/pi";

function Item({ accountName }) {
  return (
  <>
   
   <div className="d-flex p-3 gap-2 align-items-center hover-grey"><PiGlobeSimple/> <p>{accountName}</p></div>
   
    </>
  );
};

export default Item