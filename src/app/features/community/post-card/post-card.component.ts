import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProcessedPost } from '../../../core/models/posts/posts.model';
import { UsersService } from '../../../core/services/user/users.service';
import { UserData } from '../../../core/models/user/details/user-details.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  // Privets
  private usersService = inject(UsersService);
  private translate = inject(TranslateService);

  // Inputs & Outputs
  @Input() post!: ProcessedPost;
  @Output() likeClicked = new EventEmitter<string>();
  
  // global variables
  user: UserData = {} as UserData;
  userCache = new Map<string, UserData>();
  showUserPopup = false;
  popupPosition = '';

  // form date
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // handle image post
  handleImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.naturalHeight > img.naturalWidth) {
      img.style.objectFit = 'contain';
      img.style.maxHeight = '600px';
    } else {
      img.style.objectFit = 'cover';
    }
  }

  // if i clicked of like post
  onLikeClick() {
    this.likeClicked.emit(this.post.post._id);
    
  }

  // if i hoverd on user
  onHoverUser(post: ProcessedPost) {
    const userId = post.post.userId;
  
    if (this.userCache.has(userId)) {
      this.user = this.userCache.get(userId)!;
      this.showUserPopup = true;      
      return;
    }
    
    this.usersService.getOneUserById(userId).subscribe((res) => {
      const user = res;
      this.userCache.set(userId, user);
      this.user = user;
      this.showUserPopup = true;
    });
  }

  // time of the post published
  getTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if (diffInSeconds < 60) {
      return this.translate.instant('Pages.Community.Post_Card.Time_Ago.Seconds', { value: diffInSeconds });
    }
  
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) {
      return this.translate.instant('Pages.Community.Post_Card.Time_Ago.Minutes', { value: minutes });
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return this.translate.instant('Pages.Community.Post_Card.Time_Ago.Hours', { value: hours });
    }
  
    const days = Math.floor(hours / 24);
    if (days < 7) {
      return this.translate.instant('Pages.Community.Post_Card.Time_Ago.Days', { value: days });
    }
  
    const weeks = Math.floor(days / 7);
    return this.translate.instant('Pages.Community.Post_Card.Time_Ago.Weeks', { value: weeks });
  }
  
  // if the post edited !
  isEdited(): boolean {
    return this.post.post.updatedAt !== this.post.post.createdAt;
  }
  

}