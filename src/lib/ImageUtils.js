export const setCanvasDimensions = (ctx, cnvs) => {
  ctx.canvas.width = cnvs.offsetWidth;
  ctx.canvas.height = cnvs.offsetHeight;
};

export const loadImage = async (url, elem) => {
  return new Promise((resolve, reject) => {
    elem.onload = () => resolve(elem);
    elem.onerror = reject;
    elem.src = url;
  });
}

export const translateRect = (x, y, width, height, cWidth, cHeight) => {
  let dX = (cWidth / 2)  + x;
  let dY = (cHeight / 2) + y;

  dX = dX - (width / 2);
  dY = dY - (height / 2);

  return {dX, dY};
};

export const writeImageToCanvas = (img, canvasRef, keepAspectRatio, x, y, zoom, translate) => {

  const cnvs = canvasRef.current;
  const ctx = cnvs.getContext('2d');

  setCanvasDimensions(ctx, cnvs)

  if (cnvs.offsetWidth === 0 && cnvs.offsetHeight === 0) {
    // If the dim are 0, dont do anything
    return {res: true};
  }

  if(!img.complete) {
    // Return if image isn't loaded
    return {res: true};
  }
  
  let imgWidth = ctx.canvas.width;    // Set width the same as the canvas i.e fill it horizontally
  let imgHeight = ctx.canvas.height   // Set height the same as the canvas i.e fill it vertically

  if(keepAspectRatio) {
    imgHeight = img.height * imgWidth / img.width;
  }

  zoom = (zoom ?? 100) / 100;
  x    = x ?? 0;
  y    = y ?? 0;

  // Apply zoom
  imgWidth  *= zoom;
  imgHeight *= zoom;

  if(translate) {
    let {dX, dY} = translateRect(x, y, imgWidth, imgHeight, ctx.canvas.width, ctx.canvas.height);
    x = dX;
    y = dY;
  }

  ctx.drawImage(img, x, y, imgWidth, imgHeight);

  return {res: true, w: imgWidth, h: imgHeight};
};