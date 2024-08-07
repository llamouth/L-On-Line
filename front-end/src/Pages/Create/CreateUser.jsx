import React from 'react';
import NewUser from '../../Components/NewUser/NewUser';
import './CreateUser.scss';

const CreateUser = () => {
    return (
        <div className="form-container">
            <h2>Create New User</h2>
            <NewUser/>
        </div>
    );
};

export default CreateUser;
