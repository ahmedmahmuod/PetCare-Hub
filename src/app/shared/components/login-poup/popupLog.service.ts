import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private showPopupSubject = new BehaviorSubject<boolean>(false);
  showPopup$ = this.showPopupSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  showPopup(): void {
    if (this.isBrowser()) {
      const dontShowAgain = localStorage.getItem('dontShowPopup');
      if (dontShowAgain !== 'true') {
        this.showPopupSubject.next(true);
      }
    }
  }

  hidePopup(dontShowAgain: boolean = false): void {
    this.showPopupSubject.next(false);
    if (dontShowAgain && this.isBrowser()) {
      localStorage.setItem('dontShowPopup', 'true');
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}