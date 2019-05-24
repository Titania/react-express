import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../redux/action';

class LoginPage extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			username: 'test',
			password: 'test',
			submitted: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { username, password } = this.state;
		const { dispatchLogin } = this.props;
		if (username && password) {
			dispatchLogin(username, password);
		}
	}

	render() {
		const { user, token, history } = this.props;
		const { username, password, submitted } = this.state;
		console.log('render', user)

		if (user && token) {
			localStorage.removeItem('user');
			localStorage.setItem('user', JSON.stringify(user));
			localStorage.removeItem('token');
			localStorage.setItem('token', token);

			history.push('/')
		}

		return (
			<div className="jumbotron">
				<div className="container">
					<div className="col-sm-8 col-sm-offset-2">
						<div className="col-md-6 col-md-offset-3">
							<div className="alert alert-info">
									Username: test<br />
									Password: test
							</div>
							<h2>Login</h2>
							<form name="form" onSubmit={this.handleSubmit}>
								<div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
										<label htmlFor="username">Username</label>
										<input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
										{submitted && !username &&
												<div className="help-block">Username is required</div>
										}
								</div>
								<div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
										<label htmlFor="password">Password</label>
										<input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
										{submitted && !password &&
												<div className="help-block">Password is required</div>
										}
								</div>
								<div className="form-group">
										<button className="btn btn-primary">Login</button> 
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({ 
	loginIn: state.loginIn,
	user: state.user,
	token: state.token
})

const mapDispatchToProps = (dispatch, props) => ({ 
  dispatchLogin(username, password) {
		dispatch(login(username, password))
	}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)