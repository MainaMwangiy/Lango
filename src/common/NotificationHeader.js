import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../redux/actions';

const NotificationHeader = ({ onDeleteNotifications }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBack = () => {
        navigate(-1);
        dispatch({ type: actions.LOAD_NOTIFICATION, payload: false });
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            <IconButton
                onClick={handleBack}
                aria-label="back"
                sx={{ backgroundColor: '#F2F4F8 !important' }}
            >
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div">
                Notifications
            </Typography>
            <IconButton
                onClick={onDeleteNotifications}
                aria-label="delete all notifications"
                sx={{ backgroundColor: '#F2F4F8 !important' }}
            >
                <DeleteIcon />
            </IconButton>
        </Box>

    );
};

export default NotificationHeader;