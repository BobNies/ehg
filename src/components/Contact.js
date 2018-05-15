import React, { Component } from 'react'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'
import { Grid, Row, Col, FormControl, Button } from 'react-bootstrap'
import request from 'superagent'

class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artistName: this.props.match.params.artistName,
      name: '',
      email: '',
      message: ''
    };
  }

  componentWillUpdate(nextProps, nextState) {
    // Update state to sync with router changes
    if (nextProps.match.params.artistName !== this.state.artistName) {
      this.setState({ artistName: nextProps.match.params.artistName });
    }
  }

  sendEmail = () => {
    request
      .post('https://api.mailjet.com/v3.1/send')
      .auth('5a076f80f30ee53f618636f9185a527d', '8b70ac19d539da0506c0c1c401b648ee')
      .set('Accept', 'application/json')
      .send({
        "Messages":[
          {
            "From": {
              "Email": "ehg11240@gmail.com",
              "Name": "Eucalpyus Hills Gallery"
            },
            "To": [
              {
                "Email": "whatsthatfunction@gmail.com",
                "Name": "Josh Nies"
              }
            ],
            "Subject": "My first Mailjet Email!",
            "TextPart": "Greetings from Mailjet."
          }
        ]
      })
      .end((err, res) => {
        console.log('Response', res);
        console.log('Error (if any)', err);
      })
  }

  render () {
    return(
      <div>
        <AdminShortcut />
        <CustomNavBar/>
        <Grid className='contact'>
          <div className='contact-header'>
            <h1>CONTACT {this.state.artistName.toUpperCase().replace('-', ' ')}</h1>
          </div>
          <div className='contact-form'>
            <Row>
              <Col xs={12} md={2} mdOffset={3}>
                <h4>Name</h4>
              </Col>
              <Col xs={12} md={4}>
                <FormControl
                  type='text'
                  placeholder='Name'
                  onChange={event => this.setState({ name: event.target.value })}
                  />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={2} mdOffset={3}>
                <h4>Email</h4>
              </Col>
              <Col xs={12} md={4}>
                <FormControl
                  type='email'
                  placeholder='Email'
                  onChange={event => this.setState({ email: event.target.value })}
                  />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={2} mdOffset={3}>
                <h4>Message</h4>
              </Col>
              <Col xs={12} md={4}>
                <FormControl
                  type='text'
                  componentClass='textarea'
                  placeholder='Message'
                  onChange={event => this.setState({ email: event.target.value })}
                  />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} mdOffset={3}>
                <Button
                  bsStyle='default'
                  onClick={() => this.sendEmail()}
                  >
                  SEND
                </Button>
              </Col>
            </Row>
          </div>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default Contact;
