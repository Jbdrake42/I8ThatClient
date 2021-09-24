import React, { useState } from 'react';

const Sitebar = (props) => {
  return (
    <div className="sitebar">
      <div className="sitebar-list-styling">
          <a class="nav" onClick={props.clickLogout}>Logout</a>
      </div>
    </div>
  );
};

export default Sitebar;
