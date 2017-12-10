let productId = {{productId}}
function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

loadjscssfile("https://scripton.herokuapp.com/assets/css/theme.css", "css") //dynamically load and add this .js file
let modal
function scripton(){
  if(!modal){
    modal = document.createElement("div")
    modal.classList.add("modal1");
    let t = document.createElement("div")
    t.classList.add("modal1-content");
    let j = document.createElement("div")
    j.classList.add("modal1-body");
    let i = document.createElement("iframe")
    i.src = "https://scripton.herokuapp.com/editor.html"
    i.style.height = "100%"
    i.style.width = "100%"
    j.appendChild(i)
    t.appendChild(j)
    modal.appendChild(t)
    document.getElementsByTagName('body')[0].appendChild(modal);
  }
  modal.style.display  = "block"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// loadjscssfile("javascript.php", "js") //dynamically load "javascript.php" as a JavaScript file
// loadjscssfile("mystyle.css", "css") ////dynamically load and add this .css file
