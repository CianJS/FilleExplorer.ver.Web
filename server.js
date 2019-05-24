import express from 'express';

var app = express();

app.get('/directory', (req, res) => {
  var fs = require('fs');
  var testFolder = './'
  fs.readdir(testFolder, function(error, filelist){
    console.log(filelist);
    if (error) {
      res.send(error)
    }

    res.json(filelist)
  })
})

app.set('port', (process.env.PORT || 4200));
app.use(express.static(__dirname));

app.listen(app.get('port'), () => {
  console.log('AngularJS Server Starting...');
});
