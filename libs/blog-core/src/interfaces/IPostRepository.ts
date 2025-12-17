import type { IPost } from '../models/Post.js';

export interface IPostRepository {
  create(
    post: Omit<IPost, 'id' | 'views' | 'createdAt' | 'updatedAt'>
  ): Promise<IPost>;
  findById(id: string): Promise<IPost | null>;
  findAll(sort?: string): Promise<IPost[]>;
  findPopular(limit: number): Promise<IPost[]>;
  findByAuthorId(authorId: string): Promise<IPost[]>;
  update(id: string, data: Partial<IPost>): Promise<IPost | null>;
  delete(id: string): Promise<boolean>;
  incrementViews(id: string): Promise<IPost | null>;
}
