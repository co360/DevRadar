const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://breno:1928374655@cluster0-jf7fw.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

app.use(cors({origin : 'http://localhost:3000'}));
app.use(express.json());
app.use(routes);


app.listen(3333);