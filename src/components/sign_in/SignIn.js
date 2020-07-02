import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    // change sign-email state whenever email field is modified.
    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    }
    
    // change sign-email state whenever password field is modified.
    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    }

    // on submitting the sign in form. 
    onSubmitSignIn = () => {
        fetch('https://peaceful-atoll-97400.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                } else {
                    alert(user);
                }
            })
    }

    // render
    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv5 w-90 w-50-m w-25-l mw-100 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 b fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 " htmlFor="email-address">Email</label>
                                <input className="pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" autoComplete="username" onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" autoComplete="current-password" onChange={this.onPasswordChange} />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitSignIn} className="b br1 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p href="#0" onClick={() => onRouteChange('register')} className="f6 link dim black db" style={{ cursor: 'pointer' }}>Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;