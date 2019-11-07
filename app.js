require('dotenv').config()

const express = require('express')

const bodyParser = require("body-parser")

const request = require("request");

const app = express()

const apiKey = process.env.KEY;
 
//setting view engine
app.set('view engine', 'ejs')

//middleware
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));


//ROUTES
 
//getSearch Engine APISearch Engine API 
app.get('/', function (req, res) {
  res.render('main.ejs');
})

//get main
app.get('/', function (req, res) {
  res.render('main.ejs');
});

//getting indeed

app.get('/indeed', function (req, res) {
  res.render('indeed.ejs', {job:null, error:null});
  
});
 
app.post('/indeed', function(req, res){
  
  let err = false;
     
  let url = "https://authenticjobs.com/api/?api_key="+ apiKey +"&method=aj.jobs.getlocations&keywords=web+developer,mysql&perpage=1&format=json";
  
      request( url , function (error, response, body) {
        console.log(error)

             
       if(error){
         res.render('indeed.ejs', {job:null, error:"Error Please try again"})
       } else{
          let job = JSON.parse(body);
          if(job == undefined){
            res.render('indeed.ejs', {job:null, error:"Please try again"})
          }else{
            let alljobs = "this are your options: " + req.body.work + ' ' + job. listing;
            res.render('indeed.ejs', {job:alljobs, error:null});
            console.log(job)
          }
       }
    });
    
});


app.listen(3002, function(){
  console.log("my server is running better")
});
 
