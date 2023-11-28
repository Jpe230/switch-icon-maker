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

export default function IconCanvas({ zIndex, zoom, x, y, urlImage, isInView}) {

  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [currentImageUrl, setImageUrl] = useState("");

  useEffect(() => {
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

  }, [isInView, urlImage, currentImageUrl, image, x, y, zoom])

  useEffect(() => {
    if (image == null) {
      return;
    }

    let localCopy = image;
    writeImageToCanvas(localCopy, canvasRef, true, x, y, zoom, true);

  }, [x, y, zoom, image])


  return (
    <canvas ref={canvasRef} style={{ zIndex, ...canvasStyle }} />
  );
}