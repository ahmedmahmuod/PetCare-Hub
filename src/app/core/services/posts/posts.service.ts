import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { ApiResponse, ProcessedPost } from '../../models/posts/posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
    private http = inject(HttpClient);

    private postsSubject = new BehaviorSubject<ProcessedPost[]>([]);
    posts$ = this.postsSubject.asObservable();

    setPosts(posts: ProcessedPost[]) {
      this.postsSubject.next(posts);
    }
    
    updatePostInList( postId: string, updatedPost: Partial<ProcessedPost['post']>,liked?: boolean ) {
      const current = this.postsSubject.getValue();
      const updated = current.map(p => {
        if (p.post._id === postId) {
          return {
            ...p,
            post: { ...p.post, ...updatedPost },
            liked: liked !== undefined ? liked : !p.liked
          };
        }
        return p;
      });
      this.postsSubject.next(updated);
    }

    getCurrentPosts(): ProcessedPost[] {
      return this.postsSubject.getValue();
    }
    
    // [Get] Get all posts with auth token 
    getPosts(): Observable<ProcessedPost[]> {
        return this.http.get<ApiResponse>(environment.apiUrl + 'community/getAllPosts').pipe(map((res) => res.processedPosts), tap(posts => this.postsSubject.next(posts)))
    }

    // [Get] Get all user posts 
    getUserPosts(userId: string): Observable<ProcessedPost[]> {
        return this.http.get<ApiResponse>(environment.apiUrl + 'community/userMoments/' + userId).pipe(map((res) => res.processedPosts))
    }

    // [Post] Add new post
    addPost(post: FormData): Observable<any> {
      return this.http.post<any>(environment.apiUrl + 'community/addPost', post);
    }
    
    // [Post] Add like and remove like Toggle
    addLikeRemovePost(postId: string): Observable<any> {
      const params = new HttpParams().set('postId', postId);
      return this.http.patch<any>(environment.apiUrl + `community/likeAndDisLike`, {} , {params});
    }
}
