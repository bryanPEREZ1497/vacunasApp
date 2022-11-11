import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export const NavBar = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        console.log('logout');
        navigate("/auth/login");
    }

    return (
        <AppBar
            position='fixed'
            
        >
            <Toolbar>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> Vacunas App </Typography>
                    <IconButton color='error'
                        onClick={onLogout}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
