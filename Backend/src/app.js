const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mySql = require("mysql");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const mime = require("mime");
const app = express();
const config = require("../config/config");
const SELECT_ALL_QUERY = "SELECT * FROM Kasutajad";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(`${__dirname}/../../client/build`));

// configuring multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/png") {
      cb(null, path.join(__dirname, "../public/img"));
    }
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      cb(
        null,
        raw.toString("hex") +
          Date.now() +
          "." +
          mime.getExtension(file.mimetype)
      );
    });
  }
});
const upload = multer({ storage });

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
  /*connection.query(SELECT_ALL_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  }); */
  return res.json({
    data: {}
  });
});

app.get("/image/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/img/", req.params.id));
});

app.post(
  "/upload",
  upload.fields([
    {
      name: "productName",
      maxCount: 1
    },
    {
      name: "productDescription",
      maxCount: 1
    },
    {
      name: "productImage",
      maxCount: 1
    }
  ]),
  (req, res, next) => {
    const productImageSrc = req.files["productImage"][0].filename;
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;

    const postQuery = `INSERT INTO test (productname, product_description, image_src) values ('${productName}', '${productDescription}', '${productImageSrc}');`;
    connection.query(postQuery, (err, results) => {
      if (err) throw err;
    });
  }
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
