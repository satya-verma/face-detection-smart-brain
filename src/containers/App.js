import React from 'react';
import Navigation from '../components/navigation/Navigation';
import Logo from '../components/logo/Logo';
import ImageURLForm from '../components/imageUrlForm/ImageURLForm';
import Rank from '../components/rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from '../components/face_recognition_box/FaceRecognition';
import '../containers/App.css';

const app = new Clarifai.App({
  apiKey: '9667ec91c3ac444e81d28a6dd4b5e84c'
})

const particlesParam = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    console.log(clarifaiFace);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = (event) => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
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
        <FaceRecognition imageSource={this.state.imageUrl} box={this.state.box} />
      </div>
    );
  }
}

export default App;
