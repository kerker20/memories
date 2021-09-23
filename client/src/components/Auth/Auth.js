import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './Icon';

import Input from '../../components/Auth/Input';
import { signin, signup } from  '../../actions/auth';
import useStyles from './styles';

const Auth = () => {
    const initialState = useState({ firstname: '', lastname: '', email: '', password: '' , confirmPassword: '' });
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState(initialState); 


    const handleSubmit = (e) => {
        e.preventDefault();

        if(!isSignup){
            dispatch(signin(formData, history))
        }else{
            dispatch(signup(formData, history))
        }
        console.log(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = (res) => {
       const result = res?.profileObj;
       const token = res?.tokenId;

       try {
           dispatch({ type: 'AUTH', data: { result, token }})
           history.push('/')
       } catch (error) {
           console.log(error);
       }
    }
    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful. Try agin later.');
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    return (
       <Container component="main" maxWidth="xs">
           <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{ isSignup ? "Sign Up" : "Sign In" }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastname" label="Last Name" handleChange={handleChange}  half />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"></Input>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}></Input>
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin
                    clientId="915234081013-94gphnqm07vak5p0ue5r4l90vclv4cgg.apps.googleusercontent.com"
                    render={( renderProps ) => (
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justify="flex-end">
                    <Grid item>
                         <Button onClick={switchMode}>
                             {isSignup ? 'Already have an account? Sign In': "Don't have an account? Sign Up"}
                         </Button>
                    </Grid>
                </Grid>
            </form>
           </Paper>
       </Container>
    )
}

export default Auth
