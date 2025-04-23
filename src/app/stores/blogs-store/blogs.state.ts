import { BlogsModel } from '../../core/models/blogs/blogs.model';

export interface BlogsState {
  blogs: BlogsModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: BlogsState = {
  blogs: [],
  loading: false,
  error: null,
};
