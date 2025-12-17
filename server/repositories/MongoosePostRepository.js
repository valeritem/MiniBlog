import Post from '../models/Post.js';

export class MongoosePostRepository {
  async create(postData) {
    const { authorId, ...rest } = postData;

    const newPost = new Post({
      ...rest,
      author: authorId,
    });

    await newPost.save();

    return newPost.toObject();
  }

  async findByAuthorId(authorId) {
    return Post.find({ author: authorId }).sort('-createdAt').lean();
  }

  async findById(id) {
    return Post.findById(id).lean();
  }

  async findAll() {
    return Post.find().sort('-createdAt').lean();
  }

  async findPopular(limit) {
    return Post.find().limit(limit).sort('-views').lean();
  }

  async update(id, data) {
    return Post.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async delete(id) {
    const result = await Post.findByIdAndDelete(id);
    return !!result;
  }

  async incrementViews(id) {
    return Post.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true }).lean();
  }
}
