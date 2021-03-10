import React from "react";
import styled from "styled-components";
import { BaseContainer } from '../../helpers/layout';
import { Button } from '../../views/design/Button';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

 

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

  


class Profilepage extends React.Component{
// Creating a constructor
constructor(){
    super();
    this.state = {
        id: null,
        name: null,
        username: null,
        creationdate: null,
        birthday: null
    }
}

async componentDidMount() {
    try {
        // Tries to get the User by id
        let id = this.props.match.params.id;
        console.log(id);
        //const id = this.props.location;
        const response = await api.get("/users/" + id)



    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
}



render(){
    return ( 
        <Container>
            <h2>Profile</h2> 
            <div>
                <div className="card">
                    <div></div>
                    <div className="btn-large pink">{localStorage.getItem("username")}</div>
                    {/* Here comes the card content*/}
                    <div className="card-content">
                        <span className="card-title blue-text">Userprofile</span>
                        <section className="section container">
                            <form action="">
                               <Label> <label htmlFor="1">Your UserID</label>
                               </Label>
                                <br/>
                                <span className="blue-text" id="1">{localStorage.getItem("id")}</span>
                                <br/>
                                <Label> <label htmlFor="2">Your Username</label>
                               </Label>
                            </form>
                        </section>
                    </div>
                </div>
          

                </div> 
        </Container>
     );
}
}
 
export default Profilepage;