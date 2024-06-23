// LoginList.js
import React, { useState } from 'react';

function LoginList() {
  const [logins, setLogins] = useState([]);

  // Function to add a new login component
  const addLogin = () => {
    // Logic to add a new login component to the list
    const newLogin = <LoginComponent key={logins.length + 1} />;
    setLogins([...logins, newLogin]);
  };


  const deleteLogin = (index) => {
    // Filter out the login component at the specified index
    const updatedLogins = logins.filter((_, i) => i !== index);
    setLogins(updatedLogins);
  };
  

  return (
    <div>
      {/* Conditionally render the list of logins or the message */}
      {logins.length === 0 ? (
        <div>
          <p>No logins found. When you save a password in Firefox, it will show up here</p>
        </div>
      ) : (
        <div>
          {/* Render the list of login components */}
          {logins.map((login, index) => (
            <div key={index}>{login}
            
            {/* <button onClick={() => deleteLogin(index)}>delete Login</button> */}
            </div>
            
          ))}
          
        </div>
      )}

      {/* Button to add a new login */}
      <button onClick={addLogin}>Add Login</button>
      
    </div>
  );
}

function LoginComponent() {
  // This is just a placeholder for the login component
  return (
    <div>
      <p>Login Component</p>
    </div>
  );
}

export default LoginList;
