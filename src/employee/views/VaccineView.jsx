import { useEffect, useState } from 'react';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { messageService } from '../../services/messageService';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import useUserService from '../../hooks/useUserService';
import useAuthService from '../../hooks/useAuthService';

const employeeSchema = yup.object().shape({
    id: yup.string(),
    isVaccinated: yup.boolean(),
    vaccineType: yup.string().required(),
    vaccineDate: yup.date().required(),
    doseNumber: yup.number().required(),
}).required();

export const VaccineView = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(employeeSchema),
    });
    const [type, setType] = useState('');


    const { getUser, editUser } = useUserService();
    const { getUser: user } = useAuthService();

    useEffect(() => {
        getUser(user().id)
            .then(user => {
                console.log(user);
                for (const key in user) {
                    setValue(key, user[key]);
                }
            })
            .catch(err => {
                messageService.error(err);
            });
    }, []);



    const onSubmit = (data) => {
        console.log(data);
        editUser(data)
            .then(res => {
                messageService.success('Información actualizada');
                for (const key in res) {
                    setValue(key, res[key]);
                }
            })
            .catch(error => {
                messageService.error(error);
            }
            );
    };

    const handleChange = (event) => {
        setType(event.target.value);
    };

    //if switch is on, show vaccine info
    // const showVaccineInfo = () => {
    //     if (type === 'true') {
    //         return (
    //             <Grid container spacing={2}>
    //                 <Grid item xs={12} sm={6}>
    //                     <FormControl fullWidth>
    //                         <InputLabel id="vaccineType">Tipo de vacuna</InputLabel>
    //                         <Select
    //                             labelId="vaccineType"
    //                             id="vaccineType"
    //                             value={type}
    //                             label="Tipo de vacuna"
    //                             {...register('vaccineType')}
    //                         >
    //                             <MenuItem value={'Pfizer'}>Pfizer</MenuItem>
    //                             <MenuItem value={'Moderna'}>Moderna</MenuItem>
    //                             <MenuItem value={'AstraZeneca'}>AstraZeneca</MenuItem>
    //                             <MenuItem value={'Sputnik V'}>Sputnik V</MenuItem>
    //                             <MenuItem value={'Sinopharm'}>Sinopharm</MenuItem>
    //                             <MenuItem value={'Sinovac'}>Sinovac</MenuItem>
    //                             <MenuItem value={'Janssen'}>Janssen</MenuItem>
    //                         </Select>
    //                     </FormControl>
    //                 </Grid>
    //             </Grid>
    //         )
    //     }
    // }

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <Card>
            <CardHeader title="Vacunación" />
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                                {/* <TextField
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
                                } */}
                                {/* <Switch {...label}
                                    {...register("state")}
                                    aria-invalid={errors.state ? "true" : "false"}
                                /> */}
                                {/* {errors.state?.message &&
                                    <Typography>
                                        {errors.state?.message}
                                    </Typography>
                                } */}
                                <FormControlLabel
                                    control={<Switch />}
                                    label="¿Está vacunado?"
                                    {...register("isVaccinated")}
                                    aria-invalid={errors.isVaccinated ? "true" : "false"} />
                                {errors.isVaccinated?.message &&
                                    <Typography>
                                        {errors.isVaccinated?.message}
                                    </Typography>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <TextField
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
                                } */}
                                <Box sx={{ minWidth: 120 }}>
                                    <TextField
                                        label="Tipo de Vacuna"
                                        select
                                        placeholder='Pfizer'
                                        fullWidth
                                        {...register("vaccineType")}
                                        aria-invalid={errors.vaccineType ? "true" : "false"}
                                    >
                                        {['Sputnik', 'AstraZeneca', 'Pfizer', 'Jhonson&Jhonson'].map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}

                                    </TextField >
                                    {errors.vaccineType?.message &&
                                        <Typography>
                                            {errors.vaccineType?.message}
                                        </Typography>
                                    }
                                    {/* <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Tipo de Vacuna</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={employeeSchema.vaccineType}
                                            label="Tipo de Vacuna"
                                            // onChange={handleChange}
                                            {...register("vaccineType")}
                                            aria-invalid={errors.vaccineType ? "true" : "false"}
                                        >
                                            {['Sputnik', 'AstraZeneca', 'Pfizer', 'Jhonson&Jhonson'].map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl> */}
                                </Box>
                                {errors.vaccineType?.message &&
                                    <Typography>
                                        {errors.vaccineType?.message}
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
                                    {...register("vaccineDate")}
                                    aria-invalid={errors.vaccineDate ? "true" : "false"}
                                />
                                {errors.vaccineDate?.message &&
                                    <Typography>
                                        {errors.vaccineDate?.message}
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
