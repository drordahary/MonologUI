import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import ConfigContext from "./ConfigContext";

export default function ConfigSize(props) {
    const configs = useContext(ConfigContext).data;
    const changeConfigs = useContext(ConfigContext).changeConfigs;
    const min = props.min;
    const max = props.max;
    const defaultSize = props.isBuffer ? configs.bufferSize : configs.portOffset;
    const [errorText, setErrorText] = useState('');

    function sizeChanged(e) {
        if (props.isBuffer) {
            configs.bufferSize = e.target.value;
        } else {
            configs.portOffset = e.target.value;
        } if (e.target.value < min || e.target.value > max || isNaN(e.target.value) || e.target.value === '') {
            setErrorText('Invalid Input');
            configs.portOffset = e.target.value;
        } else {
            setErrorText('');
        } changeConfigs(configs);
    }

    return (
        <TextField
            required id="standard-required"
            error={errorText.length === 0 ? false : true}
            helperText={errorText}
            defaultValue={defaultSize}
            onChange={sizeChanged}
        />
    )
}