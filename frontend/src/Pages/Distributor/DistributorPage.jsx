import React from 'react';
import "./DistributorPage.scss"
import Orders from '../Orders/Orders';

const DistributorPage = ({ token }) => {

  return (
    <div className='distributor-page'>
      <h1>Welcome, Here are your current orders:</h1>
      <Orders token={token}/>
    </div>
  );
};

export default DistributorPage;
