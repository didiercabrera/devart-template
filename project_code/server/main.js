/**/

// var http = require('http');  
// var express = require('express');  
var fs = require('fs');
var controlify=require("controlify");
var user_settings=JSON.parse(fs.readFileSync("../settings/user_settings.json"));
var config=JSON.parse(fs.readFileSync("../settings/configs.json"));
// //Twitter Settings

var Twit = require('twit'); 
var T = new Twit({  
  consumer_key: user_settings.twitter.consumer_key,
  consumer_secret: user_settings.twitter.consumer_secret,
  access_token: user_settings.twitter.access_key,
  access_token_secret: user_settings.twitter.access_secret
});

var trackers=config.tracker;
var stream = T.stream('statuses/filter', { track: trackers })

stream.on('tweet', function (tweet) {
	var text=tweet.text;
	controlling(text);
})

function controlling(text){
	console.log('NEW TWEET :   ',text);
	var sliders=controlify.createControllers(text,{type:'sliders'});
	var buttons=controlify.createControllers(text,{type:'buttons'});
	var notes=controlify.createNotes(text,{octave:2});
	
controlify.sendNotes(notes,{
	// duration:2000,
	tempo:127
});

	
	for( i in buttons){
		var cc=buttons[i];
		controlify.sendController(cc);
	}

	for( i in sliders){
		var cc=sliders[i];
		console.log(cc)
		controlify.autoControl(cc,
		{
			min:10,
			max:25,
			tempo:120
		});
	}


}