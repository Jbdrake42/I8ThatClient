import React, { useState } from "react";
import { //1
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    Button
} from "reactstrap";

const Sitebar = (props) => {
    return ( 
        <div>
            <Button onClick={props.clickLogout}>Logout</Button>
        </div>
     );
}
 
export default Sitebar;