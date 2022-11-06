
const path = require('path')
const fs = require('fs')
let stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf-8');



stream.on('readable', function() {
  let data = stream.read();
  console.log(data);
})
stream.on('end', function() {  
  console.log('THE END')
})
