import React, { Component } from 'react'
import { Grid, Row, Col, FormControl, Button, Alert } from 'react-bootstrap'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import { Consumer } from '../MyContext'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  attemptSubmit = (e, logIn, produceNotification) => {
    if (e.key === 'Enter') {
      logIn(this.state.email, this.state.password);
      produceNotification('Signing in...', 'Please wait', 'info');
    }
  }

  render () {
    return(
      <Consumer>
        {value => {
          const { user, logIn, error, produceNotification } = value;
          return user && user.email != null ? (
            <div>
              <CustomNavBar/>
              <Grid fluid>
                <Row className='login'>
                  <Col className='login-form' xs={12} md={4} mdOffset={4}>
                    <h1 className='noselect'>Welcome back, {user.email}.</h1>
                  </Col>
                </Row>
              </Grid>
              <Footer/>
            </div>
          ) : (
            <div>
              <CustomNavBar/>
              <Grid fluid>
                <Row className='login'>
                  <Col className='login-form' xs={12} md={4} mdOffset={4}>
                    <h1 className='noselect'>ADMIN LOGIN</h1>
                    {error.message !== '' &&
                      <Alert bsStyle='danger'>
                        <p>{error.message}</p>
                      </Alert>
                    }
                    <FormControl
                      type='email'
                      placeholder='Email'
                      onChange={event => this.setState({ email: event.target.value })}
                      />
                    <FormControl
                      type='password'
                      placeholder='Password'
                      onChange={event => this.setState({ password: event.target.value })}
                      onKeyPress={event => this.attemptSubmit(event, logIn, produceNotification)}
                      />
                    <Button
                      bsStyle='primary'
                      onClick={() => logIn(this.state.email, this.state.password)}
                      >
                      Log In
                    </Button>
                  </Col>
                </Row>
              </Grid>
              <Footer/>
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default Login;
