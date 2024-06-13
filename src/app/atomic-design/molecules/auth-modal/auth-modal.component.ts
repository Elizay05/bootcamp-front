import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { ICONS } from 'src/app/util/icons.constants';

@Component({
  selector: 'molecule-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  icon_close = ICONS.CLOSE;
  openModalAuth = false;
  status = { message: '', status_svg: '' };
  authErrorSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private statusMessagesService: StatusMessagesService
  ) {
    this.authErrorSubscription = this.authService.authError$.subscribe(authError => {
      if (authError) {
        this.openModalAuth = true;
        const error = this.authService.getAuthError();
        if (error) {
          this.status = this.statusMessagesService.handleError(error);
        }
      } else {
        this.openModalAuth = false;
      }
    });
  }


  onCloseModal() {
    this.openModalAuth = false;
    this.authService.clearAuthError();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.authErrorSubscription) {
      this.authErrorSubscription.unsubscribe();
    }
  }
}
