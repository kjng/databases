var models = require('../models');

module.exports = {
  messages: {
    get: function(req, res) {}, // a function which handles a get request for all messages
    // send request to model
      // send status
    post: function(req, res) {
      models.messages.post(req.body, function() {
        res.sendStatus(200);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function(req, res) {},
    post: function(req, res) {
      // pass req to models.users.post
      models.users.post(req.body, function() {
        res.sendStatus(200);
      });
    }
  }
};
