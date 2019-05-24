import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { getMember, editMember, deleteMember } from '../redux/action';

class MemberPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      modalIsOpen: false,
      id: '',
			name: '',
			email: '',
			phonenumber: '',
      donation: '',
      submitted: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteData = this.deleteData.bind(this)
  }
  
  openModal(member) {
    this.setState({
        modalIsOpen: true,
        id: member.id,
        name: member.name,
        email: member.email,
        phonenumber: member.phonenumber,
        donation: member.donation,
    });
  }

  closeModal() {
      this.setState({
          modalIsOpen: false
      });
  }

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true, modalIsOpen: false });
		const { id, name, email, phonenumber, donation } = this.state;
		const { dispatchEditMember } = this.props;
		if (name && email && phonenumber && donation) {
			dispatchEditMember(id, name, email, phonenumber, donation);
    }
	}

	handleChange(e){
		const { name, value } = e.target;
		this.setState({ [name]: value });
  }
  
  deleteData(member){
    this.props.dispatchDeleteMember(member.id)
  }

  componentDidMount() {
    console.log('componentdidmount')
  }

  componentWillMount() {
    this.props.dispatchGetMember();
  }
  
  componentWillReceiveProps(nextProps) {
    const { member, dispatchGetMember } = this.props;

    if (nextProps.member != member){
      dispatchGetMember();
    }
  }

  render() {
    const { id, name, email, phonenumber, donation, submitted } = this.state; 
    const { members } = this.props;
    const style = { content: {top: '150px', width: '50%', margin: '0 auto' }};
    
    console.log('render')
    console.log(members)

    return (
      <div className="container">
        <h1>Members</h1>
        <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Donation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {members && members.map(member =>
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phonenumber}</td>
                <td>{member.donation}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => this.openModal(member)}>Edit</button> 
                  <button className="btn btn-danger" onClick={() => this.deleteData(member)}>Delete</button>
                </td>
              </tr>
            )}
            
            <Modal style={style}
                  isOpen={this.state.modalIsOpen} 
                  onRequestClose={this.closeModal}
                  contentLabel="Edit Member" >
                    <h3>Edit Member</h3>
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
            </Modal>
        </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ 
  members: state.members.result.data,
  member: state.member.result.data,
})

const mapDispatchToProps = (dispatch, ownProps) => ({ 
  dispatchGetMember() {
    dispatch(getMember())
  },
  dispatchEditMember(id, name, email, phonenumber, donation) {
		dispatch(editMember(id, name, email, phonenumber, donation))
  },
  dispatchDeleteMember(id) {
    dispatch(deleteMember(id))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberPage)