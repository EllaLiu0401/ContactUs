const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env.dev" });

const contactRoutes = require("./routes/contacts");

const app = express();

const port = process.env.API_HOST_PORT || 9000;
const clientUrl = process.env.CLIENT_HOST_URL || "http://localhost:3000";

app.use(
  cors({
    origin: clientUrl,
    methods: "GET,POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api`);
});
