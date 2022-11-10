import { SaveOutlined } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { messageService } from '../../services/messageService';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const employeeSchema = yup.object().shape({
    id: yup.string().required(),
    state: yup.string().required(),
    type: yup.string().required(),
    date: yup.date().required(),
    doseNumber: yup.number().required(),
}).required();

export const VaccineView = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(employeeSchema),
    });
    
    const onSubmit = (data) => {
        alert('hola')
    };

    return (
        <Card>
            <CardHeader title="Vacunación" />
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Estado de Vacunación"
                                    type="string"
                                    placeholder='1724034184'
                                    fullWidth
                                    {...register("state")}
                                    aria-invalid={errors.state ? "true" : "false"}
                                />
                                {errors.state?.message &&
                                    <Typography>
                                        {errors.state?.message}
                                    </Typography>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Tipo de Vacuna"
                                    type="string"
                                    placeholder='1724034184'
                                    fullWidth
                                    {...register("type")}
                                    aria-invalid={errors.type ? "true" : "false"}
                                />
                                {errors.type?.message &&
                                    <Typography>
                                        {errors.type?.message}
                                    </Typography>
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Fecha"
                                    type="date"
                                    placeholder='1724034184'
                                    fullWidth
                                    {...register("date")}
                                    aria-invalid={errors.date ? "true" : "false"}
                                />
                                {errors.date?.message &&
                                    <Typography>
                                        {errors.date?.message}
                                    </Typography>
                                }
                                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Fecha de Nacimiento"
                                        // value={value}
                                        // onChange={(newValue) => {
                                        //     setValue(newValue);
                                        // }}
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Número de Dosis"
                                    type="number"
                                    placeholder='1724034184'
                                    fullWidth
                                    {...register("doseNumber")}
                                    aria-invalid={errors.doseNumber ? "true" : "false"}
                                />
                                {errors.doseNumber?.message &&
                                    <Typography>
                                        {errors.doseNumber?.message}
                                    </Typography>
                                }
                            </Grid>
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
    )
}
