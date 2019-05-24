const express = require('express');
const bodyParser = require('body-parser');
const faker = require("faker");
const times = require("lodash.times");
const random = require("lodash.random");
const cors = require("cors");

// import passport and passport-jwt modules
const passport = require("passport");
const passportJWT = require("passport-jwt");

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "qwerty123";

// create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log("payload received", jwt_payload);
    let user = getUser({ id: jwt_payload.id });
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  // use the strategy
  passport.use(strategy);

const app = express();
app.use(cors());
// initialize passport with express
app.use(passport.initialize());
// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/config/db.config.js');

// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
    db.members.bulkCreate(
        times(20, () => ({
            name: faker.name.firstName()+""+faker.name.lastName(),
            email: faker.internet.email(),
            phonenumber: faker.phone.phoneNumber(),
            donation: faker.random.number(50) * 10000, 
        }))
    );
    db.users.findOrCreate({
        where: {
            username: 'test',
            password: 'test'
        }
    });
    console.log('Drop and Resync with { force: true }');
});

const getUser = async obj => {
    return await db.users.findOne({
        where: obj,
    });
};

require('./app/route/member.route.js')(app);
require('./app/route/user.route.js')(app);
require('./app/route/authenticate.route.js')(app);

// Create a Server
const server = app.listen(8081, function () {
 
    const host = server.address().address
    const port = server.address().port
   
    console.log("App listening at http://%s:%s", host, port)
})