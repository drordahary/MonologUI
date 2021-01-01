import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import ConfigTable from './ConfigTable';
import ConfigContext from "./ConfigContext";

function Configuration(props) {
    const configs = useContext(ConfigContext).data;
    const socket = props.socket;

    function update() {
        socket.emit('configuration', configs);
    }

    return (
        <React.Fragment>
            <ConfigTable />
            <Button color="primary" variant="contained" onClick={update}>Update</Button>
        </React.Fragment>
    )
}

export default Configuration;