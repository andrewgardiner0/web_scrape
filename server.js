var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){
  url = 'http://www.imdb.com/title/tt1229340/';
  url2 = 'https://www.prospects.ac.uk/employer-profiles/thomas-cook-21245/jobs/future-leaders-graduate-programme-it-2128438?sortBy=dp&careers=69&size=20&page=0';

  request(url2, function(error, response, html){

    if(!error){
      var $ = cheerio.load(html);
      var title, desc,rating;
      var json = {title: "", desc: ""};

      $('.masthead-title').filter(function(){
        var data = $(this);

      //  title = data.children().first().text();
        //release= data.children().last().children().text();
        title = data.text();

        json.title = title;
        //json.release = release;
      });

      $('.section-content').filter(function(){
        var data = $(this);

        desc = data.text();

        json.desc = desc;
      });

    }

    fs.writeFile('output.json', JSON.stringify(json, null,4),function(err){
      console.log('File successfully written! - Check your project directory for the file');

    });
    res.send(json);
  });

});


app.listen('8081');

console.log('Magic happens on port 8081');


exports = module.exports = app;
