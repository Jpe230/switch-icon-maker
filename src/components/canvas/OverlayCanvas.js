import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import { loadImage, writeImageToCanvas } from '../../lib/ImageUtils'

const canvasStyle = {
  position: 'absolute',
  height: ' 100%',
  width: '100%',
  left: 0,
  top: 0,
};

export default function OverlayCanvas({ zIndex, isInView, cbCanvasSize }) {

  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const imageUrl = 'http://localhost:3000/overlay.png';

  useEffect(() => {
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

    if (image == null) {
      getImage();
    }

  }, [isInView, cbCanvasSize, image])


  return (
    <canvas ref={canvasRef} style={{ zIndex, ...canvasStyle }} />
  );
}