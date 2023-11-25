import * as React from 'react';
import { useRef, useEffect } from 'react';

const canvasStyle = {
  position: 'absolute',
  height: ' 100%',
  width: '100%',
  left: 0,
  top: 0,
};


export default function IconCanvas({ zIndex, zoom, x, y }) {

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    var width = canvas.offsetWidth;
    var height = canvas.offsetHeight;

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    var img = new Image();
    img.src = 'https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/8f1718b71f4c9b489cc079731d01337c.jpg';

    var imageWidth = width * (zoom / 100);
    var imageHeight = height * (zoom / 100);

    ctx.drawImage(img, x, y, imageWidth, imageHeight);

  }, [zoom, x, y]);

  return (
    <canvas ref={canvasRef} style={{ zIndex, ...canvasStyle }} />
  );
}