import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ConfigManual from './ConfigManual'
import ConfigIP from './ConfigIP';
import ConfigSize from './ConfigSize';
import ConfigContext from "./ConfigContext";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function ConfigTable() {
    const configs = useContext(ConfigContext).data;
    const keys = Object.keys(configs);
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.name}>
                <TableHead>
                </TableHead>
                <TableBody>
                    <TableRow key={keys[0]}>
                        <TableCell component="th" scope="row">Source IP</TableCell>
                        <TableCell align="right">
                            <ConfigIP isSrc={true} />
                        </TableCell>
                    </TableRow>

                    <TableRow key={keys[1]}>
                        <TableCell component="th" scope="row">Destination IP</TableCell>
                        <TableCell align="right">
                            <ConfigIP isSrc={false} />
                        </TableCell>
                    </TableRow>

                    <TableRow key={keys[2]}>
                        <TableCell component="th" scope="row">Port Offset</TableCell>
                        <TableCell align="right">
                            <ConfigSize min={1} max={65535} isBuffer={false} />
                        </TableCell>
                    </TableRow>

                    <TableRow key={keys[3]}>
                        <TableCell component="th" scope="row">Ports Per Channel</TableCell>
                        <TableCell align="center">
                            <ConfigManual value={10} isPortsPerChannel={true} />
                        </TableCell>
                    </TableRow>

                    <TableRow key={keys[4]}>
                        <TableCell component="th" scope="row">Buffer Size</TableCell>
                        <TableCell align="right">
                            <ConfigSize min={1} max={5120} isBuffer={true} />
                        </TableCell>
                    </TableRow>

                    <TableRow key={keys[5]}>
                        <TableCell component="th" scope="row">Times To Send</TableCell>
                        <TableCell align="center">
                            <ConfigManual value={1} isPortsPerChannel={false} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}