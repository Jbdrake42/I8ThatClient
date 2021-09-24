import React, { useState } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Button } from 'reactstrap';
import Home from '../Home/Home';
import CreateFood from './CreateFood';

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
