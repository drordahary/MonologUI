import React from 'react';
import Config from './Configuration';
import Button from './Button';
import './Router.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

function MyRouter(props) {
    return (
        <Router>
            <div>
                <Button variant="contained" color="primary">
                    <Link to="/config">Configuration</Link>
                </Button>

                <Button mx={5} variant="contained" color="primary" >
                    <Link to="/">Home</Link>
                </Button>

                <Button variant="contained" color="primary">
                    <Link to="/prog">Progression</Link>
                </Button>

                <hr width="500" />
                <Switch>
                    <Route exact path="/">

                    </Route>
                    <Route path="/config">
                        <Config socket={props.socket} />
                    </Route>
                    <Route path="/progression"></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default MyRouter;