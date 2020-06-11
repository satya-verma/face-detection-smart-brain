import React from 'react';
import '../containers/App.css';
import Navigation from '../components/navigation/Navigation';
import Logo from '../components/logo/Logo';
import ImageURLForm from '../components/imageUrlForm/ImageURLForm';
import Rank from '../components/rank/Rank';
import Particles from 'react-particles-js';

const particlesParam = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    },
    opacity: {
      anim: {
        value: 0
      }
    },
    shape: {
      type: 'polygon'
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 1
      }
    }
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App tc">
        <Particles className="particles"
          params={particlesParam} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageURLForm />
        {/*<FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
