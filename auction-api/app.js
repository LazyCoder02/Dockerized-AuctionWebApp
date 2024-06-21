const express = require("express");
const cors = require("cors");
const app = express();
const stripe = require("stripe")('sk_test_51PJ2BDP1QytsEo5aGArjBS7PoZgiafH5ZhN70Ycqznirp19y4wbbPKsE290P1IfOui7VmVIXgg3RnKwqSI7vqhGR00K9awoqQf');
const PORT = 3030;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");
const paymentRoutes = require("./routes/payments");

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/status", (req, res) => {
  const status = {
    Status: "Running",
  };
  res.send(status);
});

app.listen(PORT, () => {
  console.log("Server Listening on Port: ", PORT);
});
