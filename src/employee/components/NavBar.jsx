import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuthService from '../../hooks/useAuthService';


export const NavBar = () => {
    const navigate = useNavigate();
    const { logout } = useAuthService();

    const onLogout = () => {
        console.log('logout');
        navigate("/auth/login");
        logout();
    }

    return (
        <AppBar
            position='fixed'
        >
            <Toolbar>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> Vacunas </Typography>

                    <IconButton color='error'
                        onClick={onLogout}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
