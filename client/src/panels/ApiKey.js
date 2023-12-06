import { useState } from 'react';

import { Snackbar, Button, Stack, Input } from '@mui/joy';

import { useDispatch } from 'react-redux'

export default function ApiKey() {

  const [openSnack, setOpen] = useState(false);
  const [apikey, setApiKey] = useState("");

  const dispatch = useDispatch();

  const handleClick = async (e) => {
    if (apikey === "" || apikey === null || apikey === undefined) {
      setOpen(true);
      return;
    }
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