const path = require('path')
const fs = require('fs')

const folderName = path.join(__dirname, 'secret-folder')

fs.readdir(folderName, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
      if(!file.isDirectory()) {
      fs.stat(path.join(__dirname,'secret-folder', file.name), (err,stats) => { 
        console.log(` ${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats.size} байт`)
      })      
      }
  });
})
