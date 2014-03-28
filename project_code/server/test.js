var controlify=require("controlify");
controlify.defaults.controllers.buttons.delay=15;
var text="this is so awesome, making music with twitter this is so awesome, making music with twitter this is so awesome, making music with twitter this is so awesome, making music with twitter"

var texts=[];
var texts2=[];

texts.push("#art making music with twitter reverb play delay this is so awesome");
texts.push("Air Canada. #awesome #artwork #art #bestpic #bored #coolpic #filtered #godisgood #godofwonders… http://t.co/jDJfRRRQNW");
texts.push("at the mus with @jaksw #art ");
texts.push("RT @MutuStudio: Check out \"Culture/Context with LeRonn P. Brooks, Season 2, Ep. 2--Wangechi Mutu\" on Vimeo http://t.co/t7FRHO3NL4 #Vimeo #a…");

texts2.push("#art weed lsd meth");
texts2.push("#THIS IS #FREAKIN #HOT! #blue #eyes #leapord #nice #art #love http://t.co/rDmk3E6RXP http://t.co/CaMHofivro");
texts2.push("#art #futsal http://t.co/0sQ7PTepr3");
texts2.push("Messenger #collage #art more art:\nhttp://t.co/o8DsPBrk9w http://t.co/B8J68eddzw");

var i=0;
var interval=setInterval(function() {
	if(i<=texts.length-1){
		var str=texts[i];
		var str2=texts2[i]
		i++;
		control_create(str);
		control_create(str2);
	}else{
		clearInterval(interval);
	}
},1000);

// var text="delay";
// var notes=controlify.createNotes(text,{
// 	type:'scale',
// 	octave:2
// });

// controlify.sendNotes(notes,{
// 	duration:0.3,
// 	tempo:127
// });

var receiver=controlify.OSCreceiver(7779);
var sender1=controlify.OSCsender("127.0.0.1",7778);

var text="";

receiver.on('', function(note) {
  if(note.path==='/notein'){
	  var s=controlify.createText(note.params);
	  // console.log(text);
	  if(note.params[0]==='off'){
	  console.log("noteoff long")
	  	text="";
	  }else{
	  	text+=s;
	  }
  }
});


function control_create(text){
	console.log("NEW TWEET:" , text)
	console.log("----------");
	// var chords=controlify.createChords(text,{
	// 	// type:'scale',
	// 	octave:3
	// });
	// console.log(chords);
	// controlify.sendChords(chords,{
	// 	duration:0.5,
	// 	tempo:127
	// });

	var notes=controlify.createNotes(text,{
		octave:3
	});

	controlify.sendNotes(notes,{
		duration:0.1,
		tempo:500
	});

	var sliders=controlify.createControllers(text,{type:'sliders'});
	var buttons=controlify.createControllers(text,{type:'buttons'});

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

	// console.log("Chords Created : ",chords);
	// console.log("-------------------------");
	// console.log("Sliders Created : ",sliders);
	// console.log("-------------------------");	
	// console.log("Buttons Created : ",buttons);
	// console.log("-------------------------");		
}
