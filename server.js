import express from "express";
import pg from "pg";

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new pg.Pool({
  database: "donutshop",
});

app.use(express.static("static"));

app.get("/api/donutshop", (req, res, next) => {
  pool
    .query("SELECT * FROM donutshop")
    .then((result) => {
      res.send(result.rows);
      //   console.log(result.rows);
    })
    .catch(next);
});

app.get("/api/donutshop/:id", (req, res, next) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM donutshop WHERE shop_id = $1;", [id])
    .then((data) => {
      const shop = data.rows[0];
      if (shop) {
        res.send(shop);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next);
});

app.get("/api/customers/:id", (req, res, next) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM customers WHERE customer_id = $1;", [id])
    .then((data) => {
      const customer = data.rows[0];
      if (customer) {
        res.send(customer);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next);
});

app.get("/api/customers", (req, res, next) => {
  pool
    .query("SELECT * FROM customers")
    .then((result) => {
      res.send(result.rows);
    })
    .catch(next);
});

app.post("/api/donutshop", (req, res, next) => {
    const newDonut = req.body.donut;
    // const newDrink = req.body.drink;
   
  pool
    .query("INSERT INTO donutshop(donut) VALUES($1) RETURNING *;", [newDonut])
    .then((data) => {
      if (req.body) {
        res.send(data);
        console.log(data);
      } else {
        res.sendStatus(400);
      }
    })
    .catch(next);
});

app.use((err, req, res, next) => {
  return res
    .set("content-type", "text/plain")
    .status(500)
    .send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
