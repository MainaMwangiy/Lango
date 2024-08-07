import React, { useState, useEffect } from 'react';
import headerImage from '../assets/loginHeader.svg';
import { makeStyles } from '@material-ui/core';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import theme from '../theme';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
const initialValues = Object.freeze({
    email: '',
    password: '',
});

const url =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_PROD_BACKEND_URL
        : process.env.REACT_APP_DEV_BACKEND_URL;

export const AuthLayout = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialValues);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        if (token && id) {
            navigate('/Main');
        }
    }, [navigate]);

    const handleShowHidePassword = () => {
        setShowPassword(!showPassword);
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/auth/login`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.data.success) {
                Swal.fire({
                    title: 'Success',
                    text: `${formData.email} Logged In Successfully`,
                    icon: 'success',
                });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', response.data.id);
                navigate('/Main');
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Login Failed',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'Login Failed',
            });
        }
    };
    return (
        <div className={classes.root}>
            <div className={classes.header}></div>
            <div className={classes.signInText}>
                Lets <span className={classes.signInInner}>Sign In</span>
            </div>
            <div className={classes.signInMainText}>Please login into your account</div>
            <form className={classes.form} onSubmit={login}>
                <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={formData.email || ''}
                    onChange={onChange}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password || ''}
                    onChange={onChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowHidePassword}>
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button className={classes.loginButton} type="submit">
                    Login
                </Button>
                <Button className={classes.googleButton}>
                    <GoogleIcon /> Sign in with Google
                </Button>
                <Button className={classes.facebookButton}>
                    <FacebookIcon /> Sign in with Facebook
                </Button>
            </form>
            {/* Commenting out this Registration section as at the moment I dont need it. user details created from the dashboard */}
            {/* <div className={classes.authChange}>Don't have an account? <span className={classes.signInInner}>Register</span></div> */}
        </div>
    );
};
