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
            <div className='d-flex flex-column'>
            <p><strong>Account Name</strong></p><p> {repository.account_name}</p>
            </div>
            <div className='d-flex flex-column'>
            <p><strong>Password</strong></p><p> {repository.password}</p>
            </div>
            {repository.picture && (
                <img
                    // src={URL.createObjectURL(new Blob([repository.picture]))}
                    src={repository.picture}
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







