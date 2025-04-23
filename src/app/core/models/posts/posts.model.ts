export interface Post {
  _id: string;
  userId: string;
  userImage?: string;
  userName: string;
  postImage?: string;
  description: string;
  likesNumber: number;
  likes_Id: string[];
  onlyMe: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProcessedPost {
  post: Post;
  liked: boolean;
}

export interface ApiResponse {
  processedPosts: ProcessedPost[];
}
