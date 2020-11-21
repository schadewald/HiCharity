const express = require("express");
const axios = require("axios");
const cors = require("cors");
const router = require("./routes/index");
const app = express();
const port = 3000;

app.use(cors());
app.use((req, res, next) => 
{
    console.log(`request made to: ${req.url}`)
    next();
});
app.use("/", router);
// app.get("/users", (req, res) => 
// {
//     axios
//         .get(process.env.USER_SERVICE_ENDPOINT, {params: {value: req.query.users}})
//         .then((response) => res.send(response.data))
//         .catch((err) => console.log(err));
// });
// app.get("/donations", (req, res) => 
// {
//     axios
//         .get(process.env.DONATION_SERVICE_ENDPOINT, {params: {value: req.query.donations}})
//         .then((response) => res.send(response.data))
//         .catch((err) => console.log(err));
// })

app.listen(port, () => 
{
    console.log('API Started.');
});