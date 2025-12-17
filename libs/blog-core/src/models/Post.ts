import { Stream } from 'stream';

export interface IPost {
  id?: string;
  username: string;
  title: string;
  text: string;
  imgUrl?: string;
  views: number;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreatePostDTO {
  title: string;
  text: string;
  authorId: string;
  username: string;
  image?: {
    name: string;
    data: Stream;
    mv?: Function;
  };
}
