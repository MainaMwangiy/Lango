import React from 'react';
import { makeStyles } from '@material-ui/core';
import theme from '../theme';
import config from './config';
import { Button, Typography } from '@mui/material';


const useStyles = makeStyles({
    root: (props) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        padding: '20px',
        margin: 0,
        minHeight: '100vh',
        boxSizing: 'border-box',
        backgroundImage: `url(${props.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }),
    spacer: {
        flexGrow: 1
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        flexGrow: 0,
        flexShrink: 0,
    },
    loader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logoImage: {
        maxWidth: '300px'
    },
    logoName: {
        color: theme.colors.text,
        fontSize: '16px',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
    },
    loaderText: {
        color: theme.colors.text,
        fontSize: '16px',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
    },
    buttonComponent: {
        backgroundColor: theme.colors.secondary,
        padding: '10px 20px',
        borderRadius: '50px',
        fontSize: '18px',
        position: 'absolute',
        bottom: '40px',
        width: '50%',
        textAlign: 'center'
    },
    button: {
        color: '#ffffff !important',
        fontSize: '18px',
        textTransform: 'none !important',
        textAlign: 'center'
    },
    version: {
        position: 'absolute',
        bottom: '10px',
        color: theme.colors.text,
    },
});
export const Loader = ({ configKey, ...props }) => {
    const { background } = props[configKey] || {};
    const classes = useStyles({ background });
    const configuration = props[configKey];
    if (!configuration) return null;
    return (
        <div className={classes.root}>
            <div className={classes.spacer} />
            <div className={classes.content}>
                <img src={configuration.logo} alt="Logo" className={classes.logoImage} />
                <Typography variant="h5" className={classes.logoName}>
                    {configuration.logoName}
                </Typography>
                <Typography className={classes.loaderText}>
                    {configuration.loaderText}
                </Typography>
            </div>
            {configuration.startButton && (
                <div className={classes.buttonComponent}>
                    <Button type='button' className={classes.button}>Get Started</Button>
                </div>
            )}
            {configuration.version && (
                <Typography className={classes.version}>Version {configuration.version}</Typography>
            )}
            <div className={classes.spacer} />
        </div>
    )
}
