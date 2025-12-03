import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const createComment = async (req, res) => {
  try {
    //const { postId, comment } = req.body;
    const { comment } = req.body;
    const postId = req.params.id;

    if (!comment) return res.json({ messege: 'Коментар не може бути пустим' });

    const newComment = new Comment({ comment });
    await newComment.save();

    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      console.log(error);
    }

    res.status(201).json(newComment);
  } catch (error) {
    res.json({ messege: 'Щось пішло не так.' });
  }
};
