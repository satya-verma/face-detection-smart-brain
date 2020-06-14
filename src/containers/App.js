import React from 'react';
import Navigation from '../components/navigation/Navigation';
import Logo from '../components/logo/Logo';
import ImageURLForm from '../components/imageUrlForm/ImageURLForm';
import Rank from '../components/rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from '../components/face_recognition_box/FaceRecognition';
import SignIn from '../components/sign_in/SignIn';
import Register from '../components/register/Register';
import '../containers/App.css';

// initialising access for our app to Clarifai api with our Clarifai api key.
const app = new Clarifai.App({
  apiKey: '9667ec91c3ac444e81d28a6dd4b5e84c'
})

// live particles component background
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
      input: '',        // url input 
      imageUrl: '',     // url input change
      box: {},          // pixel values for bounding-box
      route: 'signin'   // screens: signIn, signup & home
    }
  }

  /* 
    calculateFaceLocation converts the coordinates received, into pixels(px) and returns all values in an object
    which are then used as styles to draw the bounding-box around the detected face.
    the (data) parameter gets the response as argument which is returned from api call in the onSubmit function.
  */
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

  /* 
  displayFaceBox method changes the state of box object with newly received value from the 
  calculateFaceLocation function
  */
  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  // detects the change in input url and changes the input state accordingly
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  /* 
  on submitting image-url, Clarifai api is called reads the image and returns the `response` and that `response` 
  holds the coordinates of the bounding-box for the faces. this `response` is passed to calculateFaceLocation 
  function as a parameter to convert into pixels and calculateFaceLocation function is then passed as parameter
  to the displayFaceBox fucntion. 
  */
  onSubmit = (event) => {
    const { input } = this.state;
    this.setState({ imageUrl: input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  // this function changes the state of route
  onRouteChange = (route) => {
    this.setState({ route: route })
  }

    
  //receives a {state.route} parameter and switches between signIn, signUp and home screen components
  renderSwitch = (param) => {
    const { imageUrl, box } = this.state;
    switch (param) {
      case 'home':
        return (
          <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <Logo />
            <Rank />
            <ImageURLForm inputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition imageSource={imageUrl} box={box} />
          </div>
        );
      case 'signin':
        return (<SignIn onRouteChange={this.onRouteChange} />);
      case 'register':
        return (<Register onRouteChange={this.onRouteChange} />);
      default: break;
    }
  }

  // render 
  render() {
    const { route } = this.state;
    return (
      <div className="App tc">
        <Particles className="particles tc"
          params={particlesParam} />
        {this.renderSwitch(route)}
      </div>
    );
  }
}

export default App;
