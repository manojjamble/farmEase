const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');

connectDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/user", require("./routes/user"));
app.use("/api/owner", require("./routes/owner"));
app.use("/api/machine", require("./routes/machine"));
app.use("/api/booking", require("./routes/booking"));
app.use("/api/review", require("./routes/review"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/location", require("./routes/location"));
app.use("/api/notification", require("./routes/notification"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

