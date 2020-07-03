import React from 'react';
import Navigation from '../components/navigation/Navigation';
import Logo from '../components/logo/Logo';
import ImageURLForm from '../components/imageUrlForm/ImageURLForm';
import Rank from '../components/rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from '../components/face_recognition_box/FaceRecognition';
import SignIn from '../components/sign_in/SignIn';
import Register from '../components/register/Register';
import '../containers/App.css';

// live particles component parameters (background)
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

// states object
const initalState = {
  input: '',        // url input 
  imageUrl: '',     // url input change
  box: {},          // pixel values for bounding-box
  route: 'signin',   // screens: signIn, signup & home
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

// intialising states in the constructor
class App extends React.Component {
  constructor() {
    super();
    this.state = initalState;
  }

  // load user data into state
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    });
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
    this.setState({ imageUrl: input });
    fetch(' http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: input
      })
    })
      .then((response) => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  // this function changes the 'route' state
  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initalState);
    }
    this.setState({ route: route });
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
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageURLForm inputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition imageSource={imageUrl} box={box} />
          </div>
        );
      case 'signin':
        return (<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />);
      case 'register':
        return (<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />);
      default: break;
    }
  }

  // render 
  render() {
    const { route } = this.state;
    return (
      <div className="App tc">
        <Particles className="particles tc"
          params={particlesParam}
        />
        {this.renderSwitch(route)}
      </div>
    );
  }
}

export default App;
