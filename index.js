require('dotenv').config({path: '.env'});
const app = require('./app');

//import sensitive data from .env file
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express server listening at port ${port}`);
});