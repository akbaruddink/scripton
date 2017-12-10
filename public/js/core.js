// const data = {
//   color: ["#FFFFFF","#fc8d74","#164a7c","#ff0033","#23d260","#4cd1ff","#cc2f7b","#000000","#ffb739","#c34628","#4a2958"],
//   mainCanvas: {
//     type: "SINGLE",
//     canvas: {
//       id: "mainCanvas",
//       width: 500,
//       height: 500,
//       top:0,
//       left:0,
//       data:{
//         type: "IMAGE",
//         url: "images/bag.png",
//         filters: [{
//           type: "TINT",
//           color: "#0057CC",
//           opacity: 0.5
//         }]
//       }
//     }
//   },
//   subCanvas:[{
//     id: "subCanvas",
//     width:  200,
//     height: 350,
//     top: 220,
//     left: 70,
//     data: [{
//       type: "TEXT",
//       text: "Hello World",
//       options: {
//         fontSize: 20
//       }
//     }]
//   }]
// }

const generated = {
  mainCanvas: {
    elements: []
  },
  subCanvas:{
    elements: []
  }
}
const listMap = []

function addText() {
  let x = document.getElementById("select").selectedIndex;
  let t = $("#textInput").val()
  let text = new fabric.Text(t,{
    fontFamily: fonts[x],
  });
  text.left = (_subCanvas.width - text.width)/2
  text.top = (_subCanvas.height - text.height)/2
  _subCanvas.add(text)
  // _subCanvas.centerObject(text)
  _subCanvas.setActiveObject(text)
  generated.subCanvas.elements.push(text)
  addListItem(_subCanvas, text)
}

function addListItem(c, elem){
  listMap.push({c,elem})
  let i = listMap.length
  $("#myUl").append("<li><button onclick='selectItem("+i+")'>"+i+"</button></li>")
}

function addImage(image) {
  let img = new fabric.Image(image)
  img.left = (_subCanvas.width - img.width)/2
  img.top = (_subCanvas.height - img.height)/2
  _subCanvas.add(img)
  _subCanvas.setActiveObject(img)
  generated.subCanvas.elements.push(img)
  addListItem(_subCanvas, img)
}

function selectItem(i){
  let obj = listMap[i-1]
  if(obj.c.getActiveObject() == obj.elem){
    obj.c.discardActiveObject().renderAll()
  }else{
    obj.c.setActiveObject(obj.elem)
  }
}

function removeItem(obj){
  for(i=0; i<listMap.length; i++){
    if(listMap[i].elem == obj){
      break
    }
  }
  listMap.splice(i,1)
  $("#myUl li:last").remove()
  for(i=0; i<generated.subCanvas.elements.length; i++){
    if(generated.subCanvas.elements[i] == obj){
      generated.subCanvas.elements.splice(i,1)
    }
  }
}

// const data = {
//   color: [],
//   designList: [{
//     type: "IMAGE",
//     url: "trophies/t2.jpg",
//     location: 0,
//     adjustPadding:{
//       left: 30,
//     }
//   },{
//     type: "IMAGE",
//     url: "trophies/m2.jpg",
//     location: 1,
//     adjustPadding:{
//       left: 35,
//     }
//   },{
//     type: "IMAGE",
//     location: 2,
//     url: "trophies/b2.jpg",
//     adjustPadding:{
//       // left:  18
//     }
//   },{
//     type: "IMAGE",
//     location: 0,
//     url: "trophies/t1.jpg",
//     adjustPadding:{
//       left: 12,
//     }
//   },{
//     type: "IMAGE",
//     url: "trophies/m1.jpg",
//     location: 1,
//     adjustPadding:{
//       left: 35,
//     }
//   },{
//     type: "IMAGE",
//     url: "trophies/b1.jpg",
//     location:  2,
//     adjustPadding:{
//       // left:  18
//     }
//   }],
//   mainCanvas: {
//     type: "MULTIPLE",
//     canvas: {
//       id: "mainCanvas",
//       width: 500,
//       height: 500,
//       top:0,
//       left:0,
//       data:[{
//         type: "IMAGE",
//         url: "trophies/t2.jpg",
//         adjustPadding:{
//           left: 30,
//         }
//       },{
//         type: "IMAGE",
//         url: "trophies/m2.jpg",
//         adjustPadding:{
//           left: 35,
//         }
//       },{
//         type: "IMAGE",
//         url: "trophies/b2.jpg",
//         adjustPadding:{
//           // left:  18
//         }
//       }]
//     }
//   },
//   subCanvas:[{
//     id: "subCanvas",
//     width:  50,
//     height: 70,
//     top: 375,
//     left: 215,
//     data: [{
//       type: "TEXT",
//       text: "Hello World",
//       options: {
//         fontSize: 20
//       }
//     }]
//   }]
// }

