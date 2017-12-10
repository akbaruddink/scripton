
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
let instance

let at = readCookie("at")
if(!at){
  window.location = "login.html"
  // return ;
}else{
  instance = axios.create({
    baseURL: 'https://scripton.herokuapp.com/api',
    headers: {'access_token': at}
  });
  initialize()
}
let data
async function initialize() {
  instance.get('/product').then(res => {
    data = res.data.data
    let t = "",i=1
    for(let r of data){
      t+="<tr><td scope='row'>"+i+"</td><td>"+r.name+"</td><td><span class='icon-Data-Transfer icon-transfer' data-toggle='modal' data-target='#exampleModal' onclick='opens("+i+")'></span></td><td><span class='icon-Trash-withMen icon-trash' data-toggle='modal' data-target='#deleteModal'></span></td></tr>"
      i++
    }
    console.log(t);
    $("#myTable").html(t)
  })
  // console.log(data);
}

function opens(i){
  $("#ccc").html("&lt;script src='https://scripton.herokuapp.com/js/ss/"+data[i]._id+"'&gt;&lt;/script&gt;")
  // alert("")
}
