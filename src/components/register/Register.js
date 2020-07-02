import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: ''
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    onSubmitRegister = () => {
        fetch('https://peaceful-atoll-97400.herokuapp.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 13,
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        }).then(response => response.json())
            .then(data => {
                if (data.id) {
                    this.props.loadUser(data);
                    this.props.onRouteChange('home');
                } else {
                    alert(data);
                }
            })
    }

    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv5 w-90 w-50-m w-25-l mw-100 center shadow-5" >
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 b fw6 ph0 mh0">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 " htmlFor="email-address">Name</label>
                                <input className="pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" autoComplete="name" onChange={this.onNameChange} />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 " htmlFor="email-address">Email</label>
                                <input className="pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" autoComplete="username" onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" autoComplete="current-password" onChange={this.onChangePassword} />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitRegister} className="b br1 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>
                        <div className="lh-copy mt3">
                            <p href="#0" onClick={() => this.props.onRouteChange('signin')} className="f6 link dim black db" style={{ cursor: 'pointer' }}>Sign In</p>
                        </div>
                    </div>
                </main>
            </article>

        )
    }
}

export default Register;