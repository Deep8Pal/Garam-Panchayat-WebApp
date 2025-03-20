const express = require("express");
const cors = require("cors");
const user = require("./routes/user");
const application = require("./routes/application");
const applicationForm = require("./routes/applicationForm");
const applicationOrder = require("./routes/applicationOrder");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 7000;
app.use(cors());
app.use(express.json());

//Connection
require("./conn/conn");

app.use(cors());
//Calling Routes
app.use("/api/v1", user);
app.use("/api/v1", application);
app.use("/api/v1", applicationForm);
app.use("/api/v1", applicationOrder);

//SERVER
app.listen(process.env.PORT, () => {
  console.log(`🔥 Server Started at PORT : ${process.env.PORT} `);
});
