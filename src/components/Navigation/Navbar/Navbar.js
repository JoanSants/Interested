import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Categories from '../Categories/Categories';
import {NavLink } from 'react-router-dom';

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

const navbar = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon onClick={props.drawerToggleClicked} />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        <NavLink to='/'>Interessados</NavLink>
                    </Typography>
                    <Categories/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(navbar);
