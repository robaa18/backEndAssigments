import { Model, DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";
import { default as Post } from "./postModel.js";
import { User } from "./userModel.js";
class Comment extends Model {}
Comment.init(
  // postId (ForeignKeytoPosts)
  // userId(ForeignKeytoUsers)
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "c_id",
    },
    content: {
      type: DataTypes.STRING,
      field: "c_content",
    },
  },
  {
    sequelize,
    modelName: "Comment",
    timestamps: true,
  },
);
Comment.belongsTo(Post, {
  foreignKey: {
    name: "postId",
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Post.hasMany(Comment, {
  foreignKey: {
    name: "postId",
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Comment.belongsTo(User, {
  foreignKey: {
    name: "userId",
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Comment, {
  foreignKey: {
    name: "userId",
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
export default Comment;
