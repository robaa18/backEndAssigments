import { Comment, User, Post } from "../../DB/index.js";
import { Op } from "sequelize";
export const createComments = async (inputs) => {
  const comment = Comment.bulkCreate(inputs);
  return comment;
};
export const updateCommentById = async (inputs) => {
  const { commentId, userId, content } = inputs;
  const found = await Comment.findOne({
    where: { id: commentId },
  });

  if (!found) {
    throw new Error("Comment not found", { cause: { status: 404 } });
  } else if (found.dataValues.userId !== Number(userId)) {
    throw new Error("user not authorized", { cause: { status: 401 } });
  } else {
    const data = {};
    if (content !== undefined) data.content = content;
    const comment = await Comment.update(
      { ...data },
      {
        where: {
          id: commentId,
        },
      },
    );
    return comment;
  }
};
export const findOrCreateComment = async (inputs) => {
  const { postId, userId, content } = inputs;
  const [comment, created] = await Comment.findOrCreate({
    where: {
      postId: postId,
      userId: userId,
      content: content,
    },
  });
  return {comment ,created};
};
export const findCommentsHaveSpecificWord = async (inputs) => {
  const { word } = inputs;
  const comments = await Comment.findAndCountAll({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });
  return comments;
};
export const findRecent3CommentsForASpecificPost = async (inputs) => {
  const { postId } = inputs;
  const comments = await Comment.findAll({
    where: { postId: postId },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
  return comments;
};
export const getCommentById = async (inputs) => {
  const { id } = inputs;
  const comment = await Comment.findByPk(id, {
    include: [{ model: User }, { model: Post }],
  });
  if (comment) {
    return comment;
  } else {
    throw new Error("comment not exist", { cause: { status: 404 } });
  }
};
