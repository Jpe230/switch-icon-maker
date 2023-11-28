import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import { useDispatch } from 'react-redux'
import Snackbar from '@mui/joy/Snackbar';

export default function ApiKey() {

  const [openSnack, setOpen] = useState(false);
  const [apikey, setApiKey] = useState("");

  const dispatch = useDispatch();

  const handleClick = async (e) => {
    if (apikey == "" || apikey == null || apikey == undefined) {
      setOpen(true);
      return;
    }

    console.log(apikey);
    dispatch.apikey.set(apikey);
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
      <Input
        value={apikey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="SteamGridApi APIKEY..."
        endDecorator={
          <Button
            onClick={handleClick}
          >Set APIKEY</Button>
        } />

      <Snackbar
        open={openSnack}
        onClose={handleClose}
        autoHideDuration={2000}
        color="danger"
        variant="solid"
        size="lg">
        APIKEY required
      </Snackbar>
    </Stack>
  );
}