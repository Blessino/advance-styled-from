const express = require('express');

const bodyParser = require('body-parser');

const formController = require('./controllers/formController');

const app = express();
const port = 3000;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//GET from
app.get('/', formController.getForm);

//Post form
app.post('/', formController.submitForm);

//GET result
app.get('/result', formController.getResult);

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}...`);
});
