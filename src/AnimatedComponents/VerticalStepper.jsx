import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

// Styling for the connectors
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 5,
    borderRadius: 1,
    borderLeftWidth:0
  },
}));

const QontoStepIconRoot = styled('div')(({ theme }) => ({
  color: '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  ...theme.applyStyles('dark', {
    color: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        color: '#784af4',
      },
    },
  ],
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

const steps = ['Select campaign settings', 'Create an ad'];

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleFinish = () => {
    alert('Process completed!');
    // Add your finish logic here
  };

  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
      {/* Stepper Section */}
      <Box sx={{ width: '25%', borderRight: '1px solid', borderColor: 'divider' }}>
        <Stepper
          orientation="vertical"
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      
      {/* Content Section */}
      <Box sx={{ width: '75%', padding: 3 }}>
        <motion.div
          key={activeStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" gutterBottom>
            {steps[activeStep]}
          </Typography>
          <Box>
            {/* Content based on activeStep */}
            {activeStep === 0 && <Typography>Content for Step 1</Typography>}
            {activeStep === 1 && <Typography>Content for Step 2</Typography>}
            {activeStep === 2 && <Typography>Content for Step 3</Typography>}
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Button onClick={handleBack} disabled={activeStep === 0}>
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button onClick={handleFinish}>
                Finish
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
                Next
              </Button>
            )}
          </Box>
        </motion.div>
      </Box>
    </Stack>
  );
}
