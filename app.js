var express= require("express");
var app= express();
var path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/assets', express.static('assets'));
//app.use(express.static(path.join(__dirname, 'assets/stylesheet')));

app.get("/", function(req, res){
    res.render('newConnection');
})

app.listen(8080);
