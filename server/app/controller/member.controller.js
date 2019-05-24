const db = require('../config/db.config.js');
const Member = db.members;

// Post a Member
exports.create = (req, res) => {	
	// Save to MySQL database
	Member.create({  
	  name: req.body.name,
	  email: req.body.email,
		phonenumber: req.body.phonenumber,
		donation: req.body.donation
	}).then(member => {		
		// Send created member to client
		res.send(member);
	});
};

// FETCH all Members
exports.findAll = (req, res) => {
	Member.findAll().then(members => {
	  // Send all members to Client
	  res.send(members);
	});
};

// Find a Member by Id
exports.findByPk = (req, res) => {	
	Member.findByPk(req.params.memberId).then(member => {
		res.send(member);
	})
};

// Update a Member
exports.update = (req, res) => {
	const id = req.params.memberId;
	Member.update( { name: req.body.name, email: req.body.email, phonenumber: req.body.phonenumber, donation: req.body.donation }, 
		{ where: {id: req.params.memberId} }
	).then(() => {
		res.status(200).send("updated successfully a member with id = " + id);
	});
};
 
// Delete a Member by Id
exports.delete = (req, res) => {
	const id = req.params.memberId;
	Member.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a member with id = ' + id);
	});
};