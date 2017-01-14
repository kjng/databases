var db = require('../db');

// Database Query Helpers

// Insert user
var insertUser = function(user) {
  db.query(`INSERT INTO users (username) VALUES ("${user}")`);
};

var insertMessage = function(user, message, roomname) {
  db.query(`INSERT INTO messages (user_id, text, roomname) VALUES ((SELECT id FROM users WHERE username = "${user}"), "${message}", "${roomname}")`, function(err) {
    if (err) {
      insertUser(user);
      insertMessage(user, message, roomname);
    }
  });
};

// INSERT INTO messages (user_id, text, roomname) VALUES ((SELECT id FROM users WHERE username = "daniel"), "hello", "hell");

// insertMessage('daniel', 'hello', 'hell');

module.exports = {
  messages: {
    get: function() {}, // a function which produces all the messages
    post: function(reqBody) {
      var user = reqBody.username;
      var message = reqBody.message;
      var roomname = reqBody.roomname;

      insertMessage(user, message, roomname);
      // If username is not there, insert username
      // Insert message using user id
    }
    // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function() {},
    post: function(reqBody) {
      var user = reqBody.username;
      //   insert into users tables
      insertUser(user);
    }
  }
};
