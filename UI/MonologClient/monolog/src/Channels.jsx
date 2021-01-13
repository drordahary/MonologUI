import React, { useContext, useState, useReducer } from "react";
import ConfigContext from "./ConfigContext";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField } from "@material-ui/core";
import Button from "./Button";

export default function Channels() {
    const config = useContext(ConfigContext).data;
    const changeConfigs = useContext(ConfigContext).changeConfigs;
    const [path, setPath] = useState();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const items = config.channels.map((path) =>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={path}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                    <div onClick={() => deletePath(path)}>
                        <DeleteIcon />
                    </div>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )

    function addPath() {
        if (path !== '') {
            config.channels.push(path);
            changeConfigs(config);
            setPath('');
            forceUpdate();
        }
    }

    function deletePath(path) {
        const index = config.channels.indexOf(path);
        config.channels.splice(index, 1);
        changeConfigs(config);
        setPath('');
        forceUpdate();
    }

    function handleChange(e) {
        setPath(e.target.value);
    }

    return (
        <div>
            <TextField label="Path" onChange={handleChange} value={path} style={{ width: 350 }}>
            </TextField>
            <Button color="primary" variant="contained" ml={3} mt={1.5} onClick={addPath}>Add Path</Button>
            <List>
                {items}
            </List>
        </div>
    )
}