import { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { messageService } from '../../services/messageService';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
    const defaultValues = {
        id: ' ',
        isVaccinated: false,
        vaccineType: ' ',
        vaccineDate: ' ',
        doseNumber: 0,
    }
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(employeeSchema),
        defaultValues
    });
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [state, setState] = useState(false);


    const { getUser, editUser } = useUserService();

    const { getUser: loggedUser } = useAuthService();

    useEffect(() => {
        getUser(loggedUser().id)
            .then(user => {
                for (const key in user) {
                    setValue(key, user[key]);
                }
                user.vaccineDate && setDate(user.vaccineDate);
                setState(user.isVaccinated);
                user.vaccineType && setType(user.vaccineType);
            })
            .catch(err => {
                messageService.error(err);
            });
    }, []);



    const onSubmit = (data) => {
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

    const handleType = (event) => {
        setType(event.target.value);
        setValue('vaccineType', event.target.value);

    };

    return (
        <Card>
            <CardHeader title="Vacunación" />
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={<Switch
                                        checked={state}
                                        onChange={() => setState(!state)}
                                        inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="¿Está vacunado?"
                                    {...register("isVaccinated")}
                                    aria-invalid={errors.isVaccinated ? "true" : "false"} />
                                {errors.isVaccinated?.message &&
                                    <Typography>
                                        {errors.isVaccinated?.message}
                                    </Typography>
                                }
                            </Grid>
                            {state === true &&
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="type-label">Tipo de Vacuna</InputLabel>
                                        <Select
                                            labelId="type-label"
                                            id="type-select"
                                            value={type}
                                            label="Tipo de Vacuna"

                                            onChange={handleType}
                                            defaultValue={type}
                                        >
                                            {['', 'Sputnik', 'AstraZeneca', 'Pfizer', 'Jhonson&Jhonson'].map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            }
                        </Grid>
                        {state === true &&

                            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                                <Grid item xs={12} sm={6}>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Fecha"
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                                setValue('vaccineDate', newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
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
                        }
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
