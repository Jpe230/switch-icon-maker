import { useEffect, useState } from 'react';
import { loadImage, writeImageToCanvas } from '../../lib/imageUtils'

const canvasStyle = {
  position: 'absolute',
  height: ' 100%',
  width: '100%',
  left: 0,
  top: 0,
};

export default function OverlayCanvas({ zIndex, isInView, cbCanvasSize, canvasRef }) {

  const [image, setImage] = useState(null);
  const imageUrl = '/overlay.png';

  useEffect(() => { // Show canvas when is in view

    if (canvasRef === undefined) {
      return;
    }

    if (!isInView) {
      return
    }

    const getImage = async () => {
      let localCopy = await loadImage(imageUrl, new Image());
      let res = writeImageToCanvas(localCopy, canvasRef, false);
      if (res.res) {
        setImage(localCopy);
        cbCanvasSize(res.w, res.h);
      }
    }

    if (image === null) {
      getImage();
    }

  }, [isInView, cbCanvasSize, image, canvasRef])


  return (
    <canvas ref={canvasRef} style={{ zIndex, ...canvasStyle }} />
  );
}