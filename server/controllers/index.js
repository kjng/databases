var models = require('../models');

module.exports = {
  messages: {
    get: function(req, res) {}, // a function which handles a get request for all messages
    post: function(req, res) {
      models.messages.post(req.body);
      res.sendStatus(200);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function(req, res) {},
    post: function(req, res) {
      // console.log(req.body);
      // pass req to models.users.post(req.body, res.sendStatus(200))
      models.users.post(req.body);
      res.sendStatus(200);
      // if (models.users.post(req.body)) {
      //   console.log('200');
      //   res.sendStatus(200);
      // } else {
      //   console.log('404');
      //   res.sendStatus(404);
      // }
    }
  }
};
