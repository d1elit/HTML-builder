const path = require('path')
const fs = require('fs');


let stdin = process.stdin;
let results = []


process.stdout.write('Введите строку'+'\n')

writeData(false)

function writeData(isEnd) { 
  fs.writeFile(path.join(__dirname,'text.txt'), results.join(' '), err => {
    if(err) throw err;   
    if(isEnd) {
      process.stdout.write('До встречи'+'\n')
      process.exit()
    } 
  })  
}

stdin.on('data', function(data) {
  let strData = data.toString('utf8').trim()   
  results.push(strData)
  writeData(false)
  if(strData === 'exit') { 
    writeData(true)
    }   

})

process.on('SIGINT', function() {
  writeData(true) 
});


