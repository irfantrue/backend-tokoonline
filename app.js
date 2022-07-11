const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
require(`dotenv/config`);
const cors = require("cors");
require(`express-static`);
const path = require(`path`);
// const users = require(`./models/userdb`);
// const kategori = require(`./models/kategori`);
// const produk = require(`./models/produk`);
// const keranjang = require(`./models/keranjang`);
// const transaksi = require(`./models/transaksi`);
const pembayaran = require(`./models/pembayaran`);
// DB
const db = require(`./database`);

try {
  db.authenticate();
  console.log(`Database Connected`);
  // db.sync(pembayaran);
  // pembayaran.sync({alter: true});
} catch (error) {
  console.log(error);
}

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// STATIC FOLDER
app.use(express.static(path.join(__dirname, `/public`)));

// SET ENGINE EJS
app.set(`view engine`, `ejs`);

// IMPORT ROUTE
const routing = require(`./routes/routing`);

// ROUTE
app.use(`/`, routing);

// HANDLING ERROR PAGE
app.use((req, res, next) => {
  res.status(404);

  res.format({
    default: function () {
      res.type("txt").send("Page Not found");
    },
  });
});

app.listen(process.env.PORT, `0.0.0.0`, () => {
  console.log(`Run on Port ${process.env.PORT}`);
});