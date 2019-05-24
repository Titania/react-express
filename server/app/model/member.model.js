module.exports = (sequelize, Sequelize) => {
	const Member = sequelize.define('member', {
		name: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		phonenumber: {
			type: Sequelize.STRING
		},
		donation: {
			type: Sequelize.STRING
		}
	});
	
	return Member;
}