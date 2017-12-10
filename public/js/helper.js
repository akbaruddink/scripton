const helper = {
  createCanvas: (options) => {
    let div = document.createElement("div")

    let canvas = document.createElement('canvas');
    canvas.id = options.id;
    canvas.style.width = options.width
    canvas.style.height = options.height
    div.style["min-width"] = options.width
    div.style["max-width"] = options.width
    div.style["min-height"] = options.height
    div.style["max-height"] = options.height
    div.style.position = "absolute"
    div.style.top = options.top+"px"
    div.style.left = options.left+"px"
    canvas.style.border= "1px solid green"
    $(div).append(canvas)
    // div.appendChlid(canvas)
    $("#myDiv").append(div)
    let c = new fabric.Canvas(options.id);
    c.setHeight(options.width);
    c.setWidth(options.height);
    c.renderAll()
    return c;
  },
  createOnlyCanvas: (options) => {
    let canvas = document.createElement('canvas');
    canvas.id = options.id;
    canvas.style.width = options.width
    canvas.style.height = options.height
    canvas.style.border= "1px solid green"
    // $(div).append(canvas)
    // div.appendChlid(canvas)
    // $("#myDiv").append(div)
    let c = new fabric.Canvas(canvas);
    c.setHeight(options.width);
    c.setWidth(options.height);
    c.renderAll()
    return c;
  }
}
