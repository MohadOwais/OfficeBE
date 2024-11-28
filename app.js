// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const Routes = require("./routes");
// const cors = require("cors");
// const uploads = require("./uploads");

// const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(Routes);
// app.use(uploads);

// mongoose
//   .connect("mongodb://127.0.0.1:27017/Employee", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(8081, () => {
//       console.log("Server is running on port 8081");
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Routes = require("./routes");
const cors = require("cors");
const path = require("path");

const app = express();

const corsOptions = {
  origin: "https://office-du2l30tvl-mohadowais-projects.vercel.app/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(Routes);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect("mongodb://127.0.0.1:27017/Employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(8081, () => {
      console.log("Server is running on port 8081");
    });
  })
  .catch((err) => {
    console.log(err);
  });
