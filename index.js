const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.post("/create-payment", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      payment_method_types: ["card"],
    });
    res.json({ statusCode: 200, paymentIntent: paymentIntent });
  } catch (error) {
    res.json({ statusCode: 400, message: error });
  }
});

app.get("/create-payment", (req, res) => {
  res.send("stripe server for payment with node and express");
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
