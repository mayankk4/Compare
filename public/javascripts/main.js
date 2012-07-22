
var firstId = 0;
var secondId = 0;

$(document).ready(function() {
	fetchImages();
});

function fetchImages(){
	$.ajax({
	  url: "/service",
	  context: document.body
	}).success(function(resp) { 

		if(resp.status == 200){
			// set the id variables
			firstId = resp.first.id;
			secondId = resp.second.id;

			// set images
			$("#firstImage").html("<img id=" + firstId + " src='/images/" + firstId + ".jpg' />");
			$("#secondImage").html("<img id=" + secondId + " src='/images/" + secondId + ".jpg' />");

			// votes set
			$("#left-votes").html(resp.first.votes);
			$("#right-votes").html(resp.second.votes);

			// views set
			$("#left-views").html(resp.first.views);
			$("#right-views").html(resp.second.views);

			// set the links for the enlarged images
			$("#enlarge-left-image").attr("href", "/images-cdn/" + firstId + ".jpg");
			$("#enlarge-right-image").attr("href", "/images-cdn/" + secondId + ".jpg");
		}
	});
}


function refreshImages(){
	addCurrentImageToPreviouslyViewed();
	fetchImages();
}

function voteForLeft(){
	showNotification("You voted for LEFTY !!!");
	saveVote(firstId);
	addCurrentImageToPreviouslyViewed();
	fetchImages();
}

function voteForRight(){
	showNotification("You voted for RIGHTY !!!");
	saveVote(secondId);
	addCurrentImageToPreviouslyViewed();
	fetchImages();
}

function saveVote(id){
	$.ajax({
	  url: "/saveVote",
	  type: "POST",
	  data: "imageId="+id
	});

}

function showNotification(text){
	noty({"text":text,"layout":"top","type":"alert","animateOpen":{"height":"toggle"},"animateClose":{"height":"toggle"},"speed":500,"timeout":1000,"closeButton":false,"closeOnSelfClick":true,"closeOnSelfOver":false,"modal":false});
}


function addCurrentImageToPreviouslyViewed(){
	$("#previous-images").append("<img height='100px' onclick=\"openTabForCDN('" + firstId + "');\" src='/images/" + firstId + ".jpg' />&nbsp;");
	$("#previous-images").append("<img height='100px' onclick=\"openTabForCDN('" + secondId + "');\" src='/images/" + secondId + ".jpg' />&nbsp;");
}

function openTabForCDN(id){
	var url = "http://localhost:3000/images-cdn/"+id+".jpg";
	window.open(url,'_blank');
	window.focus();
}
	
// for file in `/bin/ls *.jpg`; do
//     test=`echo -n ${file%.*} | openssl dgst -sha1 -hmac "myKey123"`;
//     echo ${test##* };
// done
