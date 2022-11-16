import {React,useState,useEffect} from 'react'
import { Link,useNavigate ,useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from "jwt-decode"
import { AppBar,Avatar,Button,Typography,Toolbar } from '@material-ui/core'
import useStyles from "./styles.js"
import memoriesLogo from '../../images/MemoriesLogo.png';
import memoriesText from '../../images/MemoriesText.png';

const Navbar = () => {
    const classes=useStyles();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);

    useEffect(()=>{
      const token=user?.token;
      if(token){
        const decodedtoken=decode(token);
        if(decodedtoken.exp*1000<new Date().getTime()) logout();
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);
    
    const logout=()=>{
              dispatch({type:'LOGOUT'});
              navigate('/');
              setUser(null);

    }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Link to="/" className={classes.brandContainer}>
          <img src={memoriesText} alt="icon" height="45px"/>
           <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
           </Link>
        </div>
         
        <Toolbar className={classes.Toolbar}>
         {user ? (
             <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
         <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
               <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
             </div>
         ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
         )}

        </Toolbar>


  </AppBar>
  )
}

export default Navbar
