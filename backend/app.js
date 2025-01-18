const express = require("express");
const app = express();
require("./conn/conn"); // Ensure this file connects to the database properly
require("dotenv").config();
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");

app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Use UserAPI for /api/v1 routes
app.use("/api/v1", UserAPI);
app.use("/api/v2", TaskAPI); // Make sure this is correctly prefixed

// Fallback route
app.use("/", (req, res) => {
    res.send("Hello from backend side");
});

// Start the server
const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
