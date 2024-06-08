// 200 = Succesful retrieval or update
// 201 = Succesful creation
// 204 = Succesful deletion
// 400 = Bad request
// 404 = Item not found
const fs = require('fs');
const path = require('path');
const Item = require("../models/item");

exports.addItem = (req, res) => {
  Item.addItem(req.body, (err, item) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json(item);
  });
};

exports.getItem = (req, res) => {
  Item.getItem(req.params.id, (err, item) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  });
};

exports.getAllItems = (req, res) => {
  Item.getAllItems((err, items) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(items);
  });
};

const getItemById = (id, callback) => {
  Item.getItem(id, (err, item) => {
    if (err) {
      console.error('Error fetching item:', err);
      return callback(err);
    }
    console.log('itemInfo:', item);
    callback(null, item);
  });
};


exports.downloadItem = (req, res) => {
  const { id } = req.params;
  getItemById(id, (err, item) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const fileName = `item-${id}.json`;
    const filePath = path.join(__dirname, '..', 'downloads', fileName);

    // Ensure the downloads directory exists
    if (!fs.existsSync(path.join(__dirname, '..', 'downloads'))) {
      fs.mkdirSync(path.join(__dirname, '..', 'downloads'));
    }

    fs.writeFile(filePath, JSON.stringify(item, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
        return res.status(500).send('Could not create JSON file');
      }

      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
          return res.status(500).send('Could not download the file');
        } else {
          // Clean up the file after download
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting the file:', unlinkErr);
            }
          });
        }
      });
    });
  });
};

exports.editItem = (req, res) => {
  Item.editItem(req.params.id, req.body, (err, item) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(item);
  });
};

exports.deleteItem = (req, res) => {
  Item.deleteItem(req.params.id, (err, changes) => {
    if (err) return res.status(400).json({ error: err.message });
    if (changes === 0) return res.status(404).json({ error: "Item not found" });
    res.status(204).send();
  });
};
