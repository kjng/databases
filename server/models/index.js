var db = require('../db');

// Database Query Helpers

// Insert user
var insertUser = function(user, callback) {
  db.query(`INSERT INTO users (username) VALUES ("${user}")`, function(err) {
    if (err) {
      throw err;
    }
    if (callback) { callback(); }
  });
};

// Insert message (depends on inserUser)
var insertMessage = function(user, message, roomname, callback) {
  db.query(`INSERT INTO messages (user_id, text, roomname) VALUES ((SELECT id FROM users WHERE username = "${user}"), "${message}", "${roomname}")`, function(err) {
    if (err) {
      // If username is not in users table, adds it
      insertUser(user);
      insertMessage(user, message, roomname, callback);
    } else if (callback) {
      callback();
    }
  });
};

var result;

module.exports = {
  messages: {
    get: function(callback) {
      db.query('SELECT messages.id, users.username, messages.text, messages.roomname FROM messages INNER JOIN users ON users.id = messages.user_id;', function(err, results) {
        if (err) {
          throw err;
        }
        callback(results);
      });
    }, // a function which produces all the messages
    post: function(reqBody, callback) {
      var user = reqBody.username;
      var message = reqBody.message;
      var roomname = reqBody.roomname;

      // Inserts message into messages table
      insertMessage(user, message, roomname, callback);
    }
  },

  users: {
    get: function(callback) {
      db.query('SELECT username FROM users;', function(err, results) {
        if (err) {
          throw err;
        }
        callback(results);
      });
    },
    post: function(reqBody, callback) {
      var user = reqBody.username;
      //  Insert user into users table
      insertUser(user, callback);
    }
  }
};
