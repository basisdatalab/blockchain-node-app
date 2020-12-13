const express = require('express');
const app = express();
var router = require('./app/route/route');
const port = 3000;

app.use('/api/v1/node', router);

app.listen(port, () => {
    console.log(`Node app is live at port ${port}`);
});