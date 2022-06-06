import mongoose from "mongoose";                           
import PostMessage from "../models/postmessages.js";          
import postMessage from "../models/postmessages.js";    
                                                           
export const  getposts=async (req,res)=>{
   try{
      const postMessages=await postMessage.find();
       res.status(200).json(postMessages)
   } catch(err){
        res.status(404).json({message: err.message})
   }
};

export const createPost=async (req,res)=>{
    const post=req.body;
    const newPost=new postMessage(post);
    try{
        await newPost.save();
    res.status(201).json(newPost);
    } catch(err){
   res.status(409).json({message:err.message})
    }
}

// export const updatePost= async (req,res)=>{
//     const {id:_id}=req.params;

//     if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

//     const updatedPost =await PostMessage.findByIdAndUpdate(_id,post,{new:true})
//      res.json(updatePost)
// }

// export const updatePost = async (req, res) => {
//     const { id } = req.params;
//     const post = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id`);

//     // const updatedPost = { creator, title, message, tags, selectedFile, _id:id };

//     const updatedPost=await PostMessage.findByIdAndUpdate(id, {...post,id}, { new: true });

//     res.json(updatedPost);
// }


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;  
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(updatePost,id ,{ new: true });

    res.json(updatedPost);
}