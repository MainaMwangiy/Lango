import React from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
        backgroundColor: '#4CAF50 !important',
        color: 'white !important',
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
    },
    cardContent: {
        display: 'flex !important',
        alignItems: 'center !important',
    },
    avatar: {
        marginRight: '16px !important',
    },
    distanceText: {
        fontWeight: 'bold !important',
        padding: "10px !important"
    },
    locationText: {
        color: "#252B5C !important",
        fontSize: "25px  !important"
    }
});

export const LocationLayout = () => {
    const classes = useStyles();
    const distances = [
        '0 - 50m',
        '50 - 100m',
        '100 - 150m',
        '150 - 200m',
        '200 - 250m',
    ];

    return (
        <Box className={classes.locationCard}>
            <Box className={classes.distanceSelectHeader}>
                <Typography variant="h6" className={classes.locationText}>Select Location Distance</Typography>
                <Button variant="contained" color="primary" className={classes.continueButton}>
                    Continue
                </Button>
            </Box>
            <Box className={classes.cardsContainer}>
                {distances.map((distance, index) => (
                    <Card key={index} className={classes.card}>
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
