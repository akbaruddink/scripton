var textBtn = document.getElementById("textBtn");
var textMenu = document.getElementById("textMenu");
var colorBtn = document.getElementById("colorBtn");
var colorMenu = document.getElementById("colorMenu");
var uploadBtn = document.getElementById("uploadBtn");
var uploadMenu = document.getElementById("uploadMenu");
var designBtn = document.getElementById("designBtn");
var designMenu = document.getElementById("designMenu");
function resetDesignMenu(){
  textBtn.classList.remove("active")
  textMenu.classList.add("d-n")
  designBtn.classList.remove("active")
  designMenu.classList.add("d-n")
  colorBtn.classList.remove("active")
  colorMenu.classList.add("d-n")
  uploadBtn.classList.remove("active")
  uploadMenu.classList.add("d-n")
}
function designMenuOpen() {
  resetDesignMenu()
  if (designMenu.classList.contains("d-n") === false) {
    designBtn.classList.remove("active")
    designMenu.classList.add("d-n")
  } else {
    designBtn.classList.add("active")
    designMenu.classList.remove("d-n")
  }
}

function textMenuOpen() {
  resetDesignMenu()

  if (textMenu.classList.contains("d-n") === false) {
    textBtn.classList.remove("active")
    textMenu.classList.add("d-n")
  } else {
    textBtn.classList.add("active")
    textMenu.classList.remove("d-n")
  }
}

function colorMenuOpen() {
  resetDesignMenu()

  if (colorMenu.classList.contains("d-n") === false) {
    colorBtn.classList.remove("active")
    colorMenu.classList.add("d-n")
  } else {
    colorBtn.classList.add("active")
    colorMenu.classList.remove("d-n")
  }
}

function uploadMenuOpen() {
  resetDesignMenu()

  if (uploadMenu.classList.contains("d-n") === false) {
    uploadBtn.classList.remove("active")
    uploadMenu.classList.add("d-n")
  } else {
    uploadBtn.classList.add("active")
    uploadMenu.classList.remove("d-n")
  }
}

// File Upload Handler

function previewImages() {

  var preview = document.querySelector('#uploadPreview');

  if (this.files) {
    [].forEach.call(this.files, readAndPreview);
  }

  function readAndPreview(file) {

    // Make sure `file.name` matches our extensions criteria
    if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
      return alert(file.name + " is not an image");
    } // else...

    var reader = new FileReader();

    reader.addEventListener("load", function() {
      let image = new Image();
      image.height = 100;
      image.title  = file.name;
      image.src    = this.result;
      preview.appendChild(image);
      image.addEventListener('click', function(){
        addImage(image)
      })
    }, false);

    reader.readAsDataURL(file);

  }

}

document.querySelector('#uploadInput').addEventListener("change", previewImages, false);

// for design Section

var myPhoto = ["https://ss.beddinginn.com/images/product/12/12252/12252073_12.jpg", "https://cdn.shopify.com/s/files/1/0678/8333/products/Studio_Session_1-051_large.jpg?v=1482791575", "http://www.trophiesplusmedals.co.uk/wp-content/uploads/2016/11/Trophy-Free-PNG-Image.png"];

var container = document.getElementById("table_container");

var table = document.createElement("table");
document.getElementById("table_container").appendChild(table);

for (var i=0, len = myPhoto.length; i < len; ++i) {
    var row = document.createElement("tr"),
    photo = document.createElement("td"),
    img = new Image();

    // name.appendChild(document.createTextNode(myPhoto[i]));

    img.src = myPhoto[i];
    img.alt = myPhoto[i];
    photo.appendChild(img);

    row.appendChild(photo);
    // row.appendChild(name);

    table.appendChild(row);
}
