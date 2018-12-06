import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const navigationItem = props => {
    return (
        <NavLink to={props.link} exact={props.exact}>
            <ListItem button key={props.children}>
                <ListItemText primary={props.children} />
            </ListItem>
        </NavLink>
    )
}

export default withStyles(styles)(navigationItem);