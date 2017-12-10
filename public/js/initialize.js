
let data = [{
  id: "c",
  width: 500,
  height: 500,
  top:0,
  left: 0,
  data: [{
    type: "IMAGE",
    url: "images/frame.png",
    filters: [{
      type: "TINT",
      color: "#0077CC",
      opacity: 0.5
    }],
    options: {
      selectable: true
    }
  }],
},{
  id: "c2",
  width: 150,
  height: 150,
  top:180,
  left:180,
  data: [
    {
      type: "TEXT",
      text: "Hello World",
      options: {
        fontSize: 20
      }
    }
  ]
}]

for(d of data){
  let c = helper.createCanvas(d)
  for(obj of d.data){
    switch (obj.type) {
      case "IMAGE":
        attachImage(c, obj)
        break;
      case "TEXT":
        attachText(c, obj)
      default:

    }
  }
  // setTimeout(function(){
  //   output(c,d)
  // },3000)
}

function output(c, d){
  // let div = document.createElement("div")
  // console.log("here");
  // div.style.position = "absolute"
  // div.style.top = d.top
  // div.style.left = d.left
  let image = new Image()
  let data = c.toDataURL('png')
  console.log(data);
   $("#myDiv2").append($('<img style="position:absolute;top:'+(d.top+500)+'px;left:'+(d.left+500)+'px"/>').attr('src', data));
  // $('<img />').attr('src', 'http://imagesrc.com')
  // $("#im").attr('src', data)
  // image.url = data
  // image.onload = function(){
  //   console.log("called");
  //   image.style.width = d.width
  //   image.style.height = d.height
  //   $(div).append(image)
    // $("#myDiv2").append(image)
  // }
}



function attachText(c, obj){
  let text = new fabric.Text(obj.text, obj.options);
  c.add(text)
}

function attachImage(c, obj){
  let image = new Image()
  image.onload = function(){
    let img = new fabric.Image(image, obj.options);
    if(obj.filters){
      for(filter of obj.filters){
        switch (filter.type) {
          case "TINT":
            img.filters.push(new fabric.Image.filters.Tint(filter))
            break;
          default:
        }
      }
      img.applyFilters()
    }
    img.applyFilters(c.renderAll.bind(c));
    c.add(img);
    c.centerObject(img);
    // c.renderAll()
    // c.calcOffset()
  }
  image.src = obj.url
}
//
// let canvas = helper.createCanvas(data[0])
// let c2= helper.createCanvas(data[1])
// // var canvas = new fabric.Canvas('c');
// var text = new fabric.Text('hello world', {
// fontSize: 30,
// });
// c2.add(text)
// var imgs = new Image();
//
// imgs.onload = function(){
//   var img = new fabric.Image(imgs, {
//
//   });
//   // image  has been loaded
//   img.filters.push( new fabric.Image.filters.Tint({color:"#0077CC", opacity:0.6}));
//
//   // apply filters and re-render canvas when done
//   img.applyFilters();
//   canvas.add(img);
//   canvas.centerObject(img);
//   // canvas.add(text)
// };
//  imgs.crossOrigin="anonymous";
// imgs.src = "images/blank_tshirtb.png";

// fabric.Image.fromURL('images/blank_tshirtb.png', function(img) {
//   img.crossOrigin = "Anonymous";
//   // add filter
//   img.filters.push(new fabric.Image.filters.Grayscale());
//
//   // apply filters and re-render canvas when done
//   img.applyFilters();
//   // add image onto canvas (it also re-render the canvas)
//   canvas.add(img);
// });
// "add" rectangle onto canvas
// canvas.add(rect, rect2);
