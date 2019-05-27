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

app.post('/directory', (req, res) => {
  const files = [];
  const folders = [];
  const folderPath = req.body.path;

  try {
    const readedFile = fs.readdirSync(folderPath, {withFileTypes: true});

    readedFile.filter(item => fs.statSync(path.join(folderPath, item)).isFile())
      .forEach(file => files.push({ name: file, type: 'file' }));

    readedFile.filter(item => fs.statSync(path.join(folderPath, item)).isDirectory())
      .forEach(file => folders.push({ name: file, type: 'folder' }));
  } catch (err) {
    res.status(400).send(err);
  }

  res.json([...files, ...folders].sort());
})
