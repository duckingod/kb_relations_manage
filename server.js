var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('lodash');
var models = require('./models/')
KBTriple = models.kbtriple
models.sequelize
    .sync().then(function(err){console.log('ok');}, function(err){console.log(err);})

//
// Server setting
//

app.disable('view cache');

app.set('views', path.join(__dirname, 'views'));
app.use("/js", express.static(__dirname + '/controller'));
app.use("/css", express.static(__dirname + '/styles'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//
// Functions
//

// Database Object to JSON
function toJSON(obj, fields) {
    if (typeof(obj)==Array) {
        res = [];
        for (o in obj) {
            res.append()
        }
    } 
}


//
// Router
//

app.route('/')
    .get(function(req, res) {
        // get list of all kbtriple by ajax in angularjs
        return res.render('index');
    });

app.route('/api/kbtriple')
    .get(function(req, res) {
        KBTriple.findAll().then(function(triples) {
            return res.send(JSON.stringify(triples));
        });
    })
    .post(function(req, res) {
        // create new kbtriple
        var params = _.pick(req.body, 'first', 'relation', 'second');
        params.symmetric = false;
        KBTriple.create(params).then(function(triple){
            return res.send(triple);
        });
    });
app.route('/api/kbtriple/:kb_id')
    .post(function(req) {
        // patch a kbtriple
        var params = _.pick(req.body, 'first', 'relation', 'second');
    });



console.log("server started at port 3000");
app.listen(3000);

