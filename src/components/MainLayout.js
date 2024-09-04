import React, { useCallback, useEffect, useState } from 'react';
import { Header } from './Header';
import { Box, Button, Typography } from '@mui/material';
import CommonCard from '../common/Card';
import apartments from "../assets/apartments.svg";
import { makeStyles } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { LocationLayout } from './LocationLayout';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/actions';
import utils from '../utils';
const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : process.env.REACT_APP_DEV_BACKEND_URL;
const useStyles = makeStyles({
    welcomeText: {
        color: "#252B5C !important",
        fontSize: "25px  !important",
        marginBottom: "10px !important"
    },
    openText: {
        color: "#252B5C  !important",
        fontSize: "25px !important",
        marginBottom: "10px  !important"
    },
    slideMessage: {
        color: "#252B5C !important",
        fontSize: "20px !important",
        marginBottom: "10px !important"
    },
    user: {
        color: "#234F68 !important",
        fontSize: "20px !important",
        marginBottom: "10px !important"
    },
    slideTrack: {
        position: 'relative !important',
        width: '100% !important',
        height: '50px !important',
        borderRadius: '25px !important',
        backgroundColor: '#F5F4F8 !important',
        margin: '20px 0 !important'
    },
});

export const MainLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [slideRight, setSlideRight] = useState(false);
    const [vehicles, setVehicles] = useState(null);
    const [user, setUser] = useState(null);
    const [chooseLocation, setChooseLocation] = useState(false);
    const [isLocationCardVisible, setIsLocationCardVisible] = useState(false);
    const isLocationCard = useSelector(state => state.location.showLocationCards);
    const path = window.location.pathname.split('/').pop();
    const isNotification = path === 'notifications';
    const auth = utils.auth;
    const gitHubUser = auth?.currentUser;

    const getUserDetails = useCallback(async () => {
        const id = localStorage.getItem("id");
        try {
            const response = await axios.post(
                `${url}/auth/users/${id}`,
                {},
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.data.success) {
                const userData = response.data.data[0];
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                navigate("/Main");
            } else {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "User Loading Failed",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "User Loading Failed",
            });
        }
    }, [navigate]);

    const getVehicles = useCallback(async () => {
        const id = localStorage.getItem("id");
        try {
            const response = await axios.post(
                `${url}/vehicles/list/${id}`,
                {},
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.data.success) {
                const vehiclesData = response.data.data[0];
                localStorage.setItem('vehicles', JSON.stringify(vehiclesData));
                setVehicles(vehiclesData);
                navigate("/Main");
            } else {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Failed to fetch vehicles",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Failed to fetch vehicles",
            });
        }
    }, [navigate]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedVehicles = localStorage.getItem('vehicles');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user data:", error);
            }
        } else {
            getUserDetails();
        }
        if (storedVehicles) {
            try {
                const jsonVehicles = storedVehicles.length > 0 ? JSON.stringify(storedVehicles) : [];
                setVehicles(JSON.parse(jsonVehicles));
            } catch (error) {
                console.error("Error parsing stored vehicles data:", error);
            }
        } else {
            getVehicles();
        }
        setIsLocationCardVisible(isLocationCard && chooseLocation && slideRight);
    }, [getUserDetails, getVehicles, isLocationCard, chooseLocation, slideRight]); //chooseLocation, slideRight remove if failing


    const handleSlide = () => {
        setSlideRight(true);
        setChooseLocation(true);
        dispatch({ type: actions.ADD_LOCATION_CARDS, payload: true });
    };

    const handleSweetAlertConfirm = () => {
        setSlideRight(false);
        setChooseLocation(false);
        setIsLocationCardVisible(false);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const apartmentDetails = {
        image_url: apartments,
        name: 'Sky Dandelions Apartments',
        title: 'Sky Dandelions Apartments',
        description: ['Kahawa, Nairobi']
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

    const loadLocationCards = () => {
        if (isLocationCardVisible) {
            return (
                <LocationLayout onConfirm={handleSweetAlertConfirm} />
            );
        }
        return null;
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            {!isNotification &&
                <Header
                    onOpenUserMenu={handleOpenUserMenu}
                    anchorElUser={anchorElUser}
                    onCloseUserMenu={handleCloseUserMenu}
                />
            }
            <Box sx={{ p: 2 }}>
                <Typography className={classes.welcomeText}>
                    {` Hey,`} <span className={classes.user}>{`${user?.name || gitHubUser.displayName}`}</span>
                </Typography>
                <Typography className={classes.openText}>
                    {` Request Gate to be opened`}
                </Typography>
                <CommonCard details={apartmentDetails} />
                <CommonCard details={vehicles} />

                <Typography className={classes.slideMessage}>
                    {` Please slide button to the right to request the gate to be opened.`}
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
                        {`Slide`}
                    </SliderButton>
                </div>
                {loadLocationCards()}
            </Box>
        </Box>
    );
}
