import * as React from 'react';
import Slider from '@mui/joy/Slider'
import Box from '@mui/joy/Box'

const marks = [
  {
    value: 0,
    label: 'CSV',
  },
  {
    value: 1,
    label: 'Edit Images',
  },
  {
    value: 2,
    label: 'Export',
  },
];


export default function StepIndicator() {
  return (
    <Box sx={{
      width: '100%',
      py: 4,
      px: 3
    }}>
      <Slider
        defaultValue={1}
        step={1}
        valueLabelDisplay="off"
        marks={marks}
        min={0}
        max={2}
        sx={{
          "--Slider-trackSize": "5px",
          "--Slider-markSize": "10px",
          "--Slider-thumbSize": "40px",
          "--Slider-thumbWidth": "40px",
          "--Slider-valueLabelArrowSize": "1px"
        }}
      />
    </Box>


  );
}