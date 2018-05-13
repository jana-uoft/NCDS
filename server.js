const express = require('express');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

config = JSON.parse(fs.readFileSync('./.env.json', 'utf8'));
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});


const app = express();
const port = process.env.PORT || 5000;

app.get('/api/publications', (req, res) => {
  cloudinary.api.resources({ type: "upload", prefix: "publications/", max_results: 500 }, function (error, result) { 
    if (error) result = JSON.parse(fs.readFileSync('./data/publications.json', 'utf8'));
    else fs.writeFileSync('./data/publications.json', JSON.stringify(result));
    let response = {};
    result.resources.forEach(resource => {
      let date = resource.public_id.split('/', 3)[1];
      if (date in response) response[date].push(resource.public_id)
      else response[date] = [resource.public_id]
    });
    let responseArray = [];
    Object.entries(response).forEach(([publication, images]) => {
      responseArray.push({ publication: publication, images})
    });
    responseArray.sort(((a, b) => Date.parse(b.publication) - Date.parse(a.publication)));
    res.send(responseArray);    
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));