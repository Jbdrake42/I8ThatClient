import React, { useState } from "react";
import {
    Route,
    Link,
    Switch
} from 'react-router-dom'

import { Button } from "reactstrap";
import Quote from "./Quotes/InspirationalQuote";
import CreateFood from "./CreateFood";

const Sitebar = (props) => {
    return ( 
        <div className = "sitebar">
            <div className = "sitebar-list-styling">
                <ul className = "sitebar-list list-unstyled">
                    <li><Link to = "/CreateFood">Add A Food Item</Link></li>
                        <Button onClick={props.clickLogout}>Logout</Button>
                        <Quote />
                </ul>
            </div>
            <div className = "sitebar-route">
                <Switch>
                    <Route exact path = "/CreateFood"><CreateFood /></Route>
                </Switch>
            </div>
        </div>
     );
}
 
export default Sitebar;