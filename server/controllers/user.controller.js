import User from "../models/user.model.js";

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).send("User not found!!");
    return;
  }

  if (req.userId !== user._id.toString()) {
    res.status(403).send("Forbidden!!");
    return;
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("User has been deleted!!");
};

export const getUserSavedPosts = async (req, res) => {
  const user = await User.findById(req.userId);

  res.status(200).json(user.savedPosts);
};

export const savePost = async (req, res) => {
  const user = await User.findById(req.userId);
  const postId = req.body.postId;

  const isSaved = user.savedPosts.some((p) => p === postId);

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }

  res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
};
