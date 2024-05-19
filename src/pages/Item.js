import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom'; 
import { PiGlobeSimple } from "react-icons/pi";

function Item({ accountName,itemId,onClick}) {
 
  
  return (
  <>
   
  <div className="d-flex p-3 gap-2 align-items-center hover-grey" onClick={onClick}><PiGlobeSimple/> <p>{accountName}</p></div>
   
  </>
  
   )

};

export default Item