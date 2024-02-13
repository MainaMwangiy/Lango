import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const CommonCard = ({ details }) => {
    return (
        <Card sx={{ display: 'flex', mb: 3, borderRadius: "25px", background: "#F5F4F8", height: 200 }}>
            <CardMedia
                component="img"
                sx={{ width: 160, m: 1, borderRadius: "25px" }}
                image={details.image}
                alt={details.alt}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {details.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {details.description}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CommonCard;
