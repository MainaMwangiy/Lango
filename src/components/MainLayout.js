import React, { useState } from 'react';
import { Header } from './Header';
import { Box, Button, Slide, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CommonCard from '../common/Card';
import apartments from "../assets/apartments.svg";
import vehicles from "../assets/vehicles.svg";
import { makeStyles } from '@material-ui/core';

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
    }
});

export const MainLayout = () => {
    const classes = useStyles();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [openGate, setOpenGate] = useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSlide = () => {
        setOpenGate(true);
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
                <Slide
                    direction="left"
                    in={!openGate}
                    mountOnEnter
                    unmountOnExit
                    container={document.body}
                >
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIosIcon />}
                        sx={{ borderRadius: '30px' }}
                        onClick={handleSlide}
                    >
                        Slide
                    </Button>
                </Slide>
            </Box>
        </Box>
    );
}
