import React, { Component } from 'react';
import welcomeIcon from './assets/welcome.jpg';
import TabContainer from './Containers/TabContainer/TabContainer';

class App extends Component {
  render() {
    return (
      <>
        <div className="flex flex-row justify-center my-12">
          <img src={welcomeIcon} alt="Welcome!" />
        </div>
        <TabContainer />
      </>
    );
  }
}

export default App;
