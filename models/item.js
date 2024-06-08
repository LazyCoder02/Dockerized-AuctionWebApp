const db = require("../dataBase/db");
const createProduct = require('./createProduct');

class Item {
  static async addItem(item, callback) {
    const { name, quantity, price, category, description } = item;
    try {
      const result = await createProduct(name, description, price);

      const sql =
        " INSERT INTO auction (productName, quantity, pricePerUnit, productCategory, productDescription, stripePriceID) VALUES (?, ?, ?, ?, ?, ?)";
      db.run(sql, [name, quantity, price, category, description, result.productPrice.id], function(err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id: this.lastID, ...item, stripePriceID: result.productPrice.id });
        }
      });
    } catch (error) {
      callback(error, null);
    }
  }

  static getItem(id, callback) {
    const sql = "SELECT * FROM auction WHERE productID = ?";
    db.get(sql, [id], (err, row) => {
      callback(err, row);
    });
  }

  static getAllItems(callback) {
    const sql = "SELECT * FROM auction";
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  }

  static editItem(id, item, callback) {
    const { name, quantity, price, category, description } = item;
    const sql =
      "UPDATE auction SET productName = ?, quantity = ?, pricePerUnit = ?, productCategory = ?, productDescription = ?  WHERE id = ?";
    db.run(sql, [name, quantity, price, category, description, id], (err) => {
      callback(err, { id, ...item });
    });
  }

  static removeItem(id, callback) {
    const sql = "DELETE FROM auction WHERE id = ?";
    db.run(sql, [id], (err) => {
      callback(err, this.changes);
    });
  }
}

module.exports = Item;
