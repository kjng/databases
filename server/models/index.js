var db = require('../db');

// Database Query Helpers

// Insert user
var insertUser = function(user, callback) {
  db.query(`INSERT INTO users (username) VALUES ("${user}")`, function(err) {
    if (err) { throw err; }
    callback();
  });
};

// Insert message (depends on inserUser)
var insertMessage = function(user, message, roomname, callback) {
  db.query(`INSERT INTO messages (user_id, text, roomname) VALUES ((SELECT id FROM users WHERE username = "${user}"), "${message}", "${roomname}")`, function(err) {
    if (err) {
    // If username is not in users table, adds it
      insertUser(user);
      insertMessage(user, message, roomname);
    } else {
      callback();
    }
  });
};

var result;

// db.query(`SELECT users.username, messages.text, messages.roomname FROM messages INNER JOIN users ON users.id = messages.user_id;`, function(err, results) {
//   result = results;
//   result = result.map((message) => ({username: message.username, text: message.text, roomname: message.roomname}));
//   console.log(result);
// });

// Queries db for messages with username, text, roomname...
// SELECT users.username, messages.text, messages.roomname FROM messages INNER JOIN users ON users.id = messages.user_id;

// Queries db for usernames
// SELECT username FROM users;

// INSERT INTO users (username) VALUES ("daniel");
// INSERT INTO messages (user_id, text, roomname) VALUES ((SELECT id FROM users WHERE username = "daniel"), "hello", "hell");

// insertMessage('daniel', 'hello', 'hell');

module.exports = {
  messages: {
    get: function(callback) {
      db.query('SELECT users.username, messages.text, messages.roomname FROM messages INNER JOIN users ON users.id = messages.user_id;', function(err, results) {
        if (err) { throw err; }
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
        if (err) { throw err; }
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

// db.query('INSERT INTO users (username) VALUES ("daniel");');
// db.query('SELECT username FROM users;', function(err, results) {
//         if (err) { console.log(err); }
//         console.log(results);
//       });
