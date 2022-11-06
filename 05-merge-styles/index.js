const path = require('path')
const fs = require('fs')


  fs.readdir(path.join(__dirname,'styles'), {withFileTypes: true}, (err, files) => {
    let styles = []
    if (err) throw err;
    files.forEach(file => {
        if(!file.isDirectory()) {
          if(path.extname(file.name) == '.css') { 
            let stream = new fs.ReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
            stream.on('readable', function() {
              let data = stream.read();
              styles.push(data)      
              fs.writeFile(path.join(__dirname, 'project-dist','bundle.css'), styles.join(' '), err => {  if (err) throw err;}   
              )        
            })     
            styles.push(file.name)
          }      
        }
    });   
  })



