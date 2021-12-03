const express = require("express");
const cors = require("cors");

const app = express();

app.use(
    cors({
        origin: "*",
    })
)
const climatecodes = [
    {code:"Dfc", name:"Tropical rainforest climate Tropical Rainforest", color:"#960000"},
    {code:"Am", name:"Tropical monsoon climate Tropical Monsoon", color:"#FF0000"},
    {code:"As", name:"Tropical dry savanna climate Tropical Savanna, Dry", color:"#FF6E6E"}
]

const forecasts= [
    {name: "Arjeplog",fromtime: "2020-06-09 00:00:00",periodname: "Night",periodno: "0",totime: "2020-06-09 06:00:00",forecast:{TUNIT: "celsius",ALTUNIT: "fahrenheit",ALTVALUE: "61.7",CODE: "S",DEG: "220",FNAME: "Cloudy",MPS: "0.2",NAME: "Calm",NUMBER: "4",RUNIT: "mm",RVALUE: "0",TVALUE: "16.5",UNIT: "hPa",VALUE: "1182",WSYMB3NUMBER: "6"}},
    {name: "Uppsala",fromtime: "2020-06-09 00:00:00",periodname: "Night",periodno: "0",totime: "2020-06-09 06:00:00",forecast:{ALTUNIT: "fahrenheit",ALTVALUE: "61.7",CODE: "S",DEG: "220",FNAME: "Cloudy",MPS: "0.2",NAME: "Calm",NUMBER: "4",RUNIT: "mm",RVALUE: "0",TUNIT: "celsius", TVALUE: "16.5",UNIT: "hPa",VALUE: "1182",WSYMB3NUMBER: "6"}},
    {name: "Grums",fromtime: "2020-06-09 00:00:00", periodname: "Night",periodno: "0",totime: "2020-06-09 06:00:00",forecast:{ALTUNIT: "fahrenheit",ALTVALUE: "61.7",CODE: "S",DEG: "220",FNAME: "Cloudy",MPS: "0.2",NAME: "Calm",NUMBER: "4",RUNIT: "mm",RVALUE: "0",TUNIT: "celsius",TVALUE: "16.5",UNIT: "hPa",VALUE: "1182",WSYMB3NUMBER: "6"}},
    {name: "Arjeplog",fromtime: "2020-06-09 00:00:00",periodname: "Night",periodno: "0",totime: "2020-06-09 06:00:00",forecast:{ALTUNIT: "fahrenheit",ALTVALUE: "61.7",CODE: "S",DEG: "220",FNAME: "Cloudy",MPS: "0.2",NAME: "Calm",NUMBER: "4",RUNIT: "mm",RVALUE: "0",TUNIT: "celsius",TVALUE: "16.5",UNIT: "hPa",VALUE: "1182",WSYMB3NUMBER: "6"}},
    
    {name:"Jönköping", fromtime:"2020-01-01 00:00:00", totime:"2020-01-01 06:00:00", periodno:"3"},
    {name:"Uppsala", fromtime:"2020-01-02 06:00:00", totime:"2020-01-02 12:00:00", periodno:"1", forecast:{TUNIT:"celsius", TVALUE:"5", RUNIT:"mm", RVALUE:"0,2"}},
    {name:"Uppsala", fromtime:"2020-01-01 00:00:00", totime:"2020-01-01 06:00:00", periodno:"4",forecast:{TUNIT:"celsius", TVALUE:"3", RUNIT:"mm", RVALUE:"0,2"}}
]

const users = [
    {id:"1", username:"Greger Ohlsson", email:"greger.olsson@net.nu", favlocation:"Grums"},
    {id:"2", username:"Sven Grunden", email:"svenne.grunden@swnet.se", favlocation:"Barcelona"},
    {id:"4", username:"Nisse Hult", email:"nissehult@net.nu", favlocation:"Grums"}
]

app.get('/', function(req, res){
    res.send("Answer!")
})

app.get('/climatecodes', function(req, res){

    res.status(200).json(
        climatecodes.map(climatecodes=>({
            code:climatecodes.code, 
            name: climatecodes.name, color: climatecodes.color, code: climatecodes.code}))
    );
})

app.get('/forecasts', function(req, res){

    res.status(200).json(
        forecasts.map(forecasts=>({
            name:forecasts.name, 
        }))
    );
})

app.get('/users', function(req, res){

    res.status(200).json(
        users.map(users=>({
            username:users.username,
            id:users.id,
            email:users.email,
            favlocation:users.favlocation
        }))
    );
})
console.log(forecasts);

//search for specific code from climatecodes, if no found then 404
app.get("/climatecodes/:code", function(req, res){
    const climatecode = climatecodes.find(climatecode=>climatecode.code==req.params.code)
    if(climatecode){
        res.type("application/json");
        res.status(200).send(climatecode);
    }else{
        res.status(404).json({message: "code not found"})
    }
})

//search for specific name from forecast, if no found then 404
app.get("/forecasts/:name", function(req, res){
    const searchName = forecasts.find(searchName=>searchName.name==req.params.name)
    if(searchName){
        res.type("application/json");
        res.status(200).json(searchName);
    }else{
        res.status(404).json({message: "code not found"})
    }
})

//search for specific name and fromtime from forecast, if no found then 404
app.get("/forecasts/:name/:fromtime", function(req, res){
    const fromtimeforcast = forecasts.find(fromtimeforcast=>fromtimeforcast.name==req.params.name && fromtimeforcast.fromtime==req.params.fromtime)

    if(fromtimeforcast){
        res.type("application/json");
        res.status(200).send(fromtimeforcast);
    }else{
        res.status(404).json({message: "code not found"})
    }
})

//search for specific name from forecast, if no found then 404
app.get("/users/:username", function(req, res){
    const searchUsername = users.find(searchUsername=>searchUsername.username==req.params.username)

    if(searchUsername){
        res.type("application/json");
        res.status(200).json(searchUsername);
    }else{
        res.status(404).json({message: "code not found"})
    }
})

//create a user 
app.post("/users", express.json(), function(req, res){
    users.push({id: req.body.id, username: req.body.username, email: req.body.email, favlocation: req.body.favlocation})
    res.status(200).json(req.body);
})

app.listen(5000, function(){
    console.log("Server started")
})