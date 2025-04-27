import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/posts/posts.service';
import { PostCardComponent } from "./post-card/post-card.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectionSpinnerComponent } from "../../shared/components/spinner/spinner-loading.component";
import { PostSkeletonLoaderComponent } from "../../shared/components/skeletons/posts-feed/posts-feed-skelton.component";
import { take } from 'rxjs';
import { LoginRequiredComponent } from "../../shared/components/not-login/login-required.component";
import { TranslateModule } from '@ngx-translate/core';
import { TokenService } from '../../shared/services/token-managment/token-management.service';
import { UsersService } from '../../core/services/user/users.service';

@Component({
  selector: 'app-community', 
  standalone: true,
  imports: [CommonModule, PostCardComponent, ReactiveFormsModule, SectionSpinnerComponent, PostSkeletonLoaderComponent, LoginRequiredComponent, TranslateModule],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css', 
}) 
export class CommunityComponent implements OnInit {
  // Privets
  private postsService = inject(PostsService);
  private tokenService = inject(TokenService);
  private usersService = inject(UsersService);

  posts$ = this.postsService.posts$;
  postForm!: FormGroup;
  selectedImage: string | null = null;
  isLoading: boolean = false;
  isLoadingForm: boolean = false;
  isLoggedIn = this.tokenService.isLoggedIn$;

  userData$ = this.usersService.user$;

  constructor(private fb: FormBuilder) {}

  // ngOnInit
  ngOnInit(): void {
    this.postForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(500)]],
      postImage: [null],
      onlyMe: [false]
    });
  
    this.posts$.pipe(take(1)).subscribe((posts) => {
      if (!posts || posts.length === 0) {
        this.getAllpostsFunc();
      }
    });

  }
  
  getAllpostsFunc() {
    this.isLoading = true;
    this.postsService.getPosts().subscribe(() => {
      this.isLoading = false;
    });
  }
  
  // if i selected the image from my device
  onImageSelected(event: Event) {    
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.postForm.patchValue({ postImage: file });
      const reader = new FileReader();
      reader.onload = () => this.selectedImage = reader.result as string;
      reader.readAsDataURL(file);      
    }
  }

  // Add new Post
  submitPost() {
    if (this.postForm.invalid) return;

    this.isLoadingForm = true;
    
    const formData = new FormData();
    formData.append('description', this.postForm.get('description')?.value);
    formData.append('onlyMe', this.postForm.get('onlyMe')?.value);
    if (this.postForm.get('postImage')?.value) {
      formData.append('postImage', this.postForm.get('postImage')?.value);
    }
    
    this.postsService.addPost(formData).subscribe({
      next: (res) => {
        console.log('Post created ✅', res);
        this.getAllpostsFunc();
        this.isLoadingForm = false;
        this.postForm.reset();
        this.selectedImage = null;
      },
      error: (err) => {
        console.error('Error adding post ❌', err);
      }
    });

  }

  // if i click on like
  handleLike(postId: string) {
    const currentPosts = this.postsService.getCurrentPosts();
    const post = currentPosts.find(p => p.post._id === postId);
    if (!post) return;
  
    // Optimistic update
    const newLiked = !post.liked;
    const newLikes = newLiked ? post.post.likesNumber + 1 : post.post.likesNumber - 1;
  
    this.postsService.updatePostInList(postId, { likesNumber: newLikes }, newLiked);
  
    // Send request
    this.postsService.addLikeRemovePost(postId).subscribe({
      next: (res) => {
        const confirmedLikes = res.post.likes_Id.length;
        const confirmedLiked = res.liked;
        this.postsService.updatePostInList(postId, { likesNumber: confirmedLikes }, confirmedLiked);
      },
      error: () => {
        this.postsService.updatePostInList(postId, { likesNumber: post.post.likesNumber }, post.liked);
      }
    });
  }
  
  
}
