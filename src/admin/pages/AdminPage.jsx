import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { AdminLayout } from '../layout/AdminLayout';
import { EmployeeListView } from '../views';
import { EmployeeForm } from '../components';

export const AdminPage = () => {
  return (
    <AdminLayout>
      <EmployeeListView />
    </AdminLayout>
  )
}
