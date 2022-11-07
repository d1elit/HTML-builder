const path = require('path')
const fs = require('fs');


let stdin = process.stdin;
let results = []


process.stdout.write('Введите строку'+'\n')

writeData(false)

function writeData(isEnd) { 
  if(isEnd) {
    process.stdout.write('До встречи'+'\n')
    process.exit()
  } 
  fs.writeFile(path.join(__dirname,'text.txt'), results.join(' '), err => {
    if(err) throw err;      
  })  
}

stdin.on('data', function(data) {
  let strData = data.toString('utf8').trim()  
  if(strData === 'exit') { 
    writeData(true)
    }   
   results.push(strData)
   writeData(false)

})

process.on('SIGINT', function() {
  writeData(true) 
});


