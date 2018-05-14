function parseFile(inputFile, callback){
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(inputFile),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);
     
    rl.on('line', callback);
   
}

var parser = require('../lib/parser/parser');

let error;

parser.parseFile('test_data/ERRALL.LS',function (line) {
    error = line;
    console.log(line);});
