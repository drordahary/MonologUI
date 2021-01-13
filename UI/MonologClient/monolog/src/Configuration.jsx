import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import ConfigTable from './ConfigTable';
import ConfigContext from "./ConfigContext";
import Channels from "./Channels";
import Box from "@material-ui/core/Box";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

function Configuration(props) {
    const configs = useContext(ConfigContext).data;
    const socket = props.socket;
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    let errorArray = []

    function update() {
        socket.emit('configuration', configs);
        socket.on('errors', (errors) => {
            let isEmpty = (errors || []).length === 0;
            if (!isEmpty) {
                let data = errors;
                console.log(data.canApprove);
                for (let key in data) {
                    errorArray.push(data[key]);
                }
                setItems(errorArray.map((error) =>
                    <Typography gutterBottom>
                        {error}
                    </Typography>
                )); setOpen(true);
            }
        });
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Box mb={5} mt={5} >
                <ConfigTable />
            </Box>

            <Channels />

            <Button color="primary" variant="contained" onClick={update}>Update</Button>

            <Dialog onClose={handleClose} aria-labelledby="errors-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Invalid Input
                </DialogTitle>
                <DialogContent dividers>
                    {items}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default Configuration;