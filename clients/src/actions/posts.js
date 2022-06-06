import *as api from "../api";

export const getposts = () =>async(dispatch)=>{
    try{
        const {data}=await api.fetchPosts();
        dispatch({type:'FETCH_ALL',payload:data});
    }  catch(err){
        console.log(err.message)
    }
}

export const createPost=(post)=> async (dispatch) =>{
    try{
        const {data}=await api.createPost(post);
        dispatch({type:'CREATE',payload: data});
    }   catch(err){
        console.log(err.message);
    }
}

export const updatedPost=(id,post)=>async(dispatch) =>{
           try{
                const {data}=await api.updatedPost(id,post);
                dispatch({type:'UPDATE', payload:data})
           } catch(err){
               console.log(err);
           }

}