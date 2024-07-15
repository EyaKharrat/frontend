import React from 'react';
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        minWidth: '600px' // Adjust the width as needed
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}));

const Popup = (props) => {
    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton color="secondary" onClick={() => setOpenPopup(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default Popup;
