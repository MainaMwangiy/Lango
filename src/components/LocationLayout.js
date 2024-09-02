import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Swal from 'sweetalert2';
import utils from '../utils';
import { useDispatch } from 'react-redux';
import { actions } from '../redux/actions';

const useStyles = makeStyles({
    locationCard: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid #E0E0E0 !important',
        backgroundColor: '#ffffff !important',
        zIndex: 1000,
        padding: '24px !important',
        boxSizing: 'border-box !important',
        borderRadius: '30px 30px 0 0 !important',
        maxHeight: '50% !important',
        overflow: 'hidden !important'
    },
    distanceSelectHeader: {
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'space-between !important',
        paddingBottom: '16px !important'
    },
    continueButton: {
        borderRadius: '25px !important',
        textTransform: 'none !important',
        backgroundColor: (props) => (props.isButtonDisabled ? 'gray' : '#4CAF50 !important'),
        color: 'white !important',
        '&:hover': {
            backgroundColor: (props) => (props.isButtonDisabled ? 'gray' : '#4CAF50 !important'),
        },
    },
    cardsContainer: {
        overflowY: 'auto !important',
        maxHeight: '250px !important'
    },
    card: {
        display: 'flex !important',
        alignItems: 'center !important',
        padding: '10px !important',
        backgroundColor: '#ffffff !important',
        margin: '10px 0 !important',
        boxShadow: '#ffffff !important',
        borderRadius: '20px !important',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s'
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        marginRight: '16px !important',
    },
    distanceText: {
        fontWeight: 'bold !important',
        padding: "10px !important",
        marginLeft: 2
    },
    locationText: {
        color: "#252B5C !important",
        fontSize: "23px  !important"
    },
    selectedCard: {
        backgroundColor: '#4CAF50 !important',
        color: 'white !important',
    }
});

export const LocationLayout = ({ onConfirm }) => {
    const dispatch = useDispatch();
    const [selectedDistance, setSelectedDistance] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const classes = useStyles({ isButtonDisabled });

    const handleCardClick = (distance) => {
        setSelectedDistance(distance);
        setIsButtonDisabled(false);
    };

    const handleContinueClick = () => {
        Swal.fire('Security guard notified!', 'The security guard has been notified to open the gate.', 'success').then(() => {
            notifyAdmin(selectedDistance);
            dispatch({ type: actions.CLOSE_LOCATION_CARDS, payload: false });
            onConfirm();
        });
    };

    const notifyAdmin = (distance) => {
        // Logic to send alert to the admin and security app
        console.log(`Admin notified to open the gate. Distance: ${distance}`);
        // You might want to implement this with a real-time service like Firebase or a server API.
    };

    return (
        <Box className={classes.locationCard}>
            <Box className={classes.distanceSelectHeader}>
                <Typography variant="h6" className={classes.locationText}>{"Select Location Distance"}</Typography>
                <Button
                    variant="contained"
                    className={classes.continueButton}
                    onClick={handleContinueClick}
                    disabled={isButtonDisabled}
                >
                    {"Continue"}
                </Button>
            </Box>
            <Box className={classes.cardsContainer}>
                {utils.distances.map((distance, index) => (
                    <Card
                        key={index}
                        className={`${classes.card} ${selectedDistance === distance ? classes.selectedCard : ''}`}
                        onClick={() => handleCardClick(distance)}
                    >
                        <CardContent className={classes.cardContent}>
                            <Avatar>
                                <LocationOnIcon />
                            </Avatar>
                            <Typography variant="subtitle1" className={classes.distanceText}>
                                {`${distance} from the Apartments`}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};
