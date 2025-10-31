import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-custom-table',
  imports: [NzTableModule, NzIconModule, CommonModule],
  templateUrl: './custom-table.html',
  styleUrls: ['./custom-table.scss'],
})
export class CustomTable {
  @Input() headColumns: any = [];
  @Input() cellColumns: any = [];
  @Input() data: any = [];
  @Input() emptyDataText: string = 'No data available';

  @Output() actionClick = new EventEmitter<any>();

  onActionClick(id: string) {
    this.actionClick.emit(id);
  }
}
