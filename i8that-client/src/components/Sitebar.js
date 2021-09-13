import React, { useState } from "react";
import { Button } from "reactstrap";
import Quote from "./Quotes/InspirationalQuote";
const Sitebar = (props) => {
    return ( 
        <div>
            <Button onClick={props.clickLogout}>Logout</Button>
            <Quote />
        </div>
     );
}
 
export default Sitebar;