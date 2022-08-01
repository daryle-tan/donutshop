import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === "production"
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
});

app.use(express.static("static"));

app.get("/api/donutshop", (req, res, next) => {
  pool
    .query("SELECT * FROM donutshop")
    .then((result) => {
      res.send(result.rows);
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

app.patch("/api/donutshop/:id", (req, res, next) => {
  const index = req.params.id;
  const body = req.body;
  console.log(body);
  pool
    .query(
      `UPDATE donutshop SET donut = COALESCE($1, donut),
                            drink = COALESCE($2, drink),
                            price = COALESCE($3, price),
                            price = COALESCE($4, days_open),
                            price = COALESCE($5, supplier),
                            price = COALESCE($6, employee),
                        WHERE id = COALESCE($7, id)
                        RETURNING *;`,
      [
        body.donut,
        body.drink,
        body.price,
        body.days_open,
        body.suppler,
        body.employee,
        index,
      ]
    )
    .then((data) => {
      if (body) {
        console.log("here");
        res.send(data.rows);
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

// const dbConfig = {
//   connectionString: process.env.DATABASE_URL,
//   ...(process.env.NODE_ENV === "production"
//     ? {
//         ssl: {
//           rejectUnauthorized: false,
//         },
//       }
//     : {}),
// };
