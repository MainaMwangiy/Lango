import React from 'react';
import headerImage from '../assets/loginHeader.svg';
import { makeStyles } from '@material-ui/core';
import { Button, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import theme from '../theme';
import { useNavigate } from 'react-router';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '20px',
        margin: '0 auto',
        minHeight: '100vh',
        boxSizing: 'border-box',
        backgroundSize: 'cover',
        backgroundColor: "#ffffff",
    },
    header: {
        width: '100%',
        height: '150px',
        backgroundImage: `url(${headerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: '0 0 20px 0',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
        gap: '20px',
    },
    loginButton: {
        textTransform: "none !important",
        backgroundColor: `${theme.colors.secondary} !important`,
        color: `${theme.colors.text} !important`,
        padding: '10px 20px !important',
        fontSize: '18px  !important',
        borderRadius: '5px !important',
    },
    googleButton: {
        backgroundColor: '#4285F4 !important',
        padding: '10px 20px !important',
        color: '#ffffff !important',
        '&:hover': {
            backgroundColor: '#357ae8 !important',
        },
    },
    facebookButton: {
        backgroundColor: '#4267B2 !important',
        padding: '10px 20px !important',
        color: '#ffffff !important',
        '&:hover': {
            backgroundColor: '#365899 !important',
        },
    },
    signInText: {
        fontSize: "25px",
        fontFamily: "Lato"
    },
    signInInner: {
        color: "#1F4C6B"
    },
    signInMainText: {
        margin: 0
    },
    authChange: {
        position: 'absolute',
        bottom: '10px',
        width: '100%',
        textAlign: 'center',
        alignContent: "center"
    }
});

export const AuthLayout = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/Main');
    }
    return (
        <div className={classes.root}>
            <div className={classes.header}></div>
            <div className={classes.signInText}>Lets <span className={classes.signInInner}>Sign In</span></div>
            <div className={classes.signInMainText}>Please login into your account</div>
            <form className={classes.form}>
                <TextField label="Email" variant="outlined" />
                <TextField label="Password" type="password" variant="outlined" />
                <Button className={classes.loginButton} onClick={handleSubmit}>Login</Button>
                <Button className={classes.googleButton}>
                    <GoogleIcon />  Sign in with Google
                </Button>
                <Button className={classes.facebookButton}>
                    <FacebookIcon />  Sign in with Facebook
                </Button>
            </form>
            <div className={classes.authChange}>Don't have an account?  <span className={classes.signInInner}>Register</span></div>
        </div>
    );
};
