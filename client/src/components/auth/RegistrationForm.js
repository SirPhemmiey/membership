import React, {
    Component
} from 'react';
import {
    withAuth
} from '@okta/okta-react';
import OktaAuth from '@okta/okta-auth-js';

import config from '../../app.config';

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            sessionToken: null
        };
        this.oktaAuth = new OktaAuth({
            url: config.url
        });
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.checkAuthentication();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    async checkAuthentication() {
        let sessionToken = await this.prop.auth.getIdToken();
        if (sessionToken) {
            this.setState({
                sessionToken
            });
        }
    }
    componentDidUpdate() {
        this.checkAuthentication();
    }

    handleFirstNameChange(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    handleLastNameChange(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        fetch('/api/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(...this.state)
        })
        .then(user => {
            this.oktaAuth
            .signIn({
                username: this.state.email,
                password: this.state.password
            })
            .then(res => {
                this.setState({ sessionToken: res.sessionToken });
            })
        })
        .catch(err => console.log(err.message));
    }

    render() {
        if (this.state.sessionToken) {
            this.prop.auth.redirect({ sessionToken: this.state.sessionToken });
            return null;
        }
        <form onSubmit={this.handleSubmit}>
            <div className="form-element">
            <label>Email:</label>
            <input
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="form-element">
            <label>First Name:</label>
            <input
              type="text"
              id="firstName"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
            />
          </div>
          <div className="form-element">
            <label>Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
            />
          </div>
          <div className="form-element">
            <label>Password:</label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <input type="submit" id="submit" value="Register" />
        </form>
    }
}
export default withAuth(RegistrationForm);