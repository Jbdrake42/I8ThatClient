import React, { useState } from "react";
import { Button } from "reactstrap";

const Sitebar = (props) => {
    return ( 
        <div>
            <Button onClick={props.clickLogout}>Logout</Button>
        </div>
     );
}
 
export default Sitebar;