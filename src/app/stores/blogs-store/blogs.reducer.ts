import { createReducer, on } from '@ngrx/store';
import * as BlogsActions from './blogs.actions';
import { initialState } from './blogs.state';

export const blogsReducer = createReducer(
  initialState,
  on(BlogsActions.loadBlogs, (state) => ({ ...state, loading: true })),
  on(BlogsActions.loadBlogsSuccess, (state, { blogs }) => ({
    ...state,
    loading: false,
    blogs: blogs ?? [],
    error: null,
  })),
  on(BlogsActions.loadBlogsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
