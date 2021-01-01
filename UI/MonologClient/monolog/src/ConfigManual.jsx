import React, { useContext, useState } from 'react';
import Button from './Button';
import ConfigContext from "./ConfigContext";

export default function Counter(props) {
    const configs = useContext(ConfigContext).data
    const changeConfigs = useContext(ConfigContext).changeConfigs;
    const [value, setValue] = useState(props.value);

    function increment() {
        if ((value + 1) < 11) {
            setValue(value + 1);
            handleChange(value + 1);
        }
    }

    function decrement() {
        if ((value - 1) > 0) {
            setValue(value - 1);
            handleChange(value - 1);
        }
    }

    function handleChange(newValue) {
        if (props.isPortsPerChannel) {
            configs.portsPerChannel = newValue;
        } else {
            configs.timesToSend = newValue;
        } changeConfigs(configs);
    }

    return (
        <React.Fragment>
            <Button mr="5" size="small" variant="contained" color="default" onClick={increment}>
                +
            </Button>
            <span>{value}</span>
            <Button ml="5" size="small" variant="contained" color="default" onClick={decrement}>
                -
            </Button>
        </React.Fragment>
    )
}