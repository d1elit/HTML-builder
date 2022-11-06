const path = require('path')
const fs = require('fs')

const copyDir = (src,dist) => {
  fs.rm(path.join(__dirname,'files-copy'), { recursive: true, force: true }, err => {
    fs.mkdir(path.join(__dirname,'files-copy'), { recursive: true }, err => {
      if (err) throw err;
      fs.readdir( path.join(__dirname, 'files'), (err,files) => {
        if (err) throw err;
        files.forEach(file => {      
          fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy',file), err => {if (err) throw err})        
        })
      })      
    })
  })


  // 
}

copyDir()