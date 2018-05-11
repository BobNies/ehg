import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, FormGroup, ControlLabel, HelpBlock, FormControl, Button } from 'react-bootstrap'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  render () {
    return(
      <div>
        <CustomNavBar/>
        <Grid fluid>
          <Row className='login'>
            <Col className='login-form' xs={12} md={4} mdOffset={4}>
              <FormControl type='text' placeholder='Username'/>
              <FormControl type='password' placeholder='Password'/>
              <Button bsStyle='default'>Log In</Button>
            </Col>
          </Row>
        </Grid>
        <Footer/>
      </div>
    );
  }
}

export default Login;
