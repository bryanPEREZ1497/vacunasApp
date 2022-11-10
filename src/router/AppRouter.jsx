import { Route, Routes } from 'react-router-dom';
import { AdminRoutes } from '../admin/routes/AdminRoutes';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { EmployeeRoutes } from '../employee/routes/EmployeeRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';


export const AppRouter = () => {
  return (
    <Routes>

        {/* Login y Registro */}
        <Route path="/auth/*" element={ <AuthRoutes /> } />

        {/* JournalApp */}
        <Route path="/journal/*" element={ <JournalRoutes /> } />
        
        {/* Admin */}
        <Route path="/admin/*" element={ <AdminRoutes /> } />
        
        {/* Employee */}
        <Route path="/employee/*" element={ <EmployeeRoutes /> } />
        
        <Route path="/*" element={ <AdminRoutes /> } />



    </Routes>
  )
}
