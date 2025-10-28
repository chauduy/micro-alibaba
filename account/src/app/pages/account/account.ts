import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileSetting } from '../../components/profile-setting/profile-setting';
import { ProfileInfo } from '../../components/profile-info/profile-info';
import { FavoritePreview } from '../../components/favorite-preview/favorite-preview';
import { OrderPreview } from '../../components/order-preview/order-preview';

@Component({
  selector: 'app-account',
  imports: [CommonModule, ProfileSetting, ProfileInfo, FavoritePreview, OrderPreview],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account {}
