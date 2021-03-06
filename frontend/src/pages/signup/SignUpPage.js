import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import './SignUpPage.scss';
import { inject } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';
import Footer from '../../components/Footer';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

@inject('userStore', 'routerStore')
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: null,
    };
  }

  submit = async () => {
    const { username, password } = this.state;

    try {
      await this.props.userStore.signup(username, password);
      this.props.routerStore.push('/signin');
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  goToSignIn = () => {
    this.props.routerStore.push("/signin");
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Heading>Join us!</Heading>
          <p>Start managing tasks easily with Sir Note</p>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              id="outlined-name"
              label="Username"
              margin="dense"
              variant="outlined"
              onChange={e => this.setState({ username: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Password"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <p style={{fontSize:"100%",fontStyle: "italic", color:"#303030"}}>
            Passwords must contain at least 1 upper case letter, 1 lower case letter and one number OR special charracter.
          </p>
          <hr/>
          <div>
            <Button
              style={{ 
                marginBottom: "10px",
                backgroundColor:"#303030",
                color:"#ffffff",
            }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit}
            >
              SIGN UP
            </Button>
            
            <Button fullWidth onClick={this.goToSignIn}>
              Already have an account? Sign in now!
            </Button>
          </div>
        </FormContainer>
        <Footer/>
      </div>
    );
  }
}

export default SignUpPage;
