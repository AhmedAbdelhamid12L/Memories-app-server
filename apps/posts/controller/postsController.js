import Post from "../model/postModel";
import { StatusCodes } from "http-status-codes";

export const getPosts = async (req, res) => {
  try {
    const data = await Post.find();
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error", error });
  }
};

export const createPost = async (req, res) => {
  // const { title, message, creator, tags, selectedFile } = req.body;
  const post = req.body;
  try {
    const newPost = new Post({ ...post, creator: req.userId });
    const data = await newPost.save();
    res.status(StatusCodes.CREATED).json(data);
  } catch (error) {
    // console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error", error });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    const data = await Post.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    if (data) {
      res.status(StatusCodes.OK).json(data);
    } else {
      res.json({ message: "Id not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error", error });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Post.findByIdAndRemove(id);

    if (data) {
      res.status(StatusCodes.OK).json({ message: "post deleted successfully" });
    } else {
      res.json({ message: "Id not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error", error });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "UNAUTHENTICATED" });
    const post = await Post.findById(id);
    const index = post.likes.findIndex((id) => id == String(req.userId));
    if (index == -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    if (post) {
      res.status(StatusCodes.OK).json(updatedPost);
    } else {
      res.json({ message: "Id not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error", error });
  }
};
