import * as React from 'react';
import Container from '@mui/joy/Container';
import FileUpload from '../panels/FileUpload';
import OverlaySelection from '../panels/OverlaySelection';
import TitleSelection from '../panels/TitleSelection'
import { useSelector } from 'react-redux'
import ApiKey from '../panels/ApiKey';

export default function PanelContainer() {

    const panelState = useSelector((state) => state.panel);

    return (
        <Container
            disableGutters
            sx={(theme) => ({
                position: 'relative',
                maxHeight: '97vh',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                alignItems: 'strech',
                justifyContent: 'center',
                paddingLeft: 0,
                paddingRight: 0
            })}
        >
            {panelState == 0 && <FileUpload />}
            {panelState == 1 && <ApiKey />}
            {panelState == 2 && <OverlaySelection />}
            {panelState == 3 && <TitleSelection />}
        </Container>
    );
}