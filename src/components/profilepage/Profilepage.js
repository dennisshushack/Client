import React from "react";
import styled from "styled-components";
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
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

// Global variables
let id = 0;
let userdata = null;

class Profilepage extends React.Component{
// Creating a constructor
constructor(props) {
  super(props);
  this.getUserProfile();
  this.state = {
    users: null,
    ownProf: false,
    id: localStorage.getItem("id")
  }
}

async updateUser(){
  try {
    const requestBody = JSON.stringify({
      username: this.state.users.username.toLowerCase(),
      birthday: this.state.users.birthday,
      id: this.state.users.id
    });
    const response = await api.put('/users/'+ this.id, requestBody);
    debugger
    if(response.status == 204){
     this.setState(prevState => ({
       users: {
          // Save the changes done in the previous state
     ...prevState.users
      }
      }))
      this.setState({
          ownProf: false
          }) 
     // window.location.reload(true);
    }

  
} catch (error) {
  alert(`Something went wrong during the registration: \n${handleError(error)}`);
}
}


// handleSaveClick
handleSaveClick = (e)=>{
  e.preventDefault();
  this.updateUser();  
}

async getUserProfile() {
    try {
        // Get userID by URL in parent 
        this.id = this.props.match.params.id;
        //Get mapping to backend
        const response = await api.get("/users/" + this.id)

        await new Promise(resolve => setTimeout(resolve, 1000));
        this.userdata = response.data;
        this.setState({ users: response.data });
       


    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
}
// HandleClick
handleClick = (e) => {
  e.preventDefault();
  this.setState({
    ownProf: true
  })
 };

 // Handel Cancel Click. This handels what happens, when we click on Cancel
 handleCancelClick = (e) => {
  e.preventDefault();
  this.setState({
  ownProf: false
  })
  this.setState(prevState => ({
    users: {
    ...prevState.users,
    username: this.userdata.username,
    birthday: this.userdata.birthday
    }
    }))
  }

  // Handel Back Click (Is in charge, when clicking the back Button appearing on all Users)
  handleBack = () =>{
    this.props.history.push("/game");
  }

  // Function for changing input
  handleInputChange(key, value) {
    // Copy previous state copy and update it.
    this.setState(prevState => ({
      users: {
      ...prevState.users,
      [key]: value
      }
      }))
  }



render(){
  // We need the id of the current user and the one of the Userprofile -> Needed for Edit Button
  const id = this.props.match.params.id;
  const idUser = localStorage.getItem("id");
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
                                <Label> <label htmlFor="2">Your Username</label>
                                <br/>
                                {!this.state.ownProf ? (<span className="blue-text" id="1">{this.state.users.username}</span>): (<input type="text" placeholder={this.state.users.username} onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}/>)} 
                                </Label>
                               <br/>
                               <Label> <label htmlFor="2">Status</label>
                                <br/>
                                <span className="blue-text" id="1">{this.state.users.status}</span>
                                </Label>
                               <br/>
                                <Label> <label htmlFor="2">Creationdate</label>
                                <br/>
                                <span className="blue-text" id="1">{this.state.users.creationdate.slice(0,10)}</span>
                                </Label>
                               <br/>
                                <Label> <label htmlFor="2">Birthday</label>
                                <br/>
                                {!this.state.ownProf ? (<span className="blue-text" id="1">{this.state.users.birthday}</span>): (<input type="text" placeholder={this.state.users.birthday} onChange={e => {
                this.handleInputChange('birthday', e.target.value);
              }} />)} 
                                </Label>
                               <br/>
                               <br/>  
                               {id == idUser ? !this.state.ownProf ? (<button className="btn pink" onClick={this.handleClick}>Edit</button>) : (<button className="btn pink" onClick={this.handleSaveClick}>Save</button>) : null}
                              {this.state.ownProf ? (<button className="btn pink" onClick={this.handleCancelClick}>Cancel</button>) : null}
                            </form>
                        </section>
                        <button className="btn pink" onClick={this.handleBack}>Back to Overview</button>
                    </div>
                </div>
              </div>
              )}
        </Container>
     );
     
}
}
 
export default Profilepage;