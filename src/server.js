require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const {PORT} = process.env;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
