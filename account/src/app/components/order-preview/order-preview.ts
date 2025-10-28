import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-order-preview',
  imports: [NzTabsModule],
  templateUrl: './order-preview.html',
  styleUrl: './order-preview.scss',
})
export class OrderPreview {}
