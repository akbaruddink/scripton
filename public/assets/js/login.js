$(document).ready(function() {
	$("#loginForm").submit(function(event) {
		event.preventDefault();

		var url = "https://exbots.herokuapp.com/api/auth/login";
		var username = $("#email").val();
		var password = $("#password").val();
		var twoFactorToken = $("#twoFactorToken").val() || undefined

		var data = {
			email: username,
			password: password,
			twoFactorToken: twoFactorToken
		};

		var accessToken;
		var token = $_GET['token']
		if(token){
			url = url+"/"+token+"=="
		}
		$("#he").html("Logging in ...")
		var posting = $.post(url, data, function (data, status) {
			console.log("Data: " + JSON.stringify(data) + "\nStatus: " + JSON.stringify(status));
			if (status === "success") {

				if(!token){
					accessToken = data.data.access_token;
				}else{
					console.log("here calling")
				}
				window.location = "dashboard.html"
			}else {
				$("#he").html("Invalid login details. try again")
				alert("invalid login details")
			}
		}).fail(function(){
			$("#he").html("Invalid login details. try again")
			alert("invalid login details")
		});
	});
});
var $_GET = {};
if(document.location.toString().indexOf('?') !== -1) {
    var query = document.location
                   .toString()
                   // get the query string
                   .replace(/^.*?\?/, '')
                   // and remove any existing hash string (thanks, @vrijdenker)
                   .replace(/#.*$/, '')
                   .split('&');

    for(var i=0, l=query.length; i<l; i++) {
       var aux = decodeURIComponent(query[i]).split('=');
       $_GET[aux[0]] = aux[1];
    }
}

function called(){
	var url = "https://exbots.herokuapp.com/api/auth/login";
	var username = $("#email").val();
	var password = $("#password").val();

	var data = {
		email: username,
		password: password
	};

	var accessToken;
	var token = $_GET['token']
	if(token){
		url = url+"/"+token+"=="
	}
	console.log("called");
	var posting = $.post(url, data, function (data, status) {
		console.log("Data: " + JSON.stringify(data) + "\nStatus: " + JSON.stringify(status));
		if (status === "success") {

			if(!token){
				accessToken = data.data.access_token;
			}else{
				console.log("here calling")
			}
			window.location = "dashboard.html"
		}else {
			alert("invalid login details")
		}
	}).done().fail(function(err){
		alert("asdad;")
	});
}
