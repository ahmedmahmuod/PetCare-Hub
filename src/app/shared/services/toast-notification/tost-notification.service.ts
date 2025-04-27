import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

interface ToastOptions {
  life?: number;
  sticky?: boolean;
  closable?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private defaultOptions: ToastOptions = {
    life: 5000,
    sticky: false,
    closable: true
  };

  constructor(private messageService: MessageService) {}

  success(message: string, detail?: string, options?: ToastOptions) {
    this.show('success', message, detail, options);
  }

  error(message: string, detail?: string, options?: ToastOptions) {
    this.show('error', message, detail, { ...options, life: 8000 });
  }

  info(message: string, detail?: string, options?: ToastOptions) {
    this.show('info', message, detail, options);
  }

  warn(message: string, detail?: string, options?: ToastOptions) {
    this.show('warn', message, detail, { ...options, life: 6000 });
  }

  clear() {
    this.messageService.clear();
  }

  private show(severity: string, summary: string, detail?: string, options?: ToastOptions) {
    const mergedOptions = { ...this.defaultOptions, ...options };
    
    this.messageService.add({
      severity,
      summary,
      detail,
      ...mergedOptions,
      styleClass: `toast-${severity}`
    });
  }
}