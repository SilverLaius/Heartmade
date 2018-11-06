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
var UAParser = require("ua-parser-js");
const nodemailer = require("nodemailer");

server.listen(3001, () => {
  console.log("Listening on port 3001");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(`${__dirname}/../../client/build`));

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
  database: config.database.database,
  multipleStatements: true
});

connection.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

app.post("/stats", upload.any(), (req, res) => {
  const page = req.body.page;
  const date = req.body.date;
  const ip = (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
  ).replace(/^.*:/, "");
  var parser = new UAParser();
  var ua = req.headers["user-agent"];
  var browserName = parser.setUA(ua).getBrowser().name;
  const postQuery = `INSERT INTO Statistika (ip, aeg, lehekülg,brauser) VALUES ('${ip}','${date}','${page}','${browserName}');`;
  connection.query(postQuery, (err, results) => {
    if (err) throw err;
  });
  res.end();
});

app.get("/stats", (req, res) => {
  const popKülastaajaQuery =
    "SELECT ip, COUNT(*) AS magnitude FROM Statistika GROUP BY ip ORDER BY magnitude DESC LIMIT 1;";
  const popLehtQuery =
    "SELECT lehekülg, COUNT(*) as magnitude FROM Statistika GROUP BY lehekülg ORDER BY magnitude DESC LIMIT 1;";
  const popBrauserQuery =
    "SELECT brauser, COUNT(*) as magnitude FROM Statistika GROUP BY brauser ORDER BY magnitude DESC LIMIT 1;";
  const popKellQuery =
    "SELECT HOUR(aeg) as h, COUNT(*) as magnitude FROM Statistika GROUP BY h ORDER BY magnitude DESC LIMIT 1;";
  connection.query(
    popKülastaajaQuery + popLehtQuery + popBrauserQuery + popKellQuery,
    (err, results) => {
      if (err) throw err;
      data = {
        külastaja: results[0][0].ip,
        lehekülg: results[1][0].lehekülg,
        brauser: results[2][0].brauser,
        kell: results[3][0].h
      };
      res.send(data);
    }
  );
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "heartmade.dev@gmail.com",
    pass: config.mail.password
  }
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

  const mailOptions = {
    from: '"Heartmade" <heartmade.dev@gmail.com>',
    to: email,
    subject: "Registration to Heartmade",
    text: "You have successfully registered to kertupertu.de."
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
});

app.post("/login", upload.any(), (req, res) => {
  const email = req.body.email;
  checkQuery = `SELECT Salt, Parool, LiikID, StaatusID FROM Kasutajad WHERE E_post = '${email}'`;
  connection.query(checkQuery, (err, results) => {
    if (err) throw err;

    const kasutaja = results[0];
    if (kasutaja == null) {
      res.send(false);
    } else {
      const salt = kasutaja.Salt;
      const hashedPass = passHash.hash(req.body.password, salt);
      if (hashedPass === kasutaja.Parool) {
        res.send(true);
      } else {
        res.send(false);
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

app.get("/productcount", (req, res) => {
  const productCountQuery =
    "SELECT COUNT(*) as count FROM Tooted JOIN Toodete_pildid ON Tooted.Tootekood = Toodete_pildid.Tootekood;";
  connection.query(productCountQuery, (err, results) => {
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
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
