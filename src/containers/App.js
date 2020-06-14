import React from 'react';
import Navigation from '../components/navigation/Navigation';
import Logo from '../components/logo/Logo';
import ImageURLForm from '../components/imageUrlForm/ImageURLForm';
import Rank from '../components/rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from '../components/face_recognition_box/FaceRecognition';
import SignIn from '../components/sign_in/SignIn';
import '../containers/App.css';

const app = new Clarifai.App({
  apiKey: '9667ec91c3ac444e81d28a6dd4b5e84c'
})

const particlesParam = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      enable_auto: true,
      distance: 150,
      opacity: 0.25,
      width: 0.5
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
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

  onRouteChange = (route) => {
    this.setState({ route: route })
  }

  render() {
    return (
      <div className="App tc">
        <Particles className="particles tc"
          params={particlesParam} />
        {this.state.route === 'signin' ?
          <SignIn onRouteChange={this.onRouteChange} /> :
          (
            <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <Logo />
              <Rank />
              <ImageURLForm inputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition imageSource={this.state.imageUrl} box={this.state.box} />
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
