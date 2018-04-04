let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');

require('./database/db-connect');

let port = 3001; 

let routerApi = require('./router/index');
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routerApi);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.listen(port, () => {
    console.log('App listening on port ', port);
});
