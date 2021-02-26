import React, { useState } from "react";
import Button from './Button';

export default function Monitoring(props) {
    const socket = props.socket;
    const [TXStarted, setTXStarted] = useState(false);
    const [RXStarted, setRXStarted] = useState(false);

    function notifyServer(option, control) {
        if (control === "Start") {
            if (option === "TX" && !TXStarted) {
                setTXStarted(true);
            } else if (option === "RX" && !RXStarted) {
                setRXStarted(true);
            } socket.emit("startService", option);
        } else {
            if (option === "TX" && TXStarted) {
                setTXStarted(false);
            } else if (option === "RX" && RXStarted) {
                setRXStarted(false);
            } socket.emit("stopService", option);
        }
    }

    return (
        <React.Fragment>
            <Button color="primary" variant="contained" onClick={() => notifyServer("TX", "Start")}>Start TX</Button>
            <Button mx={5} color="primary" variant="contained" onClick={() => notifyServer("TX", "Stop")}>Stop TX</Button>
            <Button mx={5} color="primary" variant="contained" onClick={() => notifyServer("RX", "Start")}>Start RX</Button>
            <Button color="primary" variant="contained" onClick={() => notifyServer("RX", "Stop")}>Stop RX</Button>
        </React.Fragment>
    )
}