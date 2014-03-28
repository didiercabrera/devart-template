
var socket=io.connect();
 socket.on('controllers', function (data) {
   appendControllers(data)
  });
$("#ok").on("click",function () {
	var trackers=$("#trackers").val().replace(/ /g,'');
	var hashtags=[];
	if(trackers!==""){
		trackers=trackers.split(",")
		$("#trackers").val("")
		for (var i = 0; i < trackers.length; i++) {
			if(trackers[i].indexOf("#")===-1 && trackers[i]!==""){
				hashtags.push("#"+trackers[i]);
			}else if(trackers[i]!=="#"){
				hashtags.push(trackers[i]);
			}
		};
		
		if(hashtags.length>2){
			hashtags.splice(3);
		}
		if(hashtags.length===0){
			return false;
		}
		socket.emit("hashset",hashtags);
		$("#now-tracking span").text(hashtags.join(", "));
		$("#tracker-container").fadeOut(200);
	}
})

$("#change-hash").on("click",function() {
	$("#tracker-container").fadeIn(200);
});

function appendControllers(data){
	

	for (type in data.controllers){
		var container=$("<div>",{
			"class":"typecontainer"
		})
		var h3=$("<h3>",{
			"text":type
		})
		$(container).append(h3);

		var ul=$("<ul>");
		for(control in data.controllers[type]){
			console.log(control)
			var li=$("<li>",{
		        "class":"type",
		    	"text":control
		    });
			$(ul).append($(li));
		}
		$(container).append($(ul));
		$("#controllers").append($(container));

	}

	var notescale=data.notes.scale;

	var h3_notes=$("<h3>",{
		"text":"Notes Scale"
	});
	var container=$("<div>",{
		"class":"typecontainer"
	})
	$(container).append(h3_notes);	
	var ul=$("<ul>");
	for(note in notescale){
		var li=$("<li>",{
	        "class":"type",
	    	"text":note
	    });
		$(ul).append($(li));
	}
	$(container).append($(ul));
	$("#controllers").append($(container));

}



var ul=$("#tweets");
socket.on("tweet",function (tweet) {
    console.log("tweet");
    var li=$("<li>",{
        "class":"tweet"
    });

    var p=$("<p>",{
        "text":tweet.text    	
    });

    var h4=$("<h4>",{
        "text":tweet.user.screen_name,
        "class":"userName"
    });
    
    var img=$("<img>",{
    	"src":tweet.user.profile_image_url
    });

    $(li).prepend($(p));
    $(li).prepend($(h4));
	$(li).prepend($(img));

    $(li).hide();
    $("#tweets").prepend($(li));
    $(li).slideDown();
});

$("#livebtn").on("click",function(){
	$(".container").fadeOut(function(){
		$("#live").show();
	});
});

function hndlr(response) {
      for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];
        // in production code, item.htmlTitle should have the HTML entities escaped.
		console.log(item);
      }
  }
$("#gok").on("click",function(){
	var word=$("#google").val().replace(/ /g,'');
	if(word===""){
		return false;
	}else{
		$("#google").val("")
		google_search(word);
	}
});

function google_search(word){
	var key="AIzaSyBTlX5WiCB8CWKbULcAshLT_CyyrsnTcFM";
	var src="https://www.googleapis.com/customsearch/v1?key="+key+"&cx=017576662512468239146:omuauf_lfve&q="+word
	$.get(src,function(data,status){
		socket.emit("google",data.items);
	});
}
