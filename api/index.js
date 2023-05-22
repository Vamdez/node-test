const URL = require("url");
const fs = require("fs");
const data = require("./urls.json");
const path = require("path");
const Site = require("./models/user");
const express = require("express");

const app = express();



function writeFile(cb){
    return fs.writeFile(
        path.join(__dirname,"urls.json"),
        JSON.stringify(data, null, 2),
        err => {if(err) throw err
            cb(JSON.stringify({message:"ok"}))
            }
          )
}

app.get("/",async(req, res)=>{
    const {name, url, del} = URL.parse(req.url, true).query;
    if(!name || !url)
        return res.end(JSON.stringify(data));
    if(del){

        await Site.destroy({
            where:{name,url}
        });
        data.urls = data.urls.filter(item => String(item.url) !== String(url));
        return writeFile(message =>{res.end(message)})
    }
    await Site.create({name, url});
    data.urls.push({name, url});
    return writeFile(message =>{res.end(message)});
})

app.listen(3001, ()=>{
    console.log("API Runnig");
});