import React, {Component} from 'react';
import { getUser, addMember } from '../redux/action';
import { connect } from 'react-redux';

class NewPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			email: '',
			phonenumber: '',
			donation: '',
			submitted: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { name, email, phonenumber, donation } = this.state;
		const { dispatchAddMember } = this.props;
		if (name && email && phonenumber && donation) {
			dispatchAddMember(name, email, phonenumber, donation);
		}
	}

	handleChange(e){
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	componentWillReceiveProps(nextProps) {
		const { member, history } = this.props;

		if (nextProps.member != member) {
			alert('Member added successfully')
			history.push('/')
		}
	}

	render() {
		const { name, email, phonenumber, donation, submitted } = this.state;
		
		return (    
			<div className="container">
				<h1>Add Member</h1>
				<form name="form" onSubmit={this.handleSubmit}>
					<div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
						<label htmlFor="name">Name</label>
						<input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} />
						{submitted && !name &&
										<div className="help-block">Name is required</div>
						}
					</div>
					<div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
						<label htmlFor="e">Email</label>
						<input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
						{submitted && !email &&
										<div className="help-block">Email is required</div>
						}
					</div>
					<div className={'form-group' + (submitted && !phonenumber ? ' has-error' : '')}>
						<label htmlFor="phonenumber">Phonenumber</label>
						<input type="text" className="form-control" name="phonenumber" value={phonenumber} onChange={this.handleChange} />
						{submitted && !phonenumber &&
										<div className="help-block">Phonenumber is required</div>
						}
					</div>
					<div className={'form-group' + (submitted && !donation ? ' has-error' : '')}>
						<label htmlFor="donation">Donation</label>
						<input type="text" className="form-control" name="donation" value={donation} onChange={this.handleChange} />
						{submitted && !donation &&
										<div className="help-block">Donation is required</div>
						}
					</div>
					<div className="form-group">
						<button className="btn btn-primary">Submit</button> 
					</div>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
    member: state.member.result.data
})
  
const mapDispatchToProps = (dispatch) => ({
	dispatchAddMember(name, email, phonenumber, donation) {
		dispatch(addMember(name, email, phonenumber, donation))
	}
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPage)