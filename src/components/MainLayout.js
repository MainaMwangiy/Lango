import React, { useState } from 'react';
import { Header } from './Header';
import { Box, Button, Typography } from '@mui/material';
import CommonCard from '../common/Card';
import apartments from "../assets/apartments.svg";
import vehicles from "../assets/vehicles.svg";
import { makeStyles } from '@material-ui/core';
import { styled } from '@mui/material/styles';

const useStyles = makeStyles({
    welcomeText: {
        color: "#252B5C",
        fontSize: 25,
        marginBottom: "10px"
    },
    openText: {
        color: "#252B5C",
        fontSize: 25,
        marginBottom: "10px"
    },
    slideMessage: {
        color: "#252B5C",
        fontSize: 25,
        marginBottom: "10px"
    },
    user: {
        color: "#234F68",
        fontSize: 20,
        marginBottom: "10px"
    },
    slideTrack: {
        position: 'relative',
        width: '100%',
        height: '50px',
        borderRadius: '25px',
        backgroundColor: '#F5F4F8',
        margin: '20px 0'
    },
});

export const MainLayout = () => {
    const classes = useStyles();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [slideRight, setSlideRight] = useState(false);

    const handleSlide = () => {
        setSlideRight(true);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const vehicleDetails = {
        image: vehicles,
        alt: '2022 Lamborghini Urus',
        title: '2022 Lamborghini Urus',
        description: 'KDC 569G - Automatic - 7500cc - Blue',
    };

    const apartmentDetails = {
        image: apartments,
        alt: 'Sky Dandelions Apartments',
        title: 'Sky Dandelions Apartments',
        description: 'Jakarta, Indonesia',
    };
    const SliderButton = styled(Button)({
        borderRadius: '25px',
        backgroundColor: '#4CAF50',
        color: 'white',
        position: 'absolute',
        height: '50px',
        width: "100px !important",
        top: '50%',
        transform: 'translateY(-50%)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            backgroundColor: '#43A047',
        },
        '& .MuiButton-endIcon': {
            position: 'absolute',
            right: 2,
        },
        right: 0,
        zIndex: 1,
        textTransform: "none"
    });
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header
                onOpenUserMenu={handleOpenUserMenu}
                anchorElUser={anchorElUser}
                onCloseUserMenu={handleCloseUserMenu}
            />
            <Box sx={{ p: 2 }}>
                <Typography className={classes.welcomeText}>
                    Hey, <span className={classes.user}>Maina</span>
                </Typography>
                <Typography className={classes.openText}>
                    Request to open Gate
                </Typography>
                <CommonCard details={apartmentDetails} />
                <CommonCard details={vehicleDetails} />

                <Typography className={classes.slideMessage}>
                    Please slide button to the right to request to open Gate.
                </Typography>
                <div className={classes.slideTrack}>
                    <SliderButton
                        variant="contained"
                        onClick={handleSlide}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            left: slideRight ? 'auto' : '0',
                            right: slideRight ? '0' : 'auto',
                        }}
                    >
                        Slide
                    </SliderButton>
                </div>
            </Box>
        </Box>
    );
}
