import { PostService } from 'blog-core';
import { MongoosePostRepository } from '../repositories/MongoosePostRepository.js';
import { LocalFileStorage } from '../services/LocalFileStorage.js';

const postRepository = new MongoosePostRepository();
const fileStorage = new LocalFileStorage();

const postService = new PostService(postRepository, fileStorage);

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;

    const createPostDTO = {
      title,
      text,
      authorId: req.userId,
      username: req.body.username,
    };

    if (req.files && req.files.image) {
      createPostDTO.image = {
        name: req.files.image.name,
        data: req.files.image.data,
      };
    }

    const newPost = await postService.createPost(createPostDTO);

    res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Щось пішло не так при створенні поста.' });
  }
};

// Get All Posts
export const getAll = async (req, res) => {
  try {
    const result = await postService.getAllPosts();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Щось пішло не так.' });
  }
};

// Get Post By Id
export const getById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Пост не знайдено.' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Щось пішло не так.' });
  }
};

// Get My Posts
export const getMyPosts = async (req, res) => {
  try {
    const posts = await postService.getMyPosts(req.userId);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Щось пішло не так.' });
  }
};

// Remove Post
export const removePost = async (req, res) => {
  try {
    const success = await postService.removePost(req.params.id);

    if (!success) {
      return res.status(404).json({ message: 'Такого поста не існує.' });
    }

    res.json({ message: 'Пост видалено.' });
  } catch (error) {
    res.status(500).json({ message: 'Щось пішло не так.' });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;

    const updateDTO = { title, text };

    if (req.files && req.files.image) {
      updateDTO.image = {
        name: req.files.image.name,
        data: req.files.image.data,
      };
    }

    const updatedPost = await postService.updatePost(id, updateDTO);

    if (!updatedPost) {
      return res.status(404).json({ message: 'Пост не знайдено.' });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Щось пішло не так.' });
  }
};

// Get Post Comments
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Пост не знайдено' });
    }

    const list = await Promise.all(
      post.comments.map((comment) => {
        return Comment.findById(comment);
      })
    );
    res.json(list);
  } catch (error) {
    res.json({ message: 'Щось пішло не так.' });
  }
};
