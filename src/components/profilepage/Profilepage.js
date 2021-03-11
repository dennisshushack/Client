import React from "react";
import styled from "styled-components";
import { BaseContainer } from '../../helpers/layout';
import { Button } from '../../views/design/Button';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Spinner } from '../../views/design/Spinner';

 

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  width: 300px;
`;


const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Users = styled.ul`
  list-style: square;
  padding-left: 0;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// Edit Profile 
let editProfile = false;


class Profilepage extends React.Component{
// Creating a constructor
constructor(props) {
  super(props);
  this.getUserProfile();
  this.state = {
    users: null,
    ownProf: false
  }
}


async getUserProfile() {
    try {
        // Get userID by URL in parent 
        let id = this.props.match.params.id;
        console.log(id);
        //Get mapping to backend
        const response = await api.get("/users/" + id)

        await new Promise(resolve => setTimeout(resolve, 1000));

        this.setState({ users: response.data });
       


    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
}
// HandleClick
handleClick = () => {
  debugger
  this.editProfile = true;
// this.setState({
// ownProf: true
// })
 };



render(){
  // We need the id of the current user and the one of the Userprofile -> Needed for Edit Button
  const id = this.props.match.params.id;
  const idUser = localStorage.getItem("id");
  let edit = this.editProfile;
    return ( 
        <Container>
            <h2>Profile</h2> 
            {!this.state.users ? (
                  <Spinner/>
              ) : (
            <div>
                <div className="card">
                    <div></div>
                    <div className="btn-large pink">{this.state.users.username}</div>
                    {/* Here comes the card content*/}
                    <div className="card-content">
                        <span className="card-title blue-text">Userprofile</span>
                        <section className="section container">
                            <form action="">
                               <Label> <label htmlFor="1">Your UserID</label>
                               </Label>
                                <br/>
                                <span className="blue-text" id="1">{this.state.users.id}</span>
                                <br/>
                                <Label> <label htmlFor="2">Your Username</label>
                                </Label>
                                <br/>
                                <span className="blue-text" id="1">{this.state.users.username}</span>
                               <br/>
                                <Label> <label htmlFor="2">Your Name</label>
                                </Label>
                                <br/>
                                <span className="blue-text" id="1">{this.state.users.name}</span>
                               <br/>
                                <Label> <label htmlFor="2">Creationdate</label>
                                </Label>
                                <br/>
                                <span className="blue-text" id="1">{this.state.users.creationdate.slice(0,10)}</span>
                               <br/>
                                <Label> <label htmlFor="2">Birthday</label>
                                </Label>
                                <br/>
                                {console.log(this.state.ownProf)}
                                {!edit ? (<span className="blue-text" id="1">Nan</span>): (<input type="text"/>)} 
                               <br/>
                               <Label> <label htmlFor="2">Status</label>
                               </Label>
                                <br/>
                                <span className="blue-text" id="1">{this.state.users.status}</span>
                               <br/>
                               <br/>
                               {id==idUser ? ( <button className="btn pink" onClick={this.handleClick}>Edit</button>) : null}
                            </form>
                        </section>
                    </div>
                </div>
              </div>
              )}
        </Container>
     );
}
}
 
export default Profilepage;