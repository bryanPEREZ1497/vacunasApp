import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { EmployeeLayout } from '../layout/EmployeeLayout';
import { InfoView, VaccineView } from '../views';

export const EmployeePage = () => {
  return (
    <EmployeeLayout>
      
      <InfoView />
      <br />
      {/* <VaccineView /> */}
      
    </EmployeeLayout>
  )
}
