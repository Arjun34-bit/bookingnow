const express = require("express");
const path = require("path");
const gateway = require("express-gateway");
const cors = require("cors");

const app = express();

app.use(cors);

gateway().load(path.join(__dirname, "config")).run();
