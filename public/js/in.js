let canvas= helper.createCanvas({
  id: "c1",
  width: 500,
  height: 500,
  top:0,
  left:0
})


function clipByName(ctx, clipRect) {
    this.setCoords();
    // var clipRect = findByClipName(this.clipName);
    var scaleXTo1 = (1 / this.scaleX);
    var scaleYTo1 = (1 / this.scaleY);
    ctx.save();

    var ctxLeft = -(this.width / 2) + clipRect.strokeWidth;
    var ctxTop = -(this.height / 2) + clipRect.strokeWidth;
    var ctxWidth = clipRect.width - clipRect.strokeWidth;
    var ctxHeight = clipRect.height - clipRect.strokeWidth;

    ctx.translate(ctxLeft, ctxTop);
    ctx.scale(scaleXTo1, scaleYTo1);
    ctx.rotate(degToRad(this.angle * -1));

    ctx.beginPath();
    ctx.rect(
        clipRect.left - this.oCoords.tl.x,
        clipRect.top - this.oCoords.tl.y,
        clipRect.width,
        clipRect.height
    );
    ctx.closePath();
    ctx.restore();
}



function findByClipName(name) {
  console.log(canvas.getObjects());
    return _(canvas.getObjects()).where({
        clipFor: name
    })
}

// Since the `angle` property of the Image object is stored
// in degrees, we'll use this to convert it to radians.
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

// let canvas2= helper.createOnlyCanvas({
//   id: "c2",
//   width: 300,
//   height: 300,
//   top:0,
//   left:0
// })

var circle1 = new fabric.Circle({
  radius: 50,
  fill: 'red',
  left: 0
});
var circle2 = new fabric.Circle({
  radius: 50,
  fill: 'green',
  left: 100
});
var circle3 = new fabric.Circle({
  radius: 50,
  fill: 'blue',
  left: 200
});


var group

fabric.Image.fromURL('trophies/t1.jpg', function(img1) {
  img1.left = 12
  fabric.Image.fromURL('trophies/m1.jpg', function(img2){
    img2.top = img1.height
    img2.left = 35
    fabric.Image.fromURL('trophies/b1.jpg', function(img3){
      img3.top = img1.height+img2.height
      group = new fabric.Group([ img1, img2, img3 ]);
     canvas.add(group);
    })
  })



  // img.left = group.get('left')  + circle1.get('left')
  // group.addWithUpdate(img)
})

var clipRect = new fabric.Rect({
    originX: 'left',
    originY: 'top',
    left: 10,
    top: 10,
    width: 150,
    height: 150,
    fill: 'transparent',
    // fill: '#DDD', /* use transparent for no fill */
    // strokeWidth: 0,
    selectable: false
});
clipRect.set({
    clipFor: 'pug'
});
canvas.add(clipRect);

let text = new fabric.Text("hello word", {
  top: 10,
  left: 10,
  fontSize:20,
  fill: '#FFFFFF',
  clipName: 'pug',
  clipTo: function(ctx){
    return ctx.rect(0,100,100,100)
  }
});
canvas.add(text)
// setTimeout(function(){
//   canvas.remove(group)
// }, 3000)
