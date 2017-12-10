$(document).ready(function() {
	$("#loginForm").submit(function(event) {
		event.preventDefault();

		var url = "https://scripton.herokuapp.com/api/auth/login";
		var username = $("#email").val();
		var password = $("#password").val();
		var twoFactorToken = $("#twoFactorToken").val() || undefined

		var data = {
			username: username,
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
			if (status === "success") {

				if(!token){
					accessToken = data.data.access_token;
					createCookie("at", accessToken)
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
	var url = "https://scripton.herokuapp.com/api/auth/login";
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

		if (status === "success") {

			if(!token){
				accessToken = data.data.access_token;
				createCookie("at", accessToken)
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

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
