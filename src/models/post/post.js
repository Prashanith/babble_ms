import mongoose from "mongoose";
import { comment } from "./comment";

const PostEntity = mongoose.Schema({
  description: {
    type: String,
    required: false,
  },
  love: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  comments: [comment],
});

const post = mongoose.model("post", PostEntity);

export { post };
