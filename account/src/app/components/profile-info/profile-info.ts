import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStore } from '../../store/user.store';
import { toSignal } from '@angular/core/rxjs-interop';

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
