import React from 'react';
import '../containers/App.css';
import Navigation from '../components/navigation/Navigation';
import Logo from '../components/logo/Logo';
import ImageURLForm from '../components/imageUrlForm/ImageURLForm';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageURLForm />
        {/*<FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
