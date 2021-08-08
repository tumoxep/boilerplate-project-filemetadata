var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var cors = require('cors');
var bodyParser = require("body-parser");
require('dotenv').config()

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.route("/api/fileanalyse").post(upload.single('upfile'), function (req, res, next) {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size, 
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
