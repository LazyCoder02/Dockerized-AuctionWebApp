const User = require("../models/user");

exports.addUser = (req, res) => {
  User.addUser(req.body, (err, user) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(user);
  });
};

exports.getUser = (req, res) => {
  User.getUser(req.params.id, (err, user) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  });
};

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(users);
  });
};

exports.editUser = (req, res) => {
  User.editUser(req.params.id, req.body, (err, user) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(user);
  });
};

exports.deleteUser = (req, res) => {
  User.deleteUser(req.params.id, (err, changes) => {
    if (err) return res.status(400).json({ error: err.message });
    if (changes === 0) return res.status(404).json({ error: "User not found" });
    res.status(204).json({ message: "User deleted successfully" });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log("email:", email);
  User.authenticateUser(email, password, (err, user) => {
    if (err) {
      console.error("Error authenticating user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("were here");
    res.status(200).json({ message: "Login successful", user });
  });
};
