import React from 'react';
import '../containers/App.css';
import Navigation from '../components/navigation/Navigation';
import Logo from '../components/logo/Logo';
import ImageURLForm from '../components/imageUrlForm/ImageURLForm';
import Rank from '../components/rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from '../components/face_recognition_box/FaceRecognition';

const app = new Clarifai.App({
  apiKey: '1f403b6cee9f4ab8b01dbcca67ff3a36'
})

const particlesParam = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
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
  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = (event) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, "https://samples.clarifai.com/face-det.jpg").then(
      function (response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function (err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App tc">
        <Particles className="particles tc"
          params={particlesParam} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageURLForm inputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition imageSource={this.state.input} />
      </div>
    );
  }
}

export default App;
