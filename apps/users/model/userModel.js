import mongoose from "mongoose";
import userSchema from "../schema/userSchema";


const User = mongoose.model("user", userSchema);

export default User;
