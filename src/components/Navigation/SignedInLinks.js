import React from "react";
import {NavLink} from "react-router-dom";

/**
 * This class contains the links of the signed in User see in the Navigation bar 
 */

const SignedInLinks = (props) => {
    return ( 
        <ul className="right">
            {/*A Little Avatar*/}
            <li><NavLink to="/"className="btn btn-floating pink lighthen-1">{localStorage.getItem("username").slice(0,2)}</NavLink></li>
        </ul>
    )}
 
export default SignedInLinks;