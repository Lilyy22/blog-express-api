const Joi = require("joi");
const {
  create,
  addComment,
  getAll,
  getById,
  deleteComment,
} = require("../services/postService");

const postValidator = Joi.object({
  title: Joi.string().min(3).max(40).required(),
  body: Joi.string().min(3).max(40).required(),
  category: Joi.array().unique().required(),
});

const commentValidator = Joi.object({
  body: Joi.string().required(),
});

const createPost = async (req, res) => {
  const { error } = postValidator.validate(req.body);
  if (!error) {
    try {
      const newPost = await create(req.body);
      res.send(newPost);
    } catch (error) {
      res.status(400).send({ error: error });
    }
  } else {
    res.status(400).send({
      error: "validation failed",
      input: error.details,
    });
  }
};

const addCommentToPost = async (req, res) => {
  if (!req.body.comment) {
    res.status(400).send({
      error: "validation failed",
      input: "comment object is required.",
    });
  } else {
    const { error } = commentValidator.validate(req.body.comment);
    if (!error) {
      try {
        const comment = { body: req.body.comment.body, date: new Date() };
        const newPost = await addComment(req.params.id, comment);
        res.send(newPost);
      } catch (error) {
        res.status(400).send({ error: error });
      }
    } else {
      res.status(400).send({
        error: "validation failed",
        input: error.details,
      });
    }
  }
};

const deleteCommentToPost = async (req, res) => {
  try {
    const deleteCom = await deleteComment(
      req.params.postid,
      req.params.commentid
    );
    res.send(deleteCom);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPost = await getAll();
    res.send(allPost);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const getPostById = async (req, res) => {
  try {
    const allPost = await getById(req.params.id);
    res.send(allPost);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = {
  createPost,
  addCommentToPost,
  getAllPosts,
  deleteCommentToPost,
  getPostById,
};
