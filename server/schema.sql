DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

-- Table 'users'

CREATE TABLE users (
  id INTEGER NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

-- Table 'messages'

CREATE TABLE messages (
  id INTEGER NOT NULL AUTO_INCREMENT,
  user_id INTEGER NULL,
  text VARCHAR(255) NULL,
  roomname VARCHAR(255) NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
