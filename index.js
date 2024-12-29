const express = require("express");
const fs = require("fs");
const puraRoute = require("./route/puraRoute");
const app = express();

app.use(express.json());

const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(puraRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
