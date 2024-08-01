import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
    minWidth: '600px', // Ajustez la largeur si nécessaire
  },
}));

const DialogTitleWrapper = styled(DialogTitle)({
  paddingRight: '0px',
});

const Popup = (props) => {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <StyledDialog open={openPopup} maxWidth="md">
      <DialogTitleWrapper>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton color="secondary" onClick={() => setOpenPopup(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitleWrapper>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </StyledDialog>
  );
};

export default Popup;
