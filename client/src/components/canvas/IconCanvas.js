import { useEffect, useState } from 'react';
import { loadImage, writeImageToCanvas } from '../../lib/imageUtils'

const canvasStyle = {
  position: 'absolute',
  height: ' 100%',
  width: '100%',
  left: 0,
  top: 0,
};

export default function IconCanvas({ zIndex, zoom, x, y, urlImage, isInView, canvasRef}) {
  
  const [image, setImage] = useState(null);
  const [currentImageUrl, setImageUrl] = useState("");

  useEffect(() => { // Show canvas when is in view
    if(canvasRef === undefined) {
      return;
    }

    if (!isInView) {
      return
    }

    if (urlImage === undefined || urlImage === null) {
      return;
    }

    const getImage = async () => {
      let localCopy = await loadImage(urlImage, new Image());
      let r = writeImageToCanvas(localCopy, canvasRef, true, x, y, zoom, true);
      if (r.res) {
        setImageUrl(urlImage);
        setImage(localCopy);
      }
    }

    if (image === null || currentImageUrl !== urlImage) {
      getImage();
    }

  }, [isInView, urlImage, currentImageUrl, image, x, y, zoom, canvasRef])

  useEffect(() => { // Ran when canvasRef is created

    if(canvasRef === undefined) {
      return;
    }

    if (image === null) {
      return;
    }

    let localCopy = image;
    writeImageToCanvas(localCopy, canvasRef, true, x, y, zoom, true);

  }, [x, y, zoom, image, canvasRef])


  return (
    <canvas ref={canvasRef} style={{ zIndex, ...canvasStyle }} />
  );
}