var express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

var fs = require('fs');

const multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const { authorization } = req.headers
    const path = `./uploads/${authorization}`
    fs.mkdirSync(path, { recursive: true })
    callback(null, `uploads/${authorization}`)
  },
  filename: function (req, file, callback) {
    console.log(file.originalname);
      callback(null, file.originalname) //Appending extension
  },

});
// callback(null, Date.now() + path.extname(file.originalname)) //Appending extension


var upload = multer({ storage: storage });


var app = express();
var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

app.use(express.json()); // Make sure it comes back as json

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to database MySQL --- using Sequelize
const db = require("./Sequelize/Models");
db.sequelize.sync();
//Connect to database MySQL --- using Sequelize

// Set routes
require('./Sequelize/Routes/Survey.Routes')(app);


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/frontend/', 'build', 'index.html'));
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/saveFile',upload.array('file',6),(req, res,next)=>{
  if (!req.files) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send({data:req.files});
});

app.get('/getFile',(req, res)=>{
  res.download('files/carta_laboral.pdf');
});

app.get('/getFileAnexo',(req, res)=>{
  res.download('files/carta_anexo.docx');
});

app.listen(5050, function () {
  console.log('Example app listening on port 5050!');
});
