import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Step, { stepClasses } from '@mui/joy/Step';
import { Typography, Stepper } from '@mui/joy';

import PhotoLibrary from '@mui/icons-material/PhotoLibraryRounded';
import FileUpload from '@mui/icons-material/FileUploadRounded';
import IosShare from '@mui/icons-material/IosShareRounded';
import WebHook from '@mui/icons-material/WebhookRounded';
import Layers from '@mui/icons-material/LayersRounded';

import theme from '../theme';

import { useSelector } from 'react-redux'

const steps = [
  {
    value: 0,
    label: 'CSV',
    icon: FileUpload
  },
  {
    value: 1,
    label: 'APIKEY',
    icon: WebHook
  },
  {
    value: 2,
    label: 'Select overlay',
    icon: Layers
  },
  {
    value: 3,
    label: 'Edit images',
    icon: PhotoLibrary
  },
  {
    value: 4,
    label: 'Export',
    icon: IosShare
  },
];

export default function DottedConnector() {
  const panelState = useSelector((state) => state.panel);
  return (
    <Stepper
      size="lg"
      sx={{
        width: '100%',
        paddingTop: theme.spacing(4),
        height: 100,
        "--Step-connectorThickness": "6px",
        "--Step-gap": "18px",
        "--Step-connectorRadius": "29px",
        "--Step-connectorInset": "15px",
        "--StepIndicator-size": "3rem",
        [`& .${stepIndicatorClasses.root}`]: {
          borderWidth: 4,
        },
        [`& .${stepClasses.root}::after`]: {
          height: 4,
        },
        [`& .${stepClasses.completed}`]: {
          [`& .${stepIndicatorClasses.root}`]: {
            color: 'primary.50',
          },
          '&::after': {
            bgcolor: 'primary.700',
          },
        },
        [`& .${stepClasses.active}`]: {
          [`& .${stepIndicatorClasses.root}`]: {
            borderColor: 'primary.300',
          },
        },
        [`& .${stepClasses.disabled} *`]: {
          borderColor: 'neutral.softDisabledColor',
          color: 'neutral.softDisabledColor',
        },
      }}
    >
      {steps.map((e, i) =>
        <Step
          key={`step-${i}`}
          orientation="vertical"
          completed={panelState > i}
          active={panelState === i}
          disabled={panelState < i}
          indicator={
            <StepIndicator variant={panelState > i ? "solid" : "outlined"} color="primary">
              <e.icon />
            </StepIndicator>
          }
        >
          <Typography level="title-sm"
          >
            {e.label}
          </Typography>

        </Step>
      )}
    </Stepper>
  );
}