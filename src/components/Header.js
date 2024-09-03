import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Avatar, Tooltip, Badge, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { makeStyles } from '@material-ui/core';
import profile from "../assets/profile.svg";
import map from "../assets/map.svg";
import theme from '../theme';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { actions } from '../redux/actions';

const useStyles = makeStyles({
    appBar: {
        backgroundColor: 'white !important',
        boxShadow: 'none !important',
        marginTop: "10px !important"
    },
    toolbar: {
        display: "flex  !important",
        justifyContent: "space-between  !important",
    },
    title: {
        flexGrow: 1,
        color: 'black !important'
    },
    notificationButton: {
        marginRight: "2px !important",
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
        border: "1px solid #ECEDF3 !important",
        color: "#234F68  !important",
        borderRadius: "50px  !important"
    },
    location: {
        height: "20px !important",
        marginRight: "10px !important",
        padding: "10px !important"
    },
    locationText: {
        fontSize: "14px !important"
    },
    profileSection: {
        justifyContent: "flex-end  !important",
        display: 'flex !important'
    },
    menu: {
        display: { xs: 'block', md: 'none' }
    }
});

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Header = ({ onOpenUserMenu, anchorElUser, onCloseUserMenu }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleNotifications = () => {
        navigate('/notifications')
        dispatch({ type: actions.LOAD_NOTIFICATION, payload: true });
        return(()=> {
            dispatch({ type: actions.LOAD_NOTIFICATION, payload: false });
        })
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleMenuItemClick = (setting) => {
        if (setting === 'Logout') {
            handleLogout();
        } else {
            onCloseUserMenu();
        }
    };
    return (
        <AppBar position="static" className={classes.appBar} color="default">
            <Container maxWidth="xl">
                <Toolbar disableGutters className={classes.toolbar}>
                    <Button component="div" className={classes.locationContainer}>
                        <img alt="Map" src={map} className={classes.location} />
                        <Typography className={classes.locationText}>{`Kahawa, Nairobi`}</Typography>
                    </Button>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Notifications">
                            <IconButton
                                onClick={toggleNotifications}
                                className={classes.notificationButton}
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit">
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
                            sx={{ mt: '45px' }}
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
                                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)} className={classes.menuItem}>
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
