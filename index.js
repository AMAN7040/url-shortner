const express = require("express");
const urlRoute = require('./routes/urlRoutes')
const {connectToDb} = require('./db')
const app = express();
const PORT = 3000;

connectToDb("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log('database connected'));

app.use(express.json());

app.use('/url', urlRoute);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
