module.exports=function(config,io){
/*MODULE*/

var fs = require('fs');
var controlify=require("controlify");
var user_settings=JSON.parse(fs.readFileSync("../settings/user_settings.json"));

/*Twitter Settings*/



var Twit = require('twit'); 
var T = new Twit({  
  consumer_key: user_settings.twitter.consumer_key,
  consumer_secret: user_settings.twitter.consumer_secret,
  access_token: user_settings.twitter.access_key,
  access_token_secret: user_settings.twitter.access_secret
});

// var trackers=config.tracker;
// set_tracking(trackers);

io.sockets.on('connection', function (socket) {
	socket.emit('controllers',controlify.defaults);
  socket.on('hashset', function (data) {
  	set_tracking(data);
  });
  socket.on('google',function(data){
  	google_control(data);
  })
});



function set_tracking(trackers){
	var stream = T.stream('statuses/filter', { track: trackers })
	console.log("setting tracker to :", trackers);
	stream.on('tweet', function (tweet) {
		var text=tweet.text;
		// console.log(tweet)
		io.sockets.emit("tweet",tweet);
		controlling(text);
	});
	// testing();
}
function testing(){
	var tweets=JSON.parse(fs.readFileSync("../settings/test3.json"));
	var i=0;
	var interval=setInterval(function() {
		if(i<=tweets.length-1){
			var str=tweets[i].text.toLowerCase();
			// tweets[i].user.profile_image_url="../css/profile-pic.jpg"
			i++;
			controlling(str);
			io.sockets.emit("tweet",tweets[i]);		
		}else{
			clearInterval(interval);
		}
	},1000);
}
function controlling(text){
	// console.log('NEW TWEET :   ',text);
	
	var sliders=controlify.createControllers(text,{type:'sliders'});
	var buttons=controlify.createControllers(text,{type:'buttons'});
	
	//create octaves
	var octaves;
	var octaves_i=text.indexOf("octaves");
	
	if(octaves_i!==-1){
		octaves=parseInt(text.substring(octaves_i+8,octaves_i+9))//validate octaves value
	}else{
		octaves=3;
	}

	//create notes
	var notes=controlify.createNotes(text,{
		octave:octaves
	});
	controlify.sendNotes(notes,{
		duration:0.1,
		tempo:500
	});

	
	for( i in buttons){
		var cc=buttons[i];
		controlify.sendController(cc);
	}

	for( i in sliders){
		var cc=sliders[i];
		controlify.autoControl(cc,
		{
			min:0,
			max:100,
			tempo:500
		});
	}


}


function google_control(items){

	for (var i = 0; i < items.length; i++) {
		var text=items[i].snippet;
		controlling(text);
	};

}
/*END OF MODULE*/
}