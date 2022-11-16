import React,{useState,useEffect} from 'react'
import {Container,Grow,Grid, Paper,AppBar,TextField,Button} from "@material-ui/core"
import { useNavigate,useLocation } from 'react-router-dom'
import Posts from '../posts/posts'
import Form from '../form/form'
import { useDispatch } from "react-redux";
// import {getPosts} from "../../actions/posts"
import Pagination from '../Pagination';
import ChipInput from 'material-ui-chip-input'
import useStyles from "./style"
import {getPosts,getPostBySearch} from "../../actions/posts"

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId,setCurrentId]=useState(null);
    // const classes=useStyles();
    const dispatch=useDispatch();
    const classes=useStyles();
    const navigate=useNavigate();
    const query=useQuery();
    const page=query.get('page') || 1;
    const searchQuery=query.get('searchQuery');
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);

    useEffect(() => {
      dispatch(getPosts(page));
     
    }, [page,dispatch]);
           
   const handleKeyPress=(e)=>{
           if(e.keyCode===13){
            //serch post
            searchPost();
           }
   }

   const handleAdd=(tag)=>setTags([...tags,tag]);

   const handleDelete=(tagToDelete)=>setTags(tags.filter((tag)=> tag !== tagToDelete))
   
   const searchPost=()=>{
    if(search.trim() || tags){
      // dispatch -> fetch search
      dispatch(getPostBySearch({search,tags:tags.join(',')}))
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);

    }else{
      navigate('/');
    }
   }

  return (
    <Grow in>
          <Container maxWidth="xl">    
            <Grid  container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6} md={9}>
                <Posts  setCurrentId={setCurrentId}/>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
               <TextField name="search"
                variant='outlined' 
                label="Search-Memories"
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e)=>setSearch(e.target.value)}
                />
                <ChipInput
                  style={{margin:"10px 0"}}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search tags"
                  variant='outlined'
                />
              <Button onClick={searchPost} clsassName={classes.searchButton} variant="contained" color="primary">Search</Button>
              </AppBar>
                <Form  currentId={currentId} setCurrentId={setCurrentId}/>
                {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
              </Grid>
            </Grid>
          </Container>
        </Grow>
  )
}

export default Home