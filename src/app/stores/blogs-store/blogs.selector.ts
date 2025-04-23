import { BlogsState } from './blogs.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectBlogsState = createFeatureSelector<BlogsState>('blogs');

export const selectBlogs = createSelector(
  selectBlogsState,
  (state) => state.blogs ?? []
);

export const selectBlogsLoading = createSelector(
  selectBlogsState,
  (state) => state.loading
);

export const selectBlogsError = createSelector(
  selectBlogsState,
  (state) => state.error
);
