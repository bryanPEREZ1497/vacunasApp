import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Button, CardHeader, Grid, Link, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { setLocale } from 'yup';
import useUserService from '../../hooks/useUserService';
import { messageService } from '../../services/messageService';

setLocale({
    string: {
        email: 'Debe ser un email válido',
        matches: 'Solo se permiten letras',
        required: 'Este campo es requerido',
    },
    number: {
        min: 'Debe ser mayor a ${min}',
        max: 'Debe ser menor a ${max}',
    },
});

const namesRegex = /^[a-zA-Z\s]*$/;
const numbersRegex = /^[0-9]*$/;

const employeeSchema = yup.object().shape({
    id: yup.string(),
    cedula: yup.string().min(10).max(10)
        .matches(numbersRegex, 'Solo se permiten números')
        .required(),
    names: yup.string().matches(namesRegex).required(),
    lastnames: yup.string().matches(namesRegex).required(),
    email: yup.string().email().required(),
}).required();

export const EmployeeForm = ({ open, setOpen, employee = null, setUsers, users, setSelectedRow }) => {
    const defaultValues = {
        id: employee?.id,
        cedula: employee?.cedula,
        names: employee?.names,
        lastnames: employee?.lastnames,
        email: employee?.email,
    }
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(employeeSchema),
    });

    const { storeUser, editUser } = useUserService();

    useEffect(() => {
        console.log(typeof employee);
        if (employee) {
            for (const key in defaultValues) {
                setValue(key, defaultValues[key]);
            }
        }

    }, [employee]);

    const onSubmit = (data) => {
        if (employee?.id) {

            editUser(data)
                .then(user => {
                    setUsers(users.map(u => u.id === user.id ? user : u));
                    handleClose();
                    messageService.success('Usuario actualizado con éxito')
                })
                .catch(e => {
                    console.log(e);
                });
        } else {

            const repeatedCedula = users.find(user => user.cedula === data.cedula);
            if (repeatedCedula) {
                messageService.error('Ya existe un usuario con esa cédula');
                return;
            }

            data.username = data.email;
            data.password = data.cedula;
            data.isVaccinated = false;
            data.role = 'Employee';

            storeUser(data)
                .then((response) => {
                    messageService.success('Usuario creado con éxito')
                    handleClose();
                    setUsers([...users, response]);
                }).catch((error) => {
                    console.log(error);
                });
        }
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedRow(null);
        reset();
    }

    return (
        <>
            <Button onClick={handleOpen}>Nuevo Empleado</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,

                }}>
                    <CardHeader title="Nuevo Empleado" />
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container>
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <TextField
                                        label="Cédula"
                                        type="string"
                                        placeholder='1724034184'
                                        fullWidth
                                        {...register("cedula")}
                                        aria-invalid={errors.cedula ? "true" : "false"}
                                    />
                                    {errors.cedula?.message &&
                                        <Typography>
                                            {errors.cedula?.message}
                                        </Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <TextField
                                        label="Nombres"
                                        type="text"
                                        placeholder='Juan'
                                        fullWidth
                                        {...register("names")}
                                        aria-invalid={errors.names ? "true" : "false"}

                                    />
                                    {errors.names?.message &&
                                        <Typography>
                                            {errors.names?.message}

                                        </Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <TextField
                                        label="Apellidos"
                                        type="text"
                                        placeholder='Pérez'
                                        fullWidth
                                        {...register("lastnames")}
                                        aria-invalid={errors.lastnames ? "true" : "false"}
                                    />
                                    {errors.lastnames?.message &&
                                        <Typography>
                                            {errors.lastnames?.message}

                                        </Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <TextField
                                        label="Correo"
                                        type="email"
                                        placeholder='juan@mail.com'
                                        fullWidth
                                        {...register("email")}
                                        aria-invalid={errors.email ? "true" : "false"}
                                    />
                                    {errors.email?.message &&
                                        <Typography>
                                            {errors.email?.message}
                                        </Typography>
                                    }
                                </Grid>


                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Button
                                        variant='contained' fullWidth
                                        type="submit" >
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Modal>
        </>
    );
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
