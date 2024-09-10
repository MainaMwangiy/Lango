import React, { useState, useEffect } from 'react';
import NotificationHeader from '../common/NotificationHeader';
import MailIcon from '@mui/icons-material/Mail';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import CommentIcon from '@mui/icons-material/Comment';
import SubscriptionIcon from '@mui/icons-material/Subscriptions';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import dayjs from 'dayjs';
import utils from '../utils';
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
    // const openNotification = useSelector(state => state.location.openNotification);

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
