const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyparser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

require("./connectionDB")
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const brandRoutes = require("./routes/brandRoutes");
app.use('/brand', brandRoutes);

app.get("/", (req, res) => {
    try {
        res.status(200).send("WELCOME TO BRAND BUCKET");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
})

app.listen(port, () => {
    console.log("App listening to port no : ", port)
})