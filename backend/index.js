const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const User = require('./models/user');

connectDB();
const app = express();
const port = process.env.PORT || 3000;
// middleware/upload.js
const multer = require('multer');
// Configure multer for file upload
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

app.use(express.json());

// Route to handle file upload
app.post('/upload', upload.single('avatar'), async (req, res) => {
    try {
      const { name, mobile, password } = req.body;
      const user = new User({ name, mobile, password, avatar: req.file.buffer });
      await user.save();
      res.status(201).send('File uploaded successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

app.use("/api/user", require("./routes/user"));
app.use("/api/owner", require("./routes/owner"));
app.use("/api/machine", require("./routes/machine"));
app.use("/api/booking", require("./routes/booking"));
app.use("/api/review", require("./routes/review"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/notification", require("./routes/notification"));
app.use("/api/image", require("./routes/image"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

