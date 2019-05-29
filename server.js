import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

var app = express();

app.set('port', (process.env.PORT || 4200));
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.listen(app.get('port'), () => {
  console.log('AngularJS Server Starting...');
});

var folderPath;

app.post('/directory', (req, res) => {
  const files = [];
  const folders = [];
  var runStatus;

  try {
    folderPath = req.body.path;
    const readedFile = fs.readdirSync(folderPath, {withFileTypes: true});

    readedFile.filter(item => fs.statSync(path.join(folderPath, item)).isFile())
      .forEach(file => files.push({ name: file, type: 'file' }));

    readedFile.filter(item => fs.statSync(path.join(folderPath, item)).isDirectory())
      .forEach(file => folders.push({ name: file, type: 'folder' }));
    
    runStatus = true;
  } catch (err) {
    res.status(400).send(err);
  }

  if (runStatus) {
    res.json([...files, ...folders].sort());
  }
})

app.post('/create/file', (req, res) => {
  const fileName = req.body.name;

  fs.writeFile(folderPath + '/' + fileName, '', (err) => {
    if (err) {
      res.status(400).send({ Error: 'no such file or directory'});
    }
  })

  if (folderPath !== undefined) {
    res.json({ name: fileName, type: 'file' });
  }
})
