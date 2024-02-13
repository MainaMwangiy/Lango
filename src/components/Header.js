import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Avatar, Tooltip, Badge, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { makeStyles } from '@material-ui/core';
import profile from "../assets/profile.svg";
import map from "../assets/map.svg";
import theme from '../theme';

const useStyles = makeStyles({
    appBar: {
        backgroundColor: 'white',
        boxShadow: 'none',
        marginTop: "10px"
    },
    toolbar: {
        display: "flex  !important",
        justifyContent: "space-between  !important",
    },
    title: {
        flexGrow: 1,
        color: 'black'
    },
    notificationButton: {
        marginRight: theme.spacing(2),
        border: `2px solid ${theme.colors.secondary}  !important`
    },
    avatarButton: {
        padding: 0,
    },
    avatar: {
        border: '2px solid #DFDFDF !important'
    },
    locationContainer: {
        justifyContent: "flex-start  !important",
        textTransform: "none  !important",
        border: "1px solid #ECEDF3",
        color: "#234F68  !important",
        padding: "10px  !important",
        borderRadius: "50px  !important"
    },
    location: {
        height: "30px",
        marginRight: "10px",
        padding: "10px"
    },
    profileSection: {
        justifyContent: "flex-end  !important",
        flexGrow: 0,
        display: 'flex'
    },
    menu: {
        display: { xs: 'block', md: 'none' }
    }
});

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Header = ({ onOpenUserMenu, anchorElUser, onCloseUserMenu }) => {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.appBar} color="default">
            <Container maxWidth="xl">
                <Toolbar disableGutters className={classes.toolbar}>
                    <Button component="div" className={classes.locationContainer}>
                        <img alt="Map" src={map} className={classes.location} />
                        <Typography noWrap>{`Kahawa, Nairobi`}</Typography>
                    </Button>
                    <Box className={classes.profileSection}>
                        <Tooltip title="Notifications">
                            <IconButton className={classes.notificationButton}>
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Open settings">
                            <IconButton onClick={onOpenUserMenu} className={classes.avatarButton}>
                                <Avatar alt="Jonathan" src={profile} className={classes.avatar} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            className={classes.menu}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={onCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={onCloseUserMenu} className={classes.menuItem}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
