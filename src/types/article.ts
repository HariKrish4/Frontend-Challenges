export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  readCount: number;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  comments: Comment[];
}
