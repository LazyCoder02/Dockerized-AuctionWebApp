// models/user.js

const db = require("../dataBase/db");

class User {
  static addUser(user, callback) {
    const { name, email, password } = user;
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.run(sql, [name, email, password], function (err) {
      callback(err, { id: this.lastID, ...user });
    });
  }

  static getUser(id, callback) {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      callback(err, row);
    });
  }

  static getAllUsers(callback) {
    const sql = "SELECT * FROM users";
    db.all(sql, (err, rows) => {
      callback(err, rows);
    });
  }

  static editUser(id, user, callback) {
    const { name, email, password } = user;
    const sql =
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
    db.run(sql, [name, email, password, id], function (err) {
      callback(err, { id, ...user });
    });
  }

  static deleteUser(id, callback) {
    const sql = "DELETE FROM users WHERE id = ?";
    db.run(sql, [id], function (err) {
      callback(err, this.changes);
    });
  }

  static authenticateUser(email, password, callback) {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], (err, user) => {
      if (err) {
        callback(err);
        return;
      }

      if (!user) {
        callback(null, null); // User not found
        return;
      }

      if (user.password === password) {
        callback(null, user); // Password matches
      } else {
        callback(null, false); // Password does not match
      }
    });
  }
}

module.exports = User;
