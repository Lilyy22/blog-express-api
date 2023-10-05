const Post = require("../models/post");

const create = async ({ title, body, category, author_name }) => {
  try {
    const newPost = new Post({
      title: title,
      body: body,
      category: category,
      author_name: author_name,
    });

    await newPost.save();
    return newPost;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const allPosts = await Post.find({}).populate('category', 'name');
    return allPosts;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const allPosts = await Post.findById(id).exec();
    return allPosts;
  } catch (error) {
    throw error;
  }
};

const addComment = async (id, comment) => {
  try {
    const newComment = await Post.findByIdAndUpdate(
      id,
      { $push: { comment: comment } },
      { new: true }
    );
    return newComment;
  } catch (error) {
    throw error;
  }
};

const deleteComment = async (id, comment_id) => {
  try {
    const deletedComment = await Post.findByIdAndUpdate(
      id,
      { $pull: { comment: { _id: comment_id } } },
      { new: true }
    );
    return deletedComment;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  addComment,
  getAll,
  getById,
  deleteComment,
};
