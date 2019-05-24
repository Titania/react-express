module.exports = function(app) {
 
    const members = require('../controller/member.controller.js');
 
    // Create a new Member
    app.post('/api/members', members.create);
 
    // Retrieve all Member
    app.get('/api/members', members.findAll);
 
    // Retrieve a single Member by Id
    app.get('/api/members/:memberId', members.findByPk);
 
    // Update a Member with Id
    app.put('/api/members/:memberId', members.update);
 
    // Delete a Member with Id
    app.delete('/api/members/:memberId', members.delete);
}