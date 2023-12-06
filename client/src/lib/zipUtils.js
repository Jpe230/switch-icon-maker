import JSZip from 'jszip'
import { loadImage } from "./imageUtils";

const WIDTH = 256;
const HEIGHT = 256;

const resizeImg = async (image) => {
  let tmpImage = await loadImage(image, new Image());
  var tmpCanvas = document.createElement('canvas');

  tmpCanvas.width = WIDTH;
  tmpCanvas.height = HEIGHT;

  var ctx = tmpCanvas.getContext('2d');
  ctx.drawImage(tmpImage, 0, 0, WIDTH, HEIGHT);

  return tmpCanvas.toDataURL("image/jpeg");
}

export const zipPhotosAsync = async (titles) => {
  const baseRoute = "atmosphere/contents";
  let zip = new JSZip();

  for (const t of titles) {
    let uri = t.dataUri;
    uri = await resizeImg(uri);
    let idx = uri.indexOf('base64,') + 'base64,'.length;
    let content = uri.substring(idx);
    console.log(content);
    zip.file(`${baseRoute}/${t.titleId}/icon.jpg`, content, { base64: true });
  }

  return await zip.generateAsync(
    {
      type: 'blob',
    });
}