let _mainCanvas, _subCanvas, _group


function updateColor(color){
  generated.color = color
  generated.mainCanvas.img.filters = [new fabric.Image.filters.Tint({
    color,
    opacity: 0.5
  })]
  generated.mainCanvas.img.applyFilters(_mainCanvas.renderAll.bind(_mainCanvas));
}

async function initialize(){
  if(data.color && data.color.length){
    for(c of data.color){
      $("#colorUl").append('<li class="clr-pvw" style="background-color:'+c+'" onclick=updateColor("'+c+'")></li>')
    }
  }
  if(data.designList && data.designList.length){
    for(let obj of data.designList){
      let image = new Image()
      image.src = obj.url
      image.height = 100
      image.onload = function(){
        $("#designImages").append(image)
      }
      image.addEventListener('click', function(){
        // _group.remove(obj.location)
        data.mainCanvas.canvas.data[obj.location] = obj
        createMultipleMainCanvas(data.mainCanvas.canvas)
        console.log("yaba");

        // for(let elem of generated.mainCanvas.elements){
        //
        // }
        // let group =  new fabric.Group(_group.item(0), _group.item(1))
        // _mainCanvas.remove(_group)
        // _mainCanvas.add(group)
        // let img = new fabric.Image(image)
        // _group.item(obj.location).setSrc(obj.url)
        // _mainCanvas.renderAll()
        // console.log("here 2");
        return ;
      })
    }
  }
  let mainCanvas = data.mainCanvas
  switch (mainCanvas.type) {
    case "SINGLE":
      createSingleMainCanvas(data.mainCanvas.canvas)
      break;
    case "MULTIPLE":
      createMultipleMainCanvas(data.mainCanvas.canvas)
    default:
  }
  let subCanvas = data.subCanvas[0]
  createSubCanvas(subCanvas)
}

function createSubCanvas(subCanvas){
  _subCanvas = helper.createCanvas(subCanvas)
}

function createSingleMainCanvas(canvas){
  _mainCanvas = helper.createCanvas(canvas)
  let imageData = canvas.data
  let image = new Image()
  if(!imageData.options){
    imageData.options = {}
  }
  if(imageData.options.selectable !== true){
    imageData.options.selectable = false
  }
  // let img
  image.onload = function(){
    let img = new fabric.Image(image, imageData.options)
    if(imageData.filters){
      for(filter of imageData.filters){
        switch (filter.type) {
          case "TINT":
          default: {
            img.filters.push(new fabric.Image.filters.Tint(filter))
          }
        }
      }
      img.applyFilters(_mainCanvas.renderAll.bind(_mainCanvas));
    }
    _mainCanvas.add(img)
    if(imageData.scaleImage !== false){
      let imagePadding = imageData.padding || 40
      img.scaleToWidth(_mainCanvas.width - imagePadding)
      img.scaleToHeight(_mainCanvas.height - imagePadding)
      img.top = imagePadding/2
      img.left = imagePadding/2
    }
    _mainCanvas.renderAll()
    generated.mainCanvas.img = img
    console.log("done");
  }
  image.src = imageData.url
}

function getImage(url){
  return new Promise(function(resolve, reject) {
    let image = new Image()
    image.onload = function(){
      resolve(image)
    }
    image.src = url
  });;
}

async function createMultipleMainCanvas(canvas){
  if(_group){
    _mainCanvas.remove(_group)
  }else{
    _mainCanvas = helper.createCanvas(canvas)
  }
  let list = canvas.data
  let distance = 0
  let group = []
  for(imageData of list){
    // generated.mainCanvas.elements.push(imageData)
    let image = await getImage(imageData.url)
    let img = new fabric.Image(image, imageData.options)
    if(imageData.filters){
      for(filter of imageData.filters){
        switch (filter.type) {
          case "TINT":
          default: {
            img.filters.push(new fabric.Image.filters.Tint(filter))
          }
        }
      }
      // img.applyFilters(_mainCanvas.renderAll.bind(_mainCanvas));
    }

    if(imageData.adjustPadding){
      if(imageData.adjustPadding.left){
        img.left = imageData.adjustPadding.left
      }else{
        img.top = imageData.adjustPadding.top
      }
    }
    img.top = (img.top||0)+distance
    distance += img.height
    group.push(img)
  }
  _group = new fabric.Group(group)
  _mainCanvas.add(_group)
  _mainCanvas.centerObject(_group)
}

// initialize()
let data
console.log(productId, "aleem");
