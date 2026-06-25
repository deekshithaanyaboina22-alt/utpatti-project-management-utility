const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/tasks");


dotenv.config();
connectDB();
const app = express();


app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Utpatti Backend Running",
  });
});

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});