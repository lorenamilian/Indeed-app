const express = require('express')

const bodyParser = require("body-parser")

const request = require("request");

const app = express()
 
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
  res.render('main.ejs', {weather: null, error: null});
});

//getting indeed

app.get('/indeed', function (req, res) {
  res.render('indeed.ejs');
  
});
 
app.post('/indeed', function(req, res){
  
  let err = false;
     
  let url = "https://authenticjobs.com/api/?api_key=308d3e31bbbb07c908889db3f2f60607&method=aj.jobs.get&id=1569";

       request( url , function (error, response, body) {
  
       if(error){
         res.render('indeed.ejs', {job:null, error:"Error Please try again"})
       } else{
          let job = JSON.parse(body);
          if(job == undefined){
            res.render('indeed.ejs', {job:null, error:"Please try again"})
          }else{
            let alljobs = "this are your options: " + req.body.work + ' ' + job;//.main.temp;
            res.render('indeed.ejs', {job:alljobs, error:null});
          }
       }
    });
    
});


app.listen(3002, function(){
  console.log("my server is running better")
});
 
