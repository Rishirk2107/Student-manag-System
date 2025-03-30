import express from "express";
import adminRoutes from "./routes/adminRoutes";
import sequelize from "./config/database";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// Sync Database
sequelize.sync({ alter: true }).then(() => {
  console.log("Database schema updated");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
