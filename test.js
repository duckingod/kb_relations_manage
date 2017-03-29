var express = require('express');
var app = express();
var path = require('path');

app.disable('view cache');

app.set('views', path.join(__dirname, 'views'));
app.use("/js", express.static(__dirname + '/javascripts'));
app.use("/css", express.static(__dirname + '/styles'));
app.set('view engine', 'ejs');

app.all('/', function(req, res) {
    res.render('index', {});
});

console.log("server started at port 3000");
app.listen(3000);

