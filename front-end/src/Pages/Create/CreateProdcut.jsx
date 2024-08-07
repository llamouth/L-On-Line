import React from 'react';

import NewProduct from '../../Components/NewProduct/NewProduct';

const CreateProdcut = ({token}) => {

    return (
        <div>
            <h2>Create a new product</h2>
            <NewProduct token={token}/>
        </div>
    );
};

export default CreateProdcut;