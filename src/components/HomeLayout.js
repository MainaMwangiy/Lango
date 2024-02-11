import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import theme from '../theme';
import config from './config';
import { Button, Typography } from '@mui/material';
import { Loader } from './Loader';

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
        backgroundImage: `linear-gradient(rgba(35, 79, 104, 0.7), rgba(35, 79, 104, 0.7)), url(${props.background})`,
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
        bottom: '60px',
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
        width: '100%',
        textAlign: 'center',
        color: theme.colors.text,
    },
    versionContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.colors.text,
    }
});


export const HomeLayout = ({ configKey, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { background } = props[configKey] || {};
    const classes = useStyles({ background });
    const configuration = config[configKey];
    let version = '';

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (!configuration) return null;
    if (isLoading) {
        return <Loader configKey="Loader" {...props.Loader} />;
    }

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

            <div className={classes.spacer} />
            <div className={classes.buttonComponent}>
                {configuration.startButton && (
                    <Button type='button' className={classes.button}>Get Started</Button>
                )}
            </div>
            {configuration.version && (
                <div className={classes.version}>
                    <div className={classes.versionContent}>
                        <Typography>{'Lango'}</Typography>
                        <Typography>{`${version || 'v.1.0'}`}</Typography>
                    </div>
                </div>
            )}
            <div className={classes.spacer} />
        </div>
    );
};