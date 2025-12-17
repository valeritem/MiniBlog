import { CreatePostDTO, IPost } from '../models/Post.js';
import { IPostRepository } from '../interfaces/IPostRepository.js';
import { IFileStorage } from '../interfaces/IFileStorage.js';

export class PostService {
  // Dependency Injection
  constructor(
    private postRepository: IPostRepository,
    private fileStorage: IFileStorage
  ) {}

  async createPost(dto: CreatePostDTO): Promise<IPost> {
    let fileName = '';

    if (dto.image) {
      const uniqueName = Date.now().toString() + dto.image.name;
      fileName = await this.fileStorage.saveFile(uniqueName, dto.image.data);
    }

    const newPostData = {
      username: dto.username,
      title: dto.title,
      text: dto.text,
      imgUrl: fileName,
      authorId: dto.authorId,
    };

    return this.postRepository.create(newPostData);
  }

  async getAllPosts() {
    const [posts, popularPosts] = await Promise.all([
      this.postRepository.findAll(),
      this.postRepository.findPopular(5),
    ]);

    return { posts, popularPosts };
  }

  async getPostById(id: string): Promise<IPost | null> {
    return this.postRepository.incrementViews(id);
  }

  async getMyPosts(userId: string): Promise<IPost[]> {
    return this.postRepository.findByAuthorId(userId);
  }

  async updatePost(
    id: string,
    dto: Partial<CreatePostDTO>
  ): Promise<IPost | null> {
    const post = await this.postRepository.findById(id);
    if (!post) return null;

    let updatedData: Partial<IPost> = {
      title: dto.title,
      text: dto.text,
    };

    if (dto.image) {
      const uniqueName = Date.now().toString() + dto.image.name;
      const newFileName = await this.fileStorage.saveFile(
        uniqueName,
        dto.image.data
      );
      updatedData.imgUrl = newFileName;
    }

    return this.postRepository.update(id, updatedData);
  }

  async removePost(id: string): Promise<boolean> {
    const post = await this.postRepository.findById(id);
    if (!post) return false;

    const deleted = await this.postRepository.delete(id);

    if (deleted && post.imgUrl) {
      await this.fileStorage.deleteFile(post.imgUrl).catch(console.error);
    }

    return deleted;
  }
}
