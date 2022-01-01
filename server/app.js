const express = require('express');
const bodyParser = require('body-parser');

const customerRoutes = require('./routes/customer-routes');
const {errorHandler} = require('./error-handlers/error-middleware');

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({extended: true})
);

app.use(customerRoutes.router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}...`);
});