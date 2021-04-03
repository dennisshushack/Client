import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter } from 'react-router-dom';
import Profilepage from '../profilepage/Profilepage';
import axios from 'axios';

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
      selectedFile: null,
      retrievedFile: null
    };
  }

  // Get the File, that has been added -> Set's the new state
  fileSelectHandler = event => {
    this.setState({
    selectedFile: event.target.files[0]
    })
  }

  clickEventHandler = event => {
    if(this.state.selectedFile!=null){
      this.upload();
    }else{
      alert("You need to add a picture first")
    }
  }

   /* 
   * This sends the picture to the backend
   */
    async upload() {
      const fd = new FormData();
      fd.append('file',this.state.selectedFile);
      axios.post('http://localhost:8080/upload',fd).then(res =>{
        alert(res.data.message);
      })
   
    }


  async componentDidMount() {
    try {
      const response = await api.get('/files/2');
      this.setState({ retrievedFile: response.data });
      console.log(this.retrievedFile)
    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }



  render() {
    return (
      <Container>
        <input type="file" onChange={this.fileSelectHandler}/> 
        <br/>
        <button onClick={this.clickEventHandler}>Upload image</button>
        <br/>
        <img src="http://localhost:8080/files/2" alt=""/>
      </Container>
    );
  }
}

export default withRouter(Game);
