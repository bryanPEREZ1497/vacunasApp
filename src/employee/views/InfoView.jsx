import { useEffect, useState } from 'react';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { messageService } from '../../services/messageService';
import useUserService from '../../hooks/useUserService';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useAuthService from '../../hooks/useAuthService';

const employeeSchema = yup.object().shape({
    id: yup.string(),
    cedula: yup.string().min(10).max(10),
    names: yup.string(),
    lastnames: yup.string(),
    email: yup.string().email(),
    birthdate: yup.date(),
    address: yup.string(),
    phone: yup.string(),
    password: yup.string(),
    username: yup.string().email(),
}).required();

export const InfoView = () => {
    const defaultValues = {
        id: ' ',
        cedula: ' ',
        names: ' ',
        lastnames: ' ',
        email: ' ',
        birthdate: ' ',
        address: ' ',
        phone: ' ',
        password: ' ',
        username: ' ',
    }
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(employeeSchema),
        defaultValues
    });
    const { getUser, editUser } = useUserService();
    const { getUser: loggedUser } = useAuthService();
    const [date, setDate] = useState('');

    useEffect(() => {
        getUser(loggedUser().id)
            .then(res => {
                console.log('res', res)
                console.log('res', res.bi)
                for (const key in res) {
                    setValue(key, res[key]);
                }
                res.birthdate && setDate(res.birthdate);
            })
            .catch(err => {
                messageService.error(err);
            });
    }, []);

    // useEffect(() => {
    //     console.log(date);
    //     setValue('birthdate', date);
    //     console.log()
    // }, [date]);

    const onSubmit = (user) => {
        console.log('mybirthdate', user.birthdate);
        editUser(user)
            .then(user => {
                console.log(user);
                messageService.success('Usuario actualizado');
                for (const key in user) {
                    setValue(key, user[key]);
                }
            })
            .catch(err => {
                messageService.error(err);
            });
    };

    return (
        <Card>
            <CardHeader title="Mi información" />
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
                            {/* <TextField
                                label="Fecha de Nacimiento"
                                type="date"
                                placeholder='Fecha de Nacimiento'
                                fullWidth
                                {...register("birthdate")}
                                aria-invalid={errors.birthdate ? "true" : "false"}
                            />
                            {errors.birthdate?.message &&
                                <Typography>
                                    {errors.birthdate?.message}
                                </Typography>
                            } */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha de Nacimiento"
                                    value={date}
                                    onChange={(newValue) => {
                                        setDate(newValue);
                                        setValue('birthdate', newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid >
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
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
                                    Campo requerido

                                </Typography>
                            }
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Dirección de Domicilio"
                                type="string"
                                // placeholder='San José'
                                fullWidth
                                {...register("address")}
                                aria-invalid={errors.address ? "true" : "false"}
                            />
                            {errors.address?.message &&
                                <Typography>
                                    {errors.address?.message}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Teléfono celular"
                                type="string"
                                placeholder='0999999999'
                                fullWidth
                                {...register("phone")}
                                aria-invalid={errors.phone ? "true" : "false"}
                            />
                            {errors.phone?.message &&
                                <Typography>
                                    {errors.phone?.message}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Correo"
                                type="string"
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Contraseña"
                                type="password"
                                placeholder='1724034184'
                                fullWidth
                                {...register("password")}
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            {errors.password?.message &&
                                <Typography>
                                    {errors.password?.message}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Usuario"
                                type="string"
                                placeholder='ban@gmail.com'
                                fullWidth
                                {...register("username")}
                                aria-invalid={errors.username ? "true" : "false"}
                            />
                            {errors.username?.message &&
                                <Typography>
                                    {errors.username?.message}
                                </Typography>
                            }
                        </Grid>

                    </Grid>



                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button
                            variant='contained' fullWidth
                            type="submit" >
                            Actualizar
                        </Button>
                    </Grid>
                </form >
            </CardContent>
        </Card>
    )
}


