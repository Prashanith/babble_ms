import mongoose from "mongoose";

const CommentEntity = mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  comments: [comment],
});

const comment = mongoose.model("comment", CommentEntity);

export { comment };
