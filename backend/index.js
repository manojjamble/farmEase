const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');


  
connectDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

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

