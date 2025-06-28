// Create a new post
export const createPost = (req, res) => {
  res.json({ message: "Post created" });
};

// Get home feed (all posts for the logged-in user)
export const getFeed = (req, res) => {
  res.json({ message: "User feed" });
};

// Get posts by a specific user
export const getUserPosts = (req, res) => {
  const { username } = req.params;
  res.json({ message: `Posts by user ${username}` });
};

// Delete a post
export const deletePost = (req, res) => {
  const { postId } = req.params;
  res.json({ message: `Post ${postId} deleted` });
};

// Like or unlike a post
export const toggleLikePost = (req, res) => {
  const { postId } = req.params;
  res.json({ message: `Toggled like for post ${postId}` });
};

// Add a comment to a post
export const addComment = (req, res) => {
  const { postId } = req.params;
  res.json({ message: `Comment added to post ${postId}` });
};

// Delete a comment from a post
export const deleteComment = (req, res) => {
  const { postId, commentId } = req.params;
  res.json({ message: `Comment ${commentId} deleted from post ${postId}` });
};