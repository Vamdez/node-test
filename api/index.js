const http = require("http");
const URL = require("url");
const fs = require("fs");
const data = require("./urls.json");
const path = require("path");
const Site = require("./models/user");


function writeFile(cb){
    return fs.writeFile(
        path.join(__dirname,"urls.json"),
        JSON.stringify(data, null, 2),
        err => {if(err) throw err
            cb(JSON.stringify({message:"ok"}))
            }
          )
}


http.createServer(async(req, res) => {
    const {name, url, del} = URL.parse(req.url, true).query
    res.writeHead(200, {"Access-Control-Allow-Origin":"*"}) //A Api precisa permitir que tenha acesso a outra porta,
                                                            //nesse caso dei acesso a qualquer porta
    if(!name || !url)
        return res.end(JSON.stringify(data))
    if(del){

        await Site.destroy({
            where:{name,url}
        })
        
        data.urls = data.urls.filter(item => String(item.url) !== String(url))
        return writeFile((message =>{res.end(message)}))
    }
    await Site.create({name, url})
    data.urls.push({name, url})
    return writeFile((message =>{res.end(message)}))
}).listen(3000, () => console.log('API IS RUNNING'))