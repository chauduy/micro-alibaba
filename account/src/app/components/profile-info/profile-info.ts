import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserStore } from '@app/store/user.store';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-info.html',
  styleUrl: './profile-info.scss',
})
export class ProfileInfo {
  user;

  constructor(private userStore: UserStore) {
    this.user = toSignal(this.userStore.user$, { initialValue: null });
  }
}
