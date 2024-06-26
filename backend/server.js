require("dotenv").config();

const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const auth = require("./src/routers/auth");
const accounts = require("./src/routers/accounts");
const employees = require("./src/routers/employees");
const departments = require("./src/routers/departments");
const leaves = require("./src/routers/leaves");
const expenses = require("./src/routers/expenses");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/api", accounts);
app.use("/api", employees);
app.use("/api", departments);
app.use("/api", leaves);
app.use("/api", expenses);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
