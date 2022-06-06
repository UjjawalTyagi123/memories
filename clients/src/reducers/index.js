import { combineReducers } from "redux";
import posts from "./posts"

export  const reducers= combineReducers({posts})  //here we considering the key and values both the same (posts:posts) so we write just ({posts})