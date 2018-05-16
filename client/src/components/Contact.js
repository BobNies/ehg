import React, { Component } from 'react'
import { Grid, Row, Col, FormControl, Button, Alert } from 'react-bootstrap'
import request from 'superagent'
import { Consumer } from '../MyContext'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'

class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artistName: this.props.match.params.artistName,
      name: '',
      email: '',
      message: '',
      error: ''
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUpdate(nextProps, nextState) {
    // Update state to sync with router changes
    if (nextProps.match.params.artistName !== this.state.artistName) {
      this.setState({ artistName: nextProps.match.params.artistName });
    }
  }

  sendEmail = (produceNotification) => {
    if (this.state.name === '') {
      this.setState({ error: 'Please enter your name.' });
      return;
    }

    if (this.state.email === '') {
      this.setState({ error: 'Please enter your email so we can get back to you.' });
      return;
    }

    if (this.state.message === '') {
      this.setState({ error: 'Please enter a message.' });
      return;
    }

    const artist = this.state.artistName.toUpperCase().replace('-', ' ');

    request
      .post('/api/sendContactMail')
      .set('Accept', 'application/json')
      .query({ to: 'whatsthatfunction@gmail.com' })
      .query({ from: 'whatsthatfunction@gmail.com' })
      .query({ subject: 'New Contact Message' })
      .query({ text: 'The following message was sent from ' + this.state.email + ' to ' + artist + ': ' + this.state.message })
      .query({ html: '<h3>The following message was sent from ' + this.state.email + ' to ' + artist + ': </h3><hr /><p>' + this.state.message + '</p>' })
      .send({
        "message": "The message"
      })
      .end((err, res) => {

      });

      // Reset error message
      this.setState({ error: '' });

      produceNotification('Message sent!', 'We will get back to you soon!', 'success');
  }

  render () {
    return(
      <Consumer>
        {value => {
          const { produceNotification } = value;
          return(
            <div>
              <AdminShortcut />
              <CustomNavBar/>
              <Grid className='contact'>
                <div className='contact-header'>
                  <h1>CONTACT {this.state.artistName.toUpperCase().replace('-', ' ')}</h1>
                </div>
                <div className='contact-form'>
                  { this.state.error !== '' &&
                    <Col xs={12} md={6} mdOffset={3}>
                      <Alert bsStyle='danger'>
                        <p>{this.state.error}</p>
                      </Alert>
                    </Col>
                  }
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
                        onChange={event => this.setState({ message: event.target.value })}
                        />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6} mdOffset={3}>
                      <Button
                        bsStyle='default'
                        onClick={() => this.sendEmail(produceNotification)}
                        >
                        SEND
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Grid>
              <Footer />
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default Contact;
