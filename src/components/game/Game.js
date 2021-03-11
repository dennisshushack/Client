import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Profilepage from '../profilepage/Profilepage';

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2px;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null,
    };
  }

  /*
  * This function does the logic, when login out 
  */

  async logout() {
    // Getting the userId, needed for the backend
    const id = localStorage.getItem('id');
    console.log(id);
    // This clears the local storage
    localStorage.clear();
    // Declare, what we want to have sent
    const requestBody = JSON.stringify({
      username: null,
      password: null,
      id: id
    });
    // We are going to wait for the put to the backend
    await api.put("/logout",requestBody);

    // We send the user to the login screen -> loged out
    this.props.callParent();
    this.props.history.push('/login');
  }

  async componentDidMount() {
    try {
      const response = await api.get('/users');
      // delays continuous execution of an async operation for 1 second.
      // This is just a fake async call, so that the spinner can be displayed
      // feel free to remove it :)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the returned users and update the state.
      this.setState({ users: response.data });

      // This is just some data for you to see what is available.
      // Feel free to remove it.
      console.log('request to:', response.request.responseURL);
      console.log('status code:', response.status);
      console.log('status text:', response.statusText);
      console.log('requested data:', response.data);

      // See here to get more data.
      console.log(response);
    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }


  render() {
    return (
      <Container>
        <h2>Hello {localStorage.getItem("name")}</h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  <ButtonContainer
                      onClick = {() => {
                        this.props.history.push(`/profilepage/${user.id}`)
                      }}
                    >
                  <PlayerContainer key={user.id}>
                    <Player user={user} />
                  </PlayerContainer>
                </ButtonContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
