import * as React from 'react';
import { useRef, useEffect } from 'react';

const canvasStyle = {
  position: 'absolute',
  height: ' 100%',
  width: '100%',
  left: 0,
  top: 0,
};


export default function IconCanvas({zIndex}) {

  const canvasRef = useRef(null)

  return (
    <canvas ref={canvasRef} style={{ zIndex, ...canvasStyle }} />
  );
}