import React from "react";
import {NavLink} from "react-router-dom";

/**
 * This class contains the links of the signed in User see in the Navigation bar 
 */

const SignedInLinks = (props) => {
        // Function needed, when the User clicks on the Log-Out Button
        const logout = () => {
            localStorage.removeItem('token');
            props.changeState()
          }

    return ( 
        <ul className="right">
           {/*These are the links for the loged in User*/}
           <li><NavLink to="/login" onClick={()=>{
               logout()
           }}>Log Out</NavLink></li>
            {/*A Little Avatar*/}
            <li><NavLink to="/"className="btn btn-floating pink lighthen-1">DS</NavLink></li>
        </ul>
    )}
 
export default SignedInLinks;