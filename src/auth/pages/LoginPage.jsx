import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useAuthService from '../../hooks/useAuthService';
import useUserService from '../../hooks/useUserService';
import { messageService } from '../../services/messageService';

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
}).required();

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const navigate = useNavigate();
  const { login } = useAuthService();
  const { getUser } = useUserService();
  const onSubmit = async (data) => {
    try {
      const user = await login(data.username, data.password);
      if (user.role === 'Admin') {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (error) {
      messageService.error(error.message);
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Usuario"
              type="text"
              placeholder='Bryan'
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

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder='Contraseña'
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

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button type="submit" variant='contained' fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>


      </form>

    </AuthLayout>
  )
}
