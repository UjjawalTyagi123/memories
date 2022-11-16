import { Avatar, Button, Container, Paper, Typography,Grid, TextField} from '@material-ui/core';
import React,{useState,useEffect} from 'react'
import useStyles from "./styles"
// import  LockOutLinedIcon from "@material-ui/icons/LockOutLinedIcon"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {GoogleLogin} from "react-google-login"
import Input from "./Input"
import Icon from './Icon.js';
import { gapi } from "gapi-script"
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { useNavigate} from 'react-router-dom'
import {signup,signin} from '../../actions/auth'

const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
  
    const classes=useStyles();
    const navigate=useNavigate();
    const [showPassword,setShowPassword]=useState(false);

   const [isSignup,setIsSignup]=useState(false);
  
    const [formData,setFromData]=useState(initialState);

     const handleShowPassword=()=> setShowPassword((prevShowPassword)=> !prevShowPassword)
    
    const handleSubmit=(e)=>{
      e.preventDefault();

   console.log(formData);
    if(isSignup){
      dispatch(signup(formData,navigate));
    }else{
      dispatch(signin(formData,navigate));
    }
    }
    // const state=null;
     const handleChange=(e)=>{
        setFromData({...formData,[e.target.name]:e.target.value})
     }

     const switchMode=()=>{
      setIsSignup((previsSignup)=>!previsSignup);
   setShowPassword(false);
     }

     useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: '534772898097-omdnro7ecoijqods17hjl9q28q0hd8mr.apps.googleusercontent.com'
          ,
          scope: 'email',
        });
      }
  
      gapi.load('client:auth2', start);
    }, []);

   

     const googleFailure=(error)=>{
          console.log("Google Sign in was unsucessfull.Try again later");
          console.log(error);
        
     }
     
     const dispatch=useDispatch();
     const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;
  
      try {
        dispatch({ type: AUTH, data: { result, token } });
      navigate('/')
        
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Container component="main" maxWidth="xs">
        <Paper  className={classes.paper} elevation={3}>
           <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
           </Avatar>
           <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
           <form className={classes.form} onSubmit={handleSubmit}>
             <Grid  container spacing={2}> 
               {
                   isSignup && (
                    <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                  </>
                   )
               }
               <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                <Input name="password" label="password" handleChange={handleChange} type={showPassword? "text" :"password"} handleShowPassword={handleShowPassword}/>
                {isSignup && <Input name='confirmPassword' label='Repeat password' handleChange={handleChange} type="password"/>}
              </Grid>
    
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
               { isSignup ? 'Sign Up' : 'Sign In' }
              </Button>
          <GoogleLogin
            clientId='534772898097-omdnro7ecoijqods17hjl9q28q0hd8mr.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
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
                      {isSignup ? 'Already have an account? Sign In' :"Don't have an account? Sign Up"}
                    </Button>
                </Grid>
              </Grid>
           </form>
        </Paper>

    </Container>
  )
}

export default Auth