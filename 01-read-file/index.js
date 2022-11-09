
const path = require('path')
const fs = require('fs')
let stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let isEnded = false


stream.on('readable', function() {
  if(!isEnded) {
    let data = stream.read();   
    console.log(data);
    isEnded = true
  }
})

