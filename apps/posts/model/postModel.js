import mongoose from "mongoose";
import postSchema from "../schema/postSchema";

const Post = mongoose.model("post", postSchema);

export default Post;
