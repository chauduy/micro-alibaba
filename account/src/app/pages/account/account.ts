import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileSetting } from '../../components/profile-setting/profile-setting';
import { ProfileInfo } from '../../components/profile-info/profile-info';
import { FavoritePreview } from '../../components/favorite-preview/favorite-preview';
import { OrderPreview } from '../../components/order-preview/order-preview';
import { InspirationList } from '../../components/inspiration-list/inspiration-list';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    ProfileSetting,
    ProfileInfo,
    FavoritePreview,
    OrderPreview,
    InspirationList,
  ],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account {}
