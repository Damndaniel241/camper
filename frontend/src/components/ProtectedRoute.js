import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token') !== null;

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;





// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();
// const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     navigate('/login');
// };
