const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      trim: true,
      required: true,
      maxlength: 3000,
    },

    image: {
      type: String, 
      default: null,
    },

    isPrivate: {
      type: Boolean,
      default: false,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ]
},
{
    timestamps: true
}
)

// indexes
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ isPrivate: 1, createdAt: -1 });


// Post Model
const Post = mongoose.model('Post', postSchema);
module.exports = Post;