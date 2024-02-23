import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        display: 'flex  !important',
        marginTop: "30px !important",
        marginBottom: "30px !important",
        borderRadius: "25px  !important",
        background: "#F5F4F8  !important",
        height: 200
    },
    cardMedia: {
        width: "200px !important",
        margin: "5px !important",
        borderRadius: "25px  !important"
    },
    cardDetails: {
        display: 'flex  !important',
        flexDirection: 'column  !important'
    },
    detailsTitle: {
        fontSize: "14px !important",
        color: "#252B5C !important",
        fontWeight: "bold !important"
    },
    detailsDescription: {
        fontSize: "12px !important",
        color: "#252B5C !important"
    }
});

const CommonCard = ({ details }) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                className={classes.cardMedia}
                image={details?.image_url || ''}
                alt={details?.name || ''}
            />
            <Box className={classes.cardDetails}>
                <CardContent>
                    <Typography className={classes.detailsTitle}>
                        {details?.name || ''}
                    </Typography>
                    <Typography className={classes.detailsDescription}>
                        {`${details?.description || ''}`}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CommonCard;
