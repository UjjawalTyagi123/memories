import { combineReducers } from "redux";
import posts from "./posts"
import auth from "./auth";

export  const reducers= combineReducers({posts,auth})  //here we considering the key and values both the same (posts:posts) so we write just ({posts})