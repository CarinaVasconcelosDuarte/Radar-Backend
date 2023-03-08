require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const PASS = process.env.DB_PASSWORD;
const conn = `mongodb+srv://mod:${PASS}@tech-radar.ihdq6st.mongodb.net/techRadar?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(conn, {useNewUrlParser: true})
    .then(() => {
        const route = require('../routes/routes');
        app.use('/api', route);
        app.listen(5000, () => {
            console.log("Server has started!");
        });
    })