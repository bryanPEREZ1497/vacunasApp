import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export const NavBar = ({ drawerWidth = 0 }) => {
    const navigate = useNavigate();

    const onLogout = () => {
        console.log('logout');
        navigate("/auth/login");
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

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
