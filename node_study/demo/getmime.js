// exports.extname=function(file){
//     switch(file){
//         case '.html':
//             return 'text/html';
//         case ".css":
//             return "text/css";
//         case ".js":
//             return "text/javascript";
//         default:
//             return "text/html"
//     }
// }

var fs=require('fs');
var filearr={}
filearr=fs.readFileSync("./mime.json")
filearr=JSON.parse(filearr.toString())

exports.extname=function(file){
    return filearr[file]||'text/html'
}

