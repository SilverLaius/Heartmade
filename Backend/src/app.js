const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mySql = require("mysql");
const app = express();
const config = require("../config/config");
const SELECT_ALL_QUERY = "SELECT * FROM test";

app.use(bodyParser.json());
app.use(cors());

const connection = mySql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database
});

connection.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", (req, res) => {
  res.send("go to /products to see products list");
});

app.get("/products", (req, res) => {
  connection.query(SELECT_ALL_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

app.post("/upload", (req, res) => {
  const formData = req.body;
  const postQuery = `INSERT INTO test (productname, product_description, image_src) values ('${
    formData.productName
  }', '${formData.productDescription}', '${formData.productImageSrc}');`;
  connection.query(postQuery, (err, results) => {
    if (err) throw err;
  });
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
