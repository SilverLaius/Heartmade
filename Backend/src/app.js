const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mySql = require("mysql");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const mime = require("mime");
const app = express();
const server = require("http").createServer(app);
const config = require("../config/config");
const io = require("socket.io").listen(server);
const passHash = require("./hashing");

server.listen(3001, () => {
  console.log("Listening on port 3001");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//app.use(express.static(`${__dirname}/../../client/build`));

// configuring multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/png") {
      cb(null, path.join(__dirname, "../public/img"));
    } else if (file.mimetype === "image/jpeg") {
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

app.post("/register", upload.any(), (req, res) => {
  const email = req.body.email;
  const checkQuery = `SELECT KasutajaID FROM Kasutajad WHERE E_post = '${email}'`;
  connection.query(checkQuery, (err, results) => {
    if (err) throw err;
    if (results[0] == null) {
      const userID = req.body.userid;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const date = req.body.date;
      const salt = passHash.salt(16);
      const hashedPass = passHash.hash(req.body.password, salt);
      const postQuery = `INSERT INTO Kasutajad (KasutajaID, Eesnimi, Perekonnanimi, E_post, Parool, LiikID, Liitunud, StaatusID, Salt) values ('${userID}' ,'${firstname}', '${lastname}', '${email}', '${hashedPass}', '1', '${date}', '1', '${salt}');`;
      connection.query(postQuery, (err, results) => {
        if (err) throw err;
      });
      res.send("user created");
    } else {
      res.send("email exists");
    }
  });
});

app.post("/login", upload.any(), (req, res) => {
  const email = req.body.email;
  checkQuery = `SELECT Salt, Parool, LiikID, StaatusID FROM Kasutajad WHERE E_post = '${email}'`;
  connection.query(checkQuery, (err, results) => {
    if (err) throw err;
    const kasutaja = results[0];
    if (kasutaja == null) {
      console.log("user doesnt exist");
      res.send("user doesn't exist");
    } else {
      const salt = kasutaja.Salt;
      const hashedPass = passHash.hash(req.body.password, salt);
      if (hashedPass === kasutaja.Parool) {
        console.log("Logged in");
      } else {
        console.log("wrong password");
      }
    }
  });
});

app.get("/products", (req, res) => {
  const productsQuery =
    "SELECT * FROM Tooted JOIN Toodete_pildid ON Tooted.Tootekood = Toodete_pildid.Tootekood;";
  connection.query(productsQuery, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/image/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/img/", req.params.id));
});

app.post("/upload", upload.array("productImage"), (req, res) => {
  const productID = req.body.productID;
  const productPrice = req.body.productPrice;
  const productName = req.body.productName;
  const productDateAdded = req.body.productDateAdded;
  const productType = req.body.productType;
  const productStatus = req.body.productStatus;

  const postQuery = `INSERT INTO Tooted (Tootekood, Hind, Kirjeldus, Lisamisaeg, LiikID, StaatusID) values ('${productID}' ,'${productPrice}', '${productName}', '${productDateAdded}', '${productType}', '${productStatus}');`;
  connection.query(postQuery, (err, results) => {
    if (err) throw err;
  });

  for (let i = 0; i < req.files.length; i++) {
    const productImageSrc = req.files[i].filename;
    connection.query(
      `INSERT INTO Toodete_pildid (Nimetus, Tootekood) values ('${productImageSrc}', '${productID}');`,
      (err, results) => {
        if (err) throw err;
      }
    );
  }
  res.send();
});

io.sockets.on("connection", socket => {
  console.log("made socket connection");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("NEW_PRODUCT_UPLOADED", data => {
    const productsQuery = `SELECT * FROM Tooted JOIN Toodete_pildid ON Tooted.Tootekood = Toodete_pildid.Tootekood WHERE Toodete_pildid.Tootekood = ${
      data.productID
    };`;
    connection.query(productsQuery, (err, results) => {
      if (err) throw err;
      io.emit("NEW_PRODUCT_UPLOADED", results);
    });
  });
});
