const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.static('./static/'));
app.use('/profile', express.static('./static/'));
app.use('/login', express.static('./static/'));
app.use('/registration', express.static('./static/'));
app.use('/not-found', express.static('./static/'));
app.use('/error', express.static('./static/'));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});