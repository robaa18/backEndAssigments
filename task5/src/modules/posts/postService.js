import { User, Comment, Post } from "../../DB/index.js";
import { fn, col } from "sequelize";
export const createPost = async (inputs) => {
  const { title, content, userId } = inputs;
  const post = new Post({
    title: title,
    content: content,
    userId: userId,
  });
  const data = await post.save();
  return data;
};
export const deletePost = async (inputs) => {
  const { postId, userId } = inputs;
  const found = await Post.findOne({
    where: { id: postId },
  });
  if (!found) {
    throw new Error("post not found", { cause: { status: 404 } });
  } else if (found.dataValues.userId !== Number(userId)) {
    throw new Error("user not authorized", { cause: { status: 401 } });
  } else {
    const data = await Post.destroy({ where: { id: postId } });
    return data;
  }
};
export const getPostsDetails = async (inputs) => {
  const data = await Post.findAll({
    attributes: ["id", "title"],
    include: [
      { model: User, attributes: ["id", "name"] },
      { model: Comment, attributes: ["id", "content"] },
    ],
  });
  return data;
};
export const getPostsCommentsCount = async () => {
  const data = await Post.findAll({
    attributes: [
      "id",
      "title",
      [fn("COUNT", col("Comments.c_id")), "commentsCount"],
    ],

    include: {
      model: Comment,
      attributes: [],
    },

    group: ["Post.p_id"],
  });

  return data;
};