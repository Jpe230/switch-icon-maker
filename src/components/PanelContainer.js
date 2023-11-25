import * as React from 'react';
import Container from '@mui/joy/Container';
import FileUpload from './FileUpload';
import ImageEditor from './ImageEditor';

export default function PanelContainer() {
    return (
        <Container
            disableGutters
            sx={(theme) => ({
                position: 'relative',
                maxHeight: '95vh',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                alignItems: 'strech',
                justifyContent: 'center',
                py: 3,
                paddingLeft: 0,
                paddingRight: 0
            })}
        >
           {/* <FileUpload/> */}
           <ImageEditor/>
        </Container>
    );
}