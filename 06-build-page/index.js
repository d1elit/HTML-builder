  
  const path = require('path')
  const fs = require('fs')
  let template
  let result 

  function replaceTag (tagData, tagname ) {
      let index =  result.indexOf(tagname) - 2
      let index2 = index + tagname.length  + 4
      console.log(`index1: ${index}, index2: ${index2}`)
      result = result.substr(0, index) + tagData + result.substr(index2, result.length)
  
    
  }
  
  fs.rm(path.join(__dirname,'project-dist'), { recursive: true, force: true }, err => {
    fs.mkdir(path.join(__dirname,'project-dist'), { recursive: true }, err => {
      if (err) throw err;

       // Copy Template
       fs.readdir(path.join(__dirname,'components'), {withFileTypes: true}, (err, files) => {       
          fs.readFile(path.join(__dirname,'template.html'), "utf8", function(error,data){ 
            template = data
            result = data
            if (err) throw err;
            files.forEach((file,i) => {            
                if(!file.isDirectory()) {
                  if(path.extname(file.name) == '.html') {                
                    fs.readFile(path.join(__dirname, 'components',file.name), "utf8", function(error,data){                
                      replaceTag(data, file.name.split('.')[0])                   
                        fs.writeFile(path.join(__dirname, 'project-dist','index.html'), result, err => {  if (err) throw err;                        
                        })                              
                    });     
                  }      
                }
            });   
          });
       })

      // Copy Assets
      fs.readdir( path.join(__dirname, 'assets'), {withFileTypes: true}, (err,dirs) => {
        if (err) throw err;
        dirs.forEach(dir => {     
          if(dir.isDirectory()) {           
            fs.mkdir(path.join(__dirname,'project-dist','assets'), { recursive: true }, err => {
              fs.mkdir(path.join(__dirname,'project-dist','assets',dir.name), { recursive: true }, err => {
                fs.readdir( path.join(__dirname,'assets', dir.name), {withFileTypes: true}, (err,files) => {
                  files.forEach(file => {  
                    fs.copyFile(path.join(__dirname, 'assets',dir.name, file.name), path.join(__dirname, 'project-dist','assets',dir.name,file.name ), err => {if (err) throw err})  
                  })
                })
             })
            })
          }   
        })
      })
      
      
      // Copy Styles
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
                  fs.writeFile(path.join(__dirname, 'project-dist','style.css'), styles.join(' '), err => {  if (err) throw err;}   
                  )        
                })    
              }      
            }
        });   
      })

    
    })
  })

