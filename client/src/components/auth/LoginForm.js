import React, {
    Component
} from 'react';
import OktaAuth from '@okta/okta-auth-js';
import {
    withAuth
} from '@okta/okta-react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionToken: null,
            error: '',
            username: '',
            password: ''
        };
        this.oktaAuth = new OktaAuth({
            url: props.baseUrl
        });
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.oktaAuth
            .signIn({
                username: this.state.username,
                password: this.state.password
            })
            .then(res => {
                this.setState({
                    sessionToken: res.sessionToken
                });
            })
            .catch(err => {
                this.setState({ error: err.message });
            })
    }
    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        if (this.state.sessionToken) {
            this.props.auth.redirect({ sessionToken: this.state.sessionToken });
            return null;
        }
        const errorMessage = this.state.error ? (
            <span className="error-message">{this.state.error}</span>
        ): null;

        return (
            <form onSubmit={this.handleSubmit}>
                {errorMessage}
                <div className="class-element">
                    <label>Username:</label>
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
                </div>
                <div className="form-element">
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                </div>
                <input type="submit" value="Submit" id="submit"/>
            </form>
        );
    }

}
export default withAuth(LoginForm);