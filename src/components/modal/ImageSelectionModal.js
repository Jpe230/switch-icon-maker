import * as React from 'react';
import { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ModalOverflow from '@mui/joy/ModalOverflow';
import ModalDialog from '@mui/joy/ModalDialog';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';

import { useSelector } from 'react-redux'

export default function ImageSelectionModal({ open, onClose, titleName, onImageChange }) {

  const apikey = useSelector((state) => state.apikey);

  console.log(apikey);

  const [enableSelect, setEnabled] = useState(true);
  const [enableSearch, setEnabledSearch] = useState(true);
  const [loadingSearch, setLoading] = useState(false);
  const [titleVal, setTitle] = useState(titleName);
  const [selectVal, setSelect] = useState(null);
  const [searchOptions, setOptions] = useState([]);
  const [imageList, setImageList] = useState([]);

  const searchTitles = async () => {
    setLoading(true);
    setEnabledSearch(true);

    let res = await fetch(`/api/v2/search/autocomplete/${titleVal}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Authorization': `Bearer ${apikey}`
      }
    });
    let jRes = await (res.json());
    let options = jRes.data.map(e => {
      return { Id: e.id, Name: e.name }
    });

    setOptions(options);
    setEnabled(false);
    setLoading(false);

  }

  const onChange = (e, newValue) => {
    setSelect(newValue)

    setEnabled(false);
    setEnabledSearch(false);
  }

  const searchImages = async () => {

    setLoading(true);
    setEnabledSearch(true);

    let res = await fetch(`/api/v2/grids/game/${selectVal}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Authorization': `Bearer ${apikey}`
      }
    });
    let jRes = await (res.json());

    setImageList(jRes.data.map(e => {
      return { thumb: e.thumb, url: e.url };
    }));
    setEnabledSearch(false);
    setLoading(false);
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalOverflow>
        <ModalDialog aria-labelledby="modal-dialog-overflow"
          layout={'center'}
          sx={{
            maxWidth: '700px'
          }}>
          <ModalClose />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Search for artwork:
          </Typography>
          <Input
            value={titleVal}
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={titleName}
            endDecorator={
              <Button
                onClick={searchTitles}
                loading={loadingSearch}
              >Search</Button>
            } />
          <Select disabled={enableSelect}
            placeholder="Select a title from the list"
            indicator={null}
            value={selectVal}
            onChange={onChange}
            endDecorator={
              <Button
                onClick={searchImages}
                disabled={enableSearch}
                loading={loadingSearch}
              >Search</Button>
            }>
            {
              searchOptions.map(e => <Option value={e.Id} key={e.Id}>{e.Name}</Option>)
            }
          </Select>
          <Stack spacing={0} direction="row" flexWrap="wrap" useFlexGap sx={{ justifyContent: 'space-between' }}>
            {
              imageList.map(e =>
                <Sheet
                  key={e.thumb}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1
                  }}>
                  <Button
                    onClick={() => onImageChange(e.url)}
                    variant="outlined"
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}>
                    <img alt="Icon" src={e.thumb} style={{ margin: 'auto', width: 150 }} />
                  </Button>
                </Sheet>
              )
            }
          </Stack>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  )
}