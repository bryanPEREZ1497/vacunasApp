import { Grid, TextField, Typography } from '@mui/material';
import { StarOutline } from '@mui/icons-material';

import employees from '../../mock/employees.json';
import { EmployeeForm } from '../components';
import useUserService from '../../hooks/useUserService';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const SelectFilter = ({ config }) => {
  // const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    config.setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{config.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={config.value}
          label={config.label}
          onChange={handleChange}
        >
          {config.data.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export const EmployeeListView = () => {
  const { getUsers, deleteUser } = useUserService();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState();
  const [state, setState] = useState();
  const [type, setType] = useState();


  useEffect(() => {
    setLoading(true);
    getUsers(type, state, date)
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [type, state, date]);


  const editRow = (row) => {
    setOpen(true);
  };

  const deleteRow = (row) => {
    console.log('delete', row);
    deleteUser(row.id)
      .then(user => {
        console.log(user);
        setUsers(users.filter(u => u.id !== row.id));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const selectRow = (row) => {
    setSelectedRow(row);
  }

  if (loading) return <div>Cargando...</div>;

  return (
    <TableContainer
      component={Paper}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: 1
        }}>

        <EmployeeForm employee={selectedRow}
          open={open}
          setOpen={setOpen}
          setUsers={setUsers}
          users={users}
          setSelectedRow={setSelectedRow} />

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Basic example"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider> */}

        <SelectFilter config={{ data: ['Vacunado', 'No vacunado'], label: 'Estado de vacunación', value: state, setValue: setState }} />
        <SelectFilter config={{ data: ['Sputnik', 'AstraZeneca', 'Pfizer', 'Jhonson&Jhonson'], label: 'Tipo Vacuna', value: type, setValue: setType }} />
      </Box>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Cédula</TableCell>
            <TableCell align="right">Nombres</TableCell>
            <TableCell align="right">Apellidos</TableCell>
            <TableCell align="right">Correo</TableCell>
            <TableCell align="right">Está vacunado?</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => selectRow(row)}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.cedula}</TableCell>
              <TableCell align="right">{row.names}</TableCell>
              <TableCell align="right">{row.lastnames}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.isVaccinated ? 'Si' : 'No'}</TableCell>
              <TableCell align="right">
                <EditIcon onClick={() => editRow(row)} />
                <DeleteIcon onClick={() => deleteRow(row)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// return (
  //   <Grid
  //     container
  //     spacing={0}
  //     direction="column"
  //     alignItems="center"
  //     justifyContent="center"
  //     sx={{ minHeight: 'calc(100vh - 210px)', backgroundColor: 'primary.admin', borderRadius: 3 }}
  //   >
  //     <Typography>Employee List</Typography>

  //     <div style={{ height: 400, width: '100%' }}>
  //       <DataGrid
  //         rows={users}
  //         columns={columns}
  //         pageSize={5}
  //         rowsPerPageOptions={[5]}
  //         checkboxSelection
  //         components={{
  //           Toolbar: CustomToolbar,
  //         }}

  //       />
  //     </div>
  //   </Grid>
  // )