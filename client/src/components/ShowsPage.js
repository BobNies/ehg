import React, { Component } from 'react'
import { Consumer } from '../MyContext'
import { firebaseApp } from '../firebase'
import CustomNavBar from './CustomNavBar'
import Footer from './Footer'
import AdminShortcut from './AdminShortcut'
import Show from './Show'

class ShowsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      shows: [],
      showsArray: []
    };

    this.updateShows.bind(this);
  }

  componentDidMount() {
    this.updateShows();
    window.scrollTo(0, 0);
  }

  updateShows() {
    firebaseApp.database().ref('shows').once('value').then((snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({ shows: snapshot.val() });

        const shows = this.state.shows;
        let newShows = [];

        if (shows != null) {
          Object.keys(shows).map((show, index) => {
            const { imagePath, description } = shows[show];
            newShows.push([imagePath, description, show]);
          })
        }

        newShows.reverse();

        this.setState({ showsArray: newShows });
      }
    })
  }

  render () {
    return(
      <Consumer>
        {value => {
          return (
            <div>
              <AdminShortcut />
              <CustomNavBar/>
              <h1 className='shows-title'>SHOWS COLLECTION</h1>
              <div className='shows'>
                {
                  this.state.showsArray.map((show, index) => {
                    return (
                      <Show
                        key={index}
                        imagePath={show[0]}
                        description={show[1]}
                        showKey={show[2]}
                        />
                    )
                  })
                }
              </div>
              <Footer />
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default ShowsPage;
