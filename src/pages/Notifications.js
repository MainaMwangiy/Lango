import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
    CircularProgress, Alert, Divider, Box, Typography, Avatar, Button
} from '@mui/material';
import NotificationHeader from '../common/NotificationHeader';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';

const useStyles = makeStyles(theme => ({
    card: {
        background: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        margin: theme.spacing(3),
        padding: theme.spacing(2),
        fontFamily: 'Roboto, sans-serif',
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        fontWeight: 500,
        fontSize: '1.2rem',
        marginLeft: theme.spacing(2),
    },
    subheader: {
        color: '#888',
        fontSize: '0.85rem',
        marginTop: theme.spacing(0.5),
    },
    content: {
        color: '#555',
        marginTop: theme.spacing(2),
        lineHeight: 1.6,
    },
    divider: {
        margin: `${theme.spacing(3)}px 0`,
        backgroundColor: '#ddd',
    },
    actionButton: {
        marginTop: theme.spacing(2),
        color: theme.palette.primary.main,
    }
}));

const NotificationItem = ({ notificationId }) => {
    const classes = useStyles();
    const location = useLocation();
    const [notification, setNotification] = useState(location.state?.notification || null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!notification) {
            setIsLoading(true);
            axios.get(`/api/notifications/details/${notificationId}`)
                .then(response => {
                    setNotification(response.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching notification details:', err);
                    setError('Failed to load notification');
                    setIsLoading(false);
                });
        }
    }, [notificationId, notification]);

    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!notification) return <Alert severity="info">No notification found.</Alert>;

    return (
        <Box>
            <NotificationHeader />
            <div className={classes.card}>
                <Box display="flex" alignItems="center">
                    <Avatar className={classes.avatar}>
                        <AccessAlarmIcon />
                    </Avatar>
                    <Typography variant="h6" component="div" className={classes.title}>
                        A Message from {notification.senderName || "System"}
                    </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" className={classes.subheader}>
                    {dayjs(notification.createdAt).format('DD-MM-YYYY')}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="body1" className={classes.content}>
                    {notification.content}
                </Typography>
                {notification.actionUrl && (
                    <Button variant="contained" color="primary" className={classes.actionButton} onClick={() => window.location.href = notification.actionUrl}>
                        Take Action
                    </Button>
                )}
            </div>
        </Box>
    );
};

export default NotificationItem;
