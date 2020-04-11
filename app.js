const express=require("express");
const bodyparser=require("body-parser");
const https=require("https");
const app = express();

app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res)
{
    var cityname=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+",india&appid=8688e950b7892a52079c7a495e6f92cf&units=metric";
    https.get(url,function(response)
    {
        
        

        response.on("data",function(data)
        {
            const weatherdata=JSON.parse(data);
            var temprature =weatherdata.main.temp;
            var weathertype=weatherdata.weather[0].description;
            var image = weatherdata.weather[0].icon;
            var imgurl="http://openweathermap.org/img/wn/"+image+"@2x.png";
            res.write("<h1>temprature in "+cityname+" is "+temprature+" and the weather-type is "+weathertype+".</h1>");
            res.write("<img src="+imgurl+">");
            
            res.send();

        });
        
        });

})

app.get("/",function(req,res)
{
       
});




app.listen(300,function(require,response)
{
    console.log("server started at 300");
});