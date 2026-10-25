require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./config/db");

const port = process.env.PORT || 3000;

connectDB()
  .then(() => app.listen(port, () => console.log(`Server running at http://localhost:${port}`)))
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
