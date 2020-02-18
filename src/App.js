import React, { Component } from 'react';
import welcomeIcon from './assets/welcome.jpg';
import TabContainer from './Containers/TabContainer';

class App extends Component {
  render() {
    return (
      <>
        <img src={welcomeIcon} alt="Welcome!" />
        <TabContainer />
      </>
    );
  }
}

export default App;
