import { Grid, TextField, Toolbar } from '@mui/material';

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
import { messageService } from '../../services/messageService';


const SelectFilter = ({ config }) => {
  const { getUsers } = useUserService();

  const handleChange = (event) => {
    config.setValue(event.target.value);
    getUsers(event.target.value)
      .then((data) => {
        config.setUsers(data);
      })

  };

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth
        style={{
          margin: 10,
        }}>
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

  const [startedDate, setStartedDate] = useState(null);
  const [endedDate, setEndedDate] = useState(null);
  const [state, setState] = useState();
  const [type, setType] = useState();


  useEffect(() => {
    loadUsers();
  }, []);


  const editRow = (row) => {
    setOpen(true);
  };

  const deleteRow = (row) => {
    deleteUser(row.id)
      .then(user => {
        setUsers(users.filter(u => u.id !== user.id));
      })
      .catch(e => {
        messageService.error(e);
      });
  };

  const selectRow = (row) => {
    setSelectedRow(row);
  }

  const loadUsers = (search = '', startedDate = '', endedDate = '') => {
    setLoading(true);
    getUsers(search, startedDate, endedDate)
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
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
        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
          <EmployeeForm employee={selectedRow}
            open={open}
            setOpen={setOpen}
            setUsers={setUsers}
            users={users}
            setSelectedRow={setSelectedRow} />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha inicial Vacunaci??n"
              name="startedDate"
              value={startedDate}
              onChange={(newValue) => {
                setStartedDate(newValue)
                getUsers('', newValue, endedDate)
                  .then((data) => {
                    setUsers(data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha final Vacunaci??n"
              name="endedDate"
              value={endedDate}
              onChange={(newValue) => {
                setEndedDate(newValue)
                getUsers('', startedDate, newValue)
                  .then((data) => {
                    setUsers(data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <SelectFilter
            config={
              {
                data: ['Vacunado', 'No vacunado'],
                label: 'Estado de vacunaci??n',
                value: state,
                setValue: setState,
                users: users,
                setUsers: setUsers
              }} />
          <SelectFilter
            config={
              {
                data: ['', 'Sputnik', 'AstraZeneca', 'Pfizer', 'Jhonson&Jhonson'],
                label: 'Tipo Vacuna',
                value: type,
                setValue: setType,
                users: users,
                setUsers: setUsers
              }} />
        </Grid>
      </Box>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">C??dula</TableCell>
            <TableCell align="right">Nombres</TableCell>
            <TableCell align="right">Apellidos</TableCell>
            <TableCell align="right">Correo</TableCell>
            <TableCell align="right">Fecha de Vacunaci??n</TableCell>
            <TableCell align="right">Tipo de Vacuna</TableCell>
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
              <TableCell align="right">{row.cedula}</TableCell>
              <TableCell align="right">{row.names}</TableCell>
              <TableCell align="right">{row.lastnames}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.vaccineDate ? row.vaccineDate : 'No Aplica'}</TableCell>
              <TableCell align="right">{row.vaccineType ? row.vaccineType : 'No Aplica'}</TableCell>
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