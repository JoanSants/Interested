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
        fontFamily:'Grand Hotel, cursive',
        fontSize:'32px'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    ToolBarBackGround: {
        backgroundColor:'#800000',
        color:'#fff'
    }
};

const navbar = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.ToolBarBackGround}>
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
