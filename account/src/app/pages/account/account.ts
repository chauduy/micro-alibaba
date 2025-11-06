import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FavoritePreview } from '@app/components/favorite-preview/favorite-preview';
import { InspirationList } from '@app/components/inspiration-list/inspiration-list';
import { OrderPreview } from '@app/components/order-preview/order-preview';
import { ProfileInfo } from '@app/components/profile-info/profile-info';
import { ProfileSetting } from '@app/components/profile-setting/profile-setting';

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
