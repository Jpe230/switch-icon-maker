import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import Snackbar from '@mui/joy/Snackbar';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/joy';
import { parseCSV } from '../lib/csvUtils';
import { useDispatch } from 'react-redux'

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function FileUpload() {

  const [openSnack, setOpen] = useState(false);
  const [numberTitles, setNumber] = useState(0);

  const dispatch = useDispatch();

  const handleFileUpload = async (e) => {
    let file = e.target.files[0];
    let entries = await parseCSV(file);
    setOpen(true);
    setNumber(entries.length);
    dispatch.titles.addRange(entries);
    dispatch.panel.next();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      spacing={3}>
      <Typography level="h2" sx={{ textAlign: 'center' }} >
        Upload a CSV file containing your currently installed titles
      </Typography>
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        color="neutral"
        startDecorator={
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </SvgIcon>
        }
      >
        Upload a CSV
        <VisuallyHiddenInput onChange={handleFileUpload} type="file" />
      </Button>
      <Snackbar
        open={openSnack}
        onClose={handleClose}
        autoHideDuration={2000}
        color="success"
        variant="solid"
        size="lg">
        {numberTitles} titles found
      </Snackbar>
    </Stack>
  );
}