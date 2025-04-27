import { UserData } from './../../../core/models/user/details/user-details.model';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../../../core/services/user/users.service';
import { PostsService } from '../../../core/services/posts/posts.service';
import { ProcessedPost } from '../../../core/models/posts/posts.model';
import { PostSkeletonLoaderComponent } from "../../../shared/components/skeletons/posts-feed/posts-feed-skelton.component";
import { PostCardComponent } from "../../community/post-card/post-card.component";
import { UserProfileSkeletonComponent } from "../../../shared/components/skeletons/user-profile/user-profile-skelton.component";
import { TranslateModule } from '@ngx-translate/core';
import { LoginRequiredComponent } from "../../../shared/components/not-login/login-required.component";
import { TokenService } from '../../../shared/services/token-managment/token-management.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, PostSkeletonLoaderComponent, PostCardComponent, UserProfileSkeletonComponent, TranslateModule, LoginRequiredComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  // Privates
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);
  private postsService = inject(PostsService);
  private tokenService = inject(TokenService);
  
  // Global Variables
  userId: string = '';
  userData: UserData = {} as UserData;
  userPosts: ProcessedPost[] = [];
  isLoading: boolean = false;

  isLoggedIn = this.tokenService.isLoggedIn$;

  // Form Date
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long'
    });
  }

  // ngOnInit
  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('profileId') || '';
    })
    
    // Get user data
    this.usersService.getOneUserById(this.userId).subscribe((res) => {
      this.userData = res;      
      this.isLoading = false;
    })
    
    // Get user Posts
    this.postsService.getUserPosts(this.userId).subscribe((res) => {
      this.userPosts = res;
      this.isLoading = false;
    })
  }

  // get followers count
  get followersCount(): number {
    return this.userData.followers?.length || 0;
  }
  
  // get following count
  get followingCount(): number {
    return this.userData.following?.length || 0;
  }

  // get user pets count
  get petsCount(): number {
    return this.userData.pets?.length || 0;
  }
  
  // if i clicked on like post
  handleLike(postId: string) {
    const postIndex = this.userPosts.findIndex(p => p.post._id === postId);
    if (postIndex === -1) return;
  
    const post = this.userPosts[postIndex];
  
    // Optimistic update
    const newLiked = !post.liked;
    const newLikes = newLiked ? post.post.likesNumber + 1 : post.post.likesNumber - 1;
  
    this.userPosts[postIndex] = {
      ...post,
      post: {
        ...post.post,
        likesNumber: newLikes
      },
      liked: newLiked
    };
  
    // Send request
    this.postsService.addLikeRemovePost(postId).subscribe({
      next: (res) => {
        const confirmedLikes = res.post.likes_Id.length;
        const confirmedLiked = res.liked;
  
        this.userPosts[postIndex] = {
          ...post,
          post: {
            ...post.post,
            likesNumber: confirmedLikes
          },
          liked: confirmedLiked
        };
      },
      error: () => {
        // Rollback
        this.userPosts[postIndex] = post;
      }
    });
  }
  
    
  


}