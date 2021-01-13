import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import ConfigContext from "./ConfigContext";

export default function ConfigIP(props) {
    const config = useContext(ConfigContext).data;
    const changeConfigs = useContext(ConfigContext).changeConfigs;
    const [errorText, setErrorText] = useState('');

    function validateIP(e) {
        if (props.isSrc) {
            config.srcIP = e.target.value;
        } else {
            config.dstIP = e.target.value;
        } if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(e.target.value)) {
            setErrorText('');
        } else {
            setErrorText('Invalid IP');
        } changeConfigs(config);
    }

    return (
        <TextField
            required id="standard-required"
            autoComplete="off"
            error={errorText.length === 0 ? false : true}
            helperText={errorText}
            defaultValue={config.srcIP}
            onChange={validateIP} />
    )
}