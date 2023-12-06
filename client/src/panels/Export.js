import { Button, Stack } from '@mui/joy';
import { useSelector } from 'react-redux'
import { zipPhotosAsync } from '../lib/zipUtils'
import { saveAs } from 'file-saver'

export default function ApiKey() {

  const gamesStete = useSelector((state) => state.titles);

  const handleClick = async (e) => {
    let zipFolder = await zipPhotosAsync(gamesStete);
    saveAs(zipFolder, "custom-icons.zip");
  };

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      spacing={3}>
      <Button onClick={handleClick}>Download files</Button>
    </Stack>
  );
}