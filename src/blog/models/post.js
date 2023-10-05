const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
    },
    post_img: {
      type: String,
      required: [true, "Post image is required"],
    },
    body: {
      type: String,
      required: [true, "Post should have a body"],
    },
    category: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
      ],
      required: [true, "Category is required"],
    },
    author_name: {
      type: String,
      required: [true, "Author name is required"],
    },
    author_img: {
      type: String,
      required: [true, "Author img is required"],
    },
    comment: [
      {
        body: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
