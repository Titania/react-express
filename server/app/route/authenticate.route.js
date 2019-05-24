const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const db = require('../config/db.config.js');
const User = db.users;

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'qwerty123';

const getUserByName = (req, res) => {
	const { username, password } = req.body;

	if ( username && password ) {
		User.findOne({where: {username: username} }).then(user => {  
			if (user.password === password) {
				// from now on we’ll identify the user by the id and the id is
				// the only personalized value that goes into our token
				let payload = { id: user.id };
				let token = jwt.sign(payload, jwtOptions.secretOrKey);
				res.json({ msg: "ok", token: token, user: user });
			} else {
				res.status(401).json({ msg: "Password is incorrect" });
			}
		}).catch(err=> {
			console.log(err)
			res.status(401).json(err);
		})
	} else {
		res.json({ data: 'Username or password is null' });
	}
};

module.exports = function(app) {
	app.post('/api/login', getUserByName); 

	app.get('/api/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
		res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
	});
}