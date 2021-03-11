import {Link} from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import React, { useState } from "react";

/**
 * This is a navigation bar, that appears on all sites
 * Deploy failed
 */

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
    token: localStorage.getItem('token')
      }
    }
    
    
    

    // Set state 
changeState = () => {
        this.setState({
            token: localStorage.getItem("token")
        })
    }
   
  
  //  shouldComponentUpdate(prevProps,prevState) {}
  
    render(){
      return(
          <div>
            <nav className="nav-wrapper blue darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">Dennis Project</Link>
                {this.state.token == null ? <SignedOutLinks /> : <SignedInLinks changeState={this.changeState} />}
            </div>
        </nav>


          </div>
      )
    }
  }
  export default Navigation;
  