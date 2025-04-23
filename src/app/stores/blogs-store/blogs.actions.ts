import { createAction, props } from '@ngrx/store';
import { BlogsModel } from '../../core/models/blogs/blogs.model';

export const loadBlogs = createAction('[Blogs] Load Blogs');

export const loadBlogsSuccess = createAction(
  '[Blogs] Load Blogs Success',
  props<{ blogs: BlogsModel[] }>()
);

export const loadBlogsFailure = createAction(
  '[Blogs] Load Blogs Failure',
  props<{ error: any }>()
);