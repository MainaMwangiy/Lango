import React, { useState, useEffect } from 'react';
import NotificationHeader from '../common/NotificationHeader';
import MailIcon from '@mui/icons-material/Mail';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import CommentIcon from '@mui/icons-material/Comment';
import SubscriptionIcon from '@mui/icons-material/Subscriptions';
import { Avatar, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';
import utils from '../utils';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
// import { useSelector } from 'react-redux';
const getIcon = (type) => {
    switch (type) {
        case 'message':
            return <MailIcon />;
        case 'order':
            return <LocalShippingIcon />;
        case 'security':
            return <SecurityIcon />;
        case 'social':
            return <CommentIcon />;
        case 'subscription':
            return <SubscriptionIcon />;
        default:
            return <MailIcon />;
    }
};

// const getStatusColor = (status) => {
//     switch (status) {
//         case 'unread':
//             return '#f0f0f0';
//         case 'read':
//             return '#e0e0e0';
//         default:
//             return '#ffffff';
//     }
// };
const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    },
    readBorder: {
        borderLeft: `6px solid ${theme.palette.grey[300]}`,
    },
    unreadBorder: {
        borderLeft: `6px solid ${theme.palette.primary.main}`,
    }
}));

const NotificationLayout = () => {
    const [notifications, setNotifications] = useState([]);
    const role = localStorage.getItem('role');
    const adminId = localStorage.getItem('adminId');
    const userId = localStorage.getItem('userId');
    const isAdmin = role && role.toLowerCase() === 'admin';
    const storeId = localStorage.getItem('id');
    const loggedInId = isAdmin ? adminId : userId;
    const id = storeId ?? loggedInId;
    const path = window.location.pathname.split('/').pop();
    const isMain = path === 'Main';
    const not = localStorage.getItem('notifications');
    const oldNotifications = JSON.parse(not);
    const classes = useStyles();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const newNotifications = await utils.fetchNotifications({ id, isAdmin })
            setNotifications(newNotifications);
        }
        if (oldNotifications) {
            setNotifications(oldNotifications);
        } else {
            fetchData();
        }
        // eslint-disable-next-line
    }, [isAdmin]);

    const handleNotificationClick = (notification) => {
        navigate(`/notifications/${notification.notification_id}`, { state: { notification } });
    };

    return (
        <div style={{ padding: '10px' }}>
            {!isMain &&
                <>
                    <NotificationHeader onDeleteNotifications={() => console.log('Delete all notifications')} />
                </>
            }
            {notifications.map((notification) => {
                const borderClass = notification.status === 'read' ? classes.readBorder : classes.unreadBorder;
                return (
                    <Card key={notification.notification_id} className={`${classes.card} ${borderClass}`}>
                        <CardActionArea onClick={() => handleNotificationClick(notification)}>
                            <CardContent>
                                <Avatar className={classes.avatar}>
                                    {getIcon(notification.notification_type)}
                                </Avatar>
                                <Typography variant="h6" component="div">
                                    {notification.content}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {`Status: ${notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}`}
                                    {" — "}
                                    {dayjs(notification.created_at).format('DD-MM-YYYY')}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                );
            })}
        </div>
    );
};

export default NotificationLayout;
