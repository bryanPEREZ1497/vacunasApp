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

const employeeSchema = yup.object().shape({
    id: yup.string().required(),
    cedula: yup.string().min(10).max(10).required(),
    names: yup.string().required(),
    lastnames: yup.string().required(),
    email: yup.string().email().required(),
    birthdate: yup.date(),
    address: yup.string().required(),
    phone: yup.string().required(),
    password: yup.string().required(),
    username: yup.string().email().required(),
}).required();

export const InfoView = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(employeeSchema),
    });
    const { editUser } = useUserService();

    const onSubmit = (user) => {
        console.log('first', user)
        // editUser(user)
        //     .then((response) => {
        //         console.log(response);
        //         messageService.success('Información actualizada con éxito')

        //     }).catch((error) => {
        //         console.log(error);
        //     });

    };
    return (
        <Card style={{

        }}>
            <CardHeader title="Mi información" />
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
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
                                <TextField
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
                                }
                                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Fecha de Nacimiento"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        {...register("birthdate")}
                                        aria-invalid={errors.birthdate ? "true" : "false"}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                {errors.birthdate?.message &&
                                    <Typography>
                                        {errors.birthdate?.message}
                                    </Typography>
                                } */}
                            </Grid>
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
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}
