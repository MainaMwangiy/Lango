import React, { useEffect, useState } from 'react';
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
const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : process.env.REACT_APP_DEV_BACKEND_URL
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
    const classes = useStyles();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [slideRight, setSlideRight] = useState(false);
    const [vehicles, setVehicles] = useState();
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const handleSlide = () => {
        setSlideRight(true);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        const getVehicles = async () => {
            const id = localStorage.getItem("id");
            try {
                const response = await axios.post(
                    `${url}/vehicles/list/${id}`,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                setVehicles(response?.data?.data[0])
                if (response.data.success) {
                    navigate("/Main");
                } else {
                    Swal.fire({
                        title: "Error",
                        icon: "error",
                        text: "Login Failed",
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Login Failed",
                });
            }
        }
        const getUser = async () => {
            const id = localStorage.getItem("id");
            try {
                const response = await axios.post(
                    `${url}/auth/users/${id}`,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                setUser(response?.data?.data[0])
                if (response.data.success) {
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
        }
        getUser();
        getVehicles();
    }, [navigate])


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
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header
                onOpenUserMenu={handleOpenUserMenu}
                anchorElUser={anchorElUser}
                onCloseUserMenu={handleCloseUserMenu}
            />
            <Box sx={{ p: 2 }}>
                <Typography className={classes.welcomeText}>
                    {` Hey,`} <span className={classes.user}>{`${user?.name}`}</span>
                </Typography>
                <Typography className={classes.openText}>
                    {` Request Gate to be opened`}
                </Typography>
                <CommonCard details={apartmentDetails} />
                <CommonCard details={vehicles} />

                <Typography className={classes.slideMessage}>
                    {`  Please slide button to the right to request the gate to be opened.`}
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
                {slideRight && <LocationLayout />}
            </Box >
        </Box >
    );
}
