import React ,{useState,useEffect} from "react";
import {Container,AppBar,Typography,Grow,Grid} from "@material-ui/core"
import { useDispatch } from "react-redux";
import memories from "./images/memories.png"
import Form from "./components/form/form";
import Posts from "./components/posts/posts";
import useStyles from "./styles"
import {getposts} from "./actions/posts"
export default function App(){
    const [currentId,setCurrentId]=useState(null);
    const classes=useStyles();
    const dispatch=useDispatch();
   
    useEffect(() => {
      dispatch(getposts());
    }, [currentId,dispatch]);

    return(
        <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
          <img className={classes.image} src={memories} alt="icon" height="60" />
        </AppBar>
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts  setCurrentId={setCurrentId}/>
              </Grid>
              <Grid item xs={12} sm={4}>

                <Form  currentId={currentId} setCurrentId={setCurrentId}/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    )
}