const express = require("express");
const mongoose = require("mongoose");
const app = express();
const route = require('../Project-1-Blogging/routes/route')
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://dk7696822:wnyQpzrA3d4AcykC@cluster0.hef809l.mongodb.net/dk7696822?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MOngoDB connected successfully"))
  .catch((err) => {
    console.log(err.message);
  });
app.use("/", route);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
