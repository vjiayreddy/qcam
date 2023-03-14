import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
function AlertBox({ openAlertBox, setOpenAlertBox, title, alertType }: any) {
    const handleClose = () => {
        setOpenAlertBox(false)
    }

    return ( <Snackbar open={openAlertBox} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
          {title}
        </Alert>
      </Snackbar>)
    
}

export default AlertBox;