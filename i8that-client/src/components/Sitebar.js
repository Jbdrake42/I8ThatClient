import React, { useState } from "react";
import { Button } from "reactstrap";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";

const Sitebar = (props) => {
    return ( 
        <div>
            <Login />
            <Signup />
            <Button onClick={props.clickLogout}>Logout</Button>
        </div>
     );
}
 
export default Sitebar;