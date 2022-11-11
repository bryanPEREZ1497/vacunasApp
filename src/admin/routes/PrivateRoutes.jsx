import { Outlet, Navigate } from 'react-router-dom'
import useAuthService from '../../hooks/useAuthService';

export const PrivateRoutes = () => {
    const { getUser } = useAuthService();
    const role = getUser().role;
    if (role === 'Admin') {
        return (
            <Outlet />
        )
    } else {
        return (
            <Navigate to="/auth/login" />
        )
    }

}
