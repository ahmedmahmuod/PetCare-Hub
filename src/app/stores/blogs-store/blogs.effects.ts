import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BlogsActions from './blogs.actions';
import { BlogsService } from '../../core/services/blogs/blogs.service';

@Injectable()
export class BlogsEffects {
  private actions$ = inject(Actions);
  private blogsService = inject(BlogsService);

  loadBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogsActions.loadBlogs),
      mergeMap(() =>
        this.blogsService.getBlogs().pipe(
          map((blogs) => BlogsActions.loadBlogsSuccess({ blogs })),
          catchError((error) => of(BlogsActions.loadBlogsFailure({ error })))
        )
      )
    )
  );
}