import { Model, DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";
import { User } from "./userModel.js";
class Post extends Model {}
Post.init(
  // userId(ForeignKeytoUsers)
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "p_id",
    },
    title: {
      type: DataTypes.STRING,
      field: "p_title",
    },
    content: {
      type: DataTypes.STRING,
      field: "p_content",
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "Post",
    timestamps: true,
  },
);
Post.belongsTo(User, {
  foreignKey: {
    name: "userId",
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Post, {
  foreignKey: {
    name: "userId",
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
export default Post;
