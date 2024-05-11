const http = require('http')
const fs = require('fs')
const path = require('path')
const PORT = 5000
const mimeTypes = { 
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif" 
};
function staticFile(res, filePath, ext){
    res.setHeader('Content-Type', mimeTypes[ext])
    fs.readFile(`./public${filePath}`, (err, data)=>{
        if(err){
            res.statusCode = 404
            res.end()
        }
        res.end(data)
    })
}
http.createServer((req,res)=>{
    const url = req.url
    switch(url){
        case "/":
            staticFile(res, '/templates/index.html', '.html')
            break
    default:
        const extName = String(path.extname(url)).toLowerCase();
        if (extName in mimeTypes){
            staticFile(res,url,extName)
        }
        else{
            res.statusCode = 404
            res.end()
        }
        break      

}
   
}).listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    console.log(`server started on http://localhost:${PORT}`)
})

