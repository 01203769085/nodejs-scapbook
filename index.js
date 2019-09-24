const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

//routes
const routeIndex = require("./routes/routeIndex");
const routeBlogs = require("./routes/routeBlogs");

//config
app.use(cors());
app.use("/", routeIndex);
app.use("/blogs", routeBlogs);

app.listen(process.env.PORT || port);
