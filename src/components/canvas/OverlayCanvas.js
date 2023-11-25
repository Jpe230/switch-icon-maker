import * as React from 'react';
import { useRef, useEffect } from 'react';

const canvasStyle = {
  position: 'absolute',
  height: ' 100%',
  width: '100%',
  left: 0,
  top: 0,
};

export default function OverlayCanvas({ zIndex }) {

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    var width = canvas.offsetWidth;
    var height = canvas.offsetHeight;

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0, width, height);
    };

    console.log("this");

    img.src = 'http://localhost:3000/overlay.png';
  }, [zIndex]);

  return (
    <canvas ref={canvasRef} style={{ zIndex, ...canvasStyle }} />
  );
}