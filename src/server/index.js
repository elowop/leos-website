const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const calendarEventsRouter = require('./routes/calendarEvents');
const usersRouter = require('./routes/users');
const loginsRouter = require('./routes/logins');

app.use('/calendarEvents', calendarEventsRouter);
app.use('/users', usersRouter);
app.use('/logins', loginsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});