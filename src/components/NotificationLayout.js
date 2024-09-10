import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationHeader from '../common/NotificationHeader';
import MailIcon from '@mui/icons-material/Mail';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import CommentIcon from '@mui/icons-material/Comment';
import SubscriptionIcon from '@mui/icons-material/Subscriptions';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import dayjs from 'dayjs';
// import { useSelector } from 'react-redux';

const url =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_PROD_BACKEND_URL
        : process.env.REACT_APP_DEV_BACKEND_URL;

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

const NotificationLayout = () => {
    const [notifications, setNotifications] = useState([]);
    const role = localStorage.getItem('role');
    const adminId = localStorage.getItem('adminId');
    const userId = localStorage.getItem('userId');
    const isAdmin = role && role.toLowerCase() === 'admin';
    const id = isAdmin ? adminId : userId;
    const path = window.location.pathname.split('/').pop();
    const isMain = path === 'Main';
    // const openNotification = useSelector(state => state.location.openNotification);

    useEffect(() => {
        const fetchNotifications = async () => {
            const endpoint = isAdmin ? `/api/notifications/all` : `/api/notifications/user`;
            try {
                const response = await axios.post(`${url}${endpoint}`, id);
                setNotifications(response?.data?.data);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };
        fetchNotifications();
    }, [isAdmin, id]);

    return (
        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            {!isMain &&
                <>
                    <NotificationHeader onDeleteNotifications={() => console.log('Delete all notifications')} />
                </>
            }
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {notifications.map((notification) => (
                    <React.Fragment key={notification.notification_id}>
                        <ListItem alignItems="flex-start"
                        // sx={{bgcolor: getStatusColor(notification.status)}}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    {getIcon(notification.notification_type)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={notification.content}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {`Status: ${notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}`}
                                        </Typography>
                                        {" — "}
                                        {dayjs(notification.created_at).format('DD-MM-YYYY')}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};

export default NotificationLayout;
