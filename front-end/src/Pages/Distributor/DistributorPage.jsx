import React from 'react';

import Orders from '../../Components/Orders/Orders';

const DistributorPage = ({ distributorId, token }) => {


  return (
    <div>
      <h1>Welcome, Here are your current orders:</h1>
      <Orders token={token}/>
    </div>
  );
};

export default DistributorPage;
