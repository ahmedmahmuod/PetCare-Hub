import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BlogsModel } from '../../models/blogs/blogs.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private http = inject(HttpClient);

  // Get all blogs
  getBlogs(): Observable<BlogsModel[]> {
    return this.http.get<BlogsModel[]>(environment.apiUrl + 'Plogs/getallplogs').pipe(
      map((res: any) =>
        res.data.filter((blog: any) => !!blog.description && !!blog.plogImage)
      )
    );
  }

  // Create log
  createLog(blogData: FormData): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'Plogs/createplog', blogData);
  }

  
}
