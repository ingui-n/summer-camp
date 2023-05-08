import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmationDialog = ({open, onClose, onSubmit, onDeny, denyText, submitText, message, data}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h6">Ověření</Typography>
          </Box>
          <Box>
            <IconButton onClick={onClose}>
              <CloseIcon/>
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDeny} color="primary" autoFocus>
          {denyText}
        </Button>
        <Button onClick={() => onSubmit(data)} color="primary" type='submit'>
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
