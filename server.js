const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('./dist/'));
app.use('/profile', express.static('./dist/'));
app.use('/login', express.static('./dist/'));
app.use('/registration', express.static('./dist/'));
app.use('/not-found', express.static('./dist/'));
app.use('/error', express.static('./dist/'));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